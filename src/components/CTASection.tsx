import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-secondary/8 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Stop paying for overpriced hosting.
            <br />
            <span className="text-primary text-glow-cyan">Own your infrastructure.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            A Hostinger VPS starts at just a few dollars a month. Dokploy is free and open source. Your app deserves better.
          </p>
          <Button variant="hero" size="lg" className="text-base px-10 py-6" asChild>
            <a href="https://hostinger.com/softsweb" target="_blank" rel="noopener noreferrer">
              Start Building Now <ArrowRight className="w-5 h-5 ml-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
