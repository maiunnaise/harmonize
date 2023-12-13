import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to="/user">
          <img src="/logo/icons/user.png" className="user" alt="logo user" />
      </Link>
      <Link to="/">
        <img src="/logo/logo_harmonize.png" className="logo" alt="logo" />
      </Link>
      <Link to="/settings">
          <img src="/logo/icons/settings.png" className="settings" alt="logo settings" />
      </Link>
    </header>
  );
}

export default Header;