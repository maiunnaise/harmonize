import './simpleHeader.css';
import { Link, useNavigate } from 'react-router-dom';

function SimpleHeader() {
  const navigate = useNavigate();
  return (
    <header className='simpleHeader'>
      <img className="backArrow" src="/logo/icons/back-arrow.png" alt="menu arrow" onClick={() => navigate(-1)}></img>
    </header>
  );
}

export default SimpleHeader;