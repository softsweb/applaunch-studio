const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-foreground">softsweb</span>
          <span className="text-primary font-mono text-sm">.cloud</span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="https://hostinger.com/softsweb" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            Hostinger
          </a>
          <a href="https://dokploy.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
            Dokploy
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} softsweb.cloud
        </p>
      </div>
    </footer>
  );
};

export default Footer;
