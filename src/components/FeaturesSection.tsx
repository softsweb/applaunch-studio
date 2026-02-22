import { motion } from "framer-motion";
import { Server, Boxes, Shield, Zap, Globe, Terminal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const staticFeatures = [
  {
    icon: Server,
    title: "Hostinger VPS",
    description: "Powerful, affordable virtual private servers with global data centers and root access.",
    color: "text-primary",
  },
  {
    icon: Boxes,
    title: "Dokploy Orchestration",
    description: "Open-source PaaS that makes deploying Docker containers and apps dead simple.",
    color: "text-secondary",
  },
  {
    icon: Shield,
    title: "Auto SSL Certificates",
    description: "Free HTTPS with Let's Encrypt built in. Your apps are secure from day one.",
    color: "text-accent",
  },
  {
    icon: Zap,
    title: "One-Click Deploy",
    description: "",
    color: "text-primary",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Point your domain, configure DNS, and go live — all managed from one dashboard.",
    color: "text-secondary",
  },
  {
    icon: Terminal,
    title: "Full Control",
    description: "Root access to your server. Install anything, configure everything, own your stack.",
    color: "text-accent",
  },
];

const DEFAULT_DEPLOYMENT_COUNT = 0;

async function fetchDeploymentsCount() {
  try {
    const response = await fetch("/api/deployments", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return DEFAULT_DEPLOYMENT_COUNT;
    }

    const payload = (await response.json()) as { deployments?: unknown };
    const deployments = Number(payload.deployments);
    return Number.isFinite(deployments) ? deployments : DEFAULT_DEPLOYMENT_COUNT;
  } catch {
    return DEFAULT_DEPLOYMENT_COUNT;
  }
}

const FeaturesSection = () => {
  const { data: deploymentsCount = DEFAULT_DEPLOYMENT_COUNT } = useQuery({
    queryKey: ["deployments-count"],
    queryFn: fetchDeploymentsCount,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });

  const oneClickDescription = `Push to Git and watch your app go live. Already made ${deploymentsCount.toLocaleString()} deployments.`;

  const features = staticFeatures.map((feature) =>
    feature.title === "One-Click Deploy"
      ? { ...feature, description: oneClickDescription }
      : feature,
  );

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything you need to{" "}
            <span className="text-primary text-glow-cyan">ship fast</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A modern deployment stack that puts you in control without the overhead.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group gradient-border rounded-xl bg-card p-6 hover:bg-muted/50 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <feature.icon className={`w-10 h-10 ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`} />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
