import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-8">
            <Rocket className="w-4 h-4" />
            <span className="font-mono">softsweb.cloud</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="text-foreground">Build. Deploy.</span>
          <br />
          <span className="text-primary text-glow-cyan">Go Live.</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Deploying your own app has never been easier. Grab a{" "}
          <span className="text-primary font-medium">Hostinger VPS</span>, install{" "}
          <span className="text-primary font-medium">Dokploy</span>, and ship your project to the world in minutes.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
            <a href="https://hostinger.com/softsweb" target="_blank" rel="noopener noreferrer">
              Get Started <ArrowRight className="w-5 h-5 ml-1" />
            </a>
          </Button>
          <Button variant="hero-outline" size="lg" className="text-base px-8 py-6" asChild>
            <a href="https://dokploy.com" target="_blank" rel="noopener noreferrer">
              Explore Dokploy
            </a>
          </Button>
        </motion.div>

        {/* Terminal preview */}
        <motion.div
          className="mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="gradient-border rounded-xl overflow-hidden">
            <div className="bg-card p-1">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-primary/40" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">terminal</span>
              </div>
              <div className="p-5 text-left font-mono text-sm leading-relaxed">
                <p className="text-muted-foreground">
                  <span className="text-primary">$</span> ssh root@your-vps
                </p>
                <p className="text-muted-foreground">
                  <span className="text-primary">$</span> curl -sSL https://dokploy.com/install.sh | sh
                </p>
                <p className="text-muted-foreground">
                  <span className="text-secondary">✓</span> Dokploy installed successfully
                </p>
                <p className="text-muted-foreground">
                  <span className="text-primary">$</span> dokploy deploy --app my-app
                </p>
                <p className="text-foreground">
                  <span className="text-secondary">🚀</span> App live at{" "}
                  <span className="text-primary underline">softsweb.cloud</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
