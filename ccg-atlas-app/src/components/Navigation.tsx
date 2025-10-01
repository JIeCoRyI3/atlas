import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <h1 className="nav-title">CCG Atlas</h1>
        <div className="nav-links">
          <Link
            to="/collection"
            className={`nav-link ${location.pathname === '/collection' ? 'active' : ''}`}
          >
            Коллекция
          </Link>
          <Link
            to="/atlas"
            className={`nav-link ${location.pathname === '/atlas' ? 'active' : ''}`}
          >
            Атлас
          </Link>
        </div>
      </div>
    </nav>
  );
}
