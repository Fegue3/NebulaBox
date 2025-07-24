import "./Footer.css";

const footerLinks = {
  Product: [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
  ],
  Resources: [
    { name: "GitHub", href: "https://github.com/Fegue3/NebulaBox", external: true },
    { name: "API Reference", href: "/api" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Status", href: "/status" },
  ],
  Company: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Contact", href: "/contact" },
  ],
};

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h4>{section}</h4>
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.name}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} NebulaBox. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

