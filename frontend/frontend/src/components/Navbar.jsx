import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth(); // pega diretamente do contexto

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <svg className="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.341 6.484A10 10 0 0 1 10.266 21.85" />
              <path d="M3.659 17.516A10 10 0 0 1 13.74 2.152" />
              <circle cx="12" cy="12" r="3" />
              <circle cx="19" cy="5" r="2" />
              <circle cx="5" cy="19" r="2" />
            </svg>
            <span className="navbar-brand">NebulaBox</span>
          </Link>

          <div className="navbar-desktop">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            <Link to="/docs" className="navbar-link">Docs</Link>
            <Link to="/pricing" className="navbar-link">Pricing</Link>
          </div>

          <div className="navbar-right">
            {!user ? (
              <>
                <Link to="/login" className="navbar-login">Login</Link>
                <Link to="/signup" className="navbar-signup">Sign Up</Link>
              </>
            ) : (
              <div className="account-dropdown">
                <button onClick={toggleDropdown} className="account-button">
                  Account {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/account" className="dropdown-item">Info</Link>
                    <button onClick={handleLogout} className="dropdown-item logout">Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="navbar-mobile-button">
            <button onClick={toggleMenu} className="menu-button">
              {isOpen ? (
                <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m18 6-12 12" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={`navbar-mobile ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu">
            <div className="mobile-links">
              <Link to="/" onClick={() => setIsOpen(false)} className="mobile-link">Home</Link>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="mobile-link">Dashboard</Link>
              <Link to="/docs" onClick={() => setIsOpen(false)} className="mobile-link">Docs</Link>
              <Link to="/pricing" onClick={() => setIsOpen(false)} className="mobile-link">Pricing</Link>
            </div>
            <div className="mobile-auth">
              {!user ? (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="mobile-login">Login</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="mobile-signup">Sign Up</Link>
                </>
              ) : (
                <>
                  <Link to="/account" onClick={() => setIsOpen(false)} className="mobile-login">Account</Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="mobile-signup">Logout</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
