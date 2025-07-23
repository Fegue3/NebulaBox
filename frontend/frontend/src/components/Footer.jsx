import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} NebulaBox. All rights reserved.</p>
      <div className="footer-links">
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">GitHub</a>
      </div>
    </footer>
  );
}

export default Footer;
