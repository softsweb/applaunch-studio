import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

const app = express();

const parsedFallback = Number.parseInt(process.env.DEPLOYMENTS_FALLBACK ?? "0", 10);
const DEPLOYMENTS_FALLBACK = Number.isNaN(parsedFallback) ? 0 : parsedFallback;
const DEPLOYMENTS_METRIC_KEY = process.env.DEPLOYMENTS_METRIC_KEY ?? "deployments";
const DEPLOY_HOOK_TOKEN = process.env.DEPLOY_HOOK_TOKEN ?? "";
const PORT = Number.parseInt(process.env.PORT ?? "3000", 10);

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : undefined,
    })
  : null;

let initializeDatabasePromise = null;

app.disable("x-powered-by");
app.use(express.json());

async function initializeDatabase() {
  if (!pool) {
    return;
  }

  if (!initializeDatabasePromise) {
    initializeDatabasePromise = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS app_metrics (
          metric_key TEXT PRIMARY KEY,
          metric_value BIGINT NOT NULL DEFAULT 0,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

      await pool.query(
        `
          INSERT INTO app_metrics (metric_key, metric_value)
          VALUES ($1, $2)
          ON CONFLICT (metric_key) DO NOTHING;
        `,
        [DEPLOYMENTS_METRIC_KEY, DEPLOYMENTS_FALLBACK],
      );
    })().catch((error) => {
      initializeDatabasePromise = null;
      throw error;
    });
  }

  await initializeDatabasePromise;
}

async function getDeploymentsMetric() {
  if (!pool) {
    return {
      deployments: DEPLOYMENTS_FALLBACK,
      source: "fallback",
      updatedAt: null,
    };
  }

  await initializeDatabase();

  const result = await pool.query(
    `
      SELECT metric_value, updated_at
      FROM app_metrics
      WHERE metric_key = $1
      LIMIT 1;
    `,
    [DEPLOYMENTS_METRIC_KEY],
  );

  if (result.rowCount === 0) {
    return {
      deployments: DEPLOYMENTS_FALLBACK,
      source: "fallback",
      updatedAt: null,
    };
  }

  return {
    deployments: Number(result.rows[0].metric_value),
    source: "database",
    updatedAt: result.rows[0].updated_at,
  };
}

async function incrementDeploymentsMetric() {
  if (!pool) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await initializeDatabase();

  const result = await pool.query(
    `
      INSERT INTO app_metrics (metric_key, metric_value)
      VALUES ($1, 1)
      ON CONFLICT (metric_key)
      DO UPDATE
      SET metric_value = app_metrics.metric_value + 1,
          updated_at = NOW()
      RETURNING metric_value, updated_at;
    `,
    [DEPLOYMENTS_METRIC_KEY],
  );

  return {
    deployments: Number(result.rows[0].metric_value),
    updatedAt: result.rows[0].updated_at,
  };
}

function getRequestToken(request) {
  const authorizationHeader = request.get("authorization");
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    return authorizationHeader.slice("Bearer ".length).trim();
  }

  const tokenHeader = request.get("x-deploy-hook-token");
  return tokenHeader ? tokenHeader.trim() : "";
}

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.get("/api/deployments", async (_request, response) => {
  try {
    const metric = await getDeploymentsMetric();
    response.json({
      deployments: metric.deployments,
      source: metric.source,
      updatedAt: metric.updatedAt,
    });
  } catch (error) {
    console.error("[api/deployments] Failed to read metric:", error);
    response.json({
      deployments: DEPLOYMENTS_FALLBACK,
      source: "fallback",
      updatedAt: null,
      error: "database_unavailable",
    });
  }
});

app.post("/api/deployments/increment", async (request, response) => {
  if (!DEPLOY_HOOK_TOKEN) {
    response.status(503).json({
      error: "DEPLOY_HOOK_TOKEN is not configured on the server.",
    });
    return;
  }

  const requestToken = getRequestToken(request);
  if (!requestToken || requestToken !== DEPLOY_HOOK_TOKEN) {
    response.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const metric = await incrementDeploymentsMetric();
    response.json({
      deployments: metric.deployments,
      updatedAt: metric.updatedAt,
    });
  } catch (error) {
    console.error("[api/deployments/increment] Failed to increment metric:", error);
    response.status(500).json({ error: "Failed to increment deployment counter." });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");

if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (request, response, next) => {
    if (request.path.startsWith("/api/")) {
      next();
      return;
    }

    response.sendFile(path.join(distPath, "index.html"));
  });
} else {
  app.get("*", (request, response, next) => {
    if (request.path.startsWith("/api/")) {
      next();
      return;
    }

    response.status(503).send("Build output not found. Run `npm run build` first.");
  });
}

const server = app.listen(PORT, () => {
  if (!pool) {
    console.warn("[server] DATABASE_URL is not configured. Using fallback deployment count.");
  }
  console.log(`[server] Listening on port ${PORT}`);
});

async function shutdown(signal) {
  console.log(`[server] Received ${signal}. Shutting down.`);
  server.close(async () => {
    if (pool) {
      await pool.end();
    }
    process.exit(0);
  });
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});
