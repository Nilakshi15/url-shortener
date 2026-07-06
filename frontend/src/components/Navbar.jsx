import { Link, useLocation } from 'react-router-dom';
import { Link2, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <Link2 size={18} strokeWidth={2.5} />
          snip<span className="navbar__dot">.</span>
        </Link>

        {/* Nav links */}
        <nav className="navbar__nav">
          <Link
            to="/"
            className={`navbar__link ${pathname === '/' ? 'navbar__link--active' : ''}`}
          >
            Shorten
          </Link>
          <Link
            to="/dashboard"
            className={`navbar__link ${pathname === '/dashboard' ? 'navbar__link--active' : ''}`}
          >
            <LayoutDashboard size={14} />
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
