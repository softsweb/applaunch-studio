CREATE TABLE IF NOT EXISTS app_metrics (
  metric_key TEXT PRIMARY KEY,
  metric_value BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO app_metrics (metric_key, metric_value)
VALUES ('deployments', 0)
ON CONFLICT (metric_key) DO NOTHING;
