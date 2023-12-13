import './Menu.css';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav>
      <div className="Teach">
      <Link to="/findTeacher">
            <img src="/logo/icons/search.png" className="Teachimg" alt="logo findTeacher" />
        </Link>
      </div>
      <div className="Menu">
        <Link to="/home">
            <img src="/logo/icons/home.png" className="home" alt="logo home" />
        </Link>
        <Link to="/calendar">
          <img src="/logo/icons/calendar.png" className="calendar" alt="logo calendar" />
        </Link>
        <Link to="/search">
            <img src="/logo/icons/compass-circular-tool.png" className="search" alt="logo search" />
        </Link>
        <Link to="/library">
            <img src="/logo/icons/open-book.png" className="library" alt="logo library" />
        </Link>
        <Link to="/message">
            <img src="/logo/icons/speech-bubble.png" className="message" alt="logo message" />
        </Link>
      </div>
    </nav>
  );
}

export default Menu;