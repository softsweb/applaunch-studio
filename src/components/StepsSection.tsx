import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Get a Hostinger VPS",
    description: "Choose a plan, spin up an Ubuntu server, and get your IP address in under 2 minutes.",
    glow: "text-primary text-glow-cyan",
  },
  {
    number: "02",
    title: "Install Dokploy",
    description: "One command to install. Dokploy gives you a full deployment dashboard with Docker support.",
    glow: "text-secondary text-glow-magenta",
  },
  {
    number: "03",
    title: "Deploy & Go Live",
    description: "Connect your Git repo, set your domain, and your app is live with automatic SSL.",
    glow: "text-accent",
  },
];

const StepsSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Three steps to{" "}
            <span className="text-secondary text-glow-magenta">production</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No devops degree required. Seriously.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex gap-6 items-start"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className={`text-5xl font-bold font-mono ${step.glow} shrink-0`}>
                {step.number}
              </div>
              <div className="pt-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
