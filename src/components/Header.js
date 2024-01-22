import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to="/user">
          <img src="/logo/icons/user.png" className="user" alt="logo user" />
      </Link>
        <img src="/logo/logo_harmonize.png" className="logo" alt="logo" />
      <Link to="/nextVersion">
          <img src="/logo/icons/settings.png" className="settings" alt="logo settings" />
      </Link>
    </header>
  );
}

export default Header;