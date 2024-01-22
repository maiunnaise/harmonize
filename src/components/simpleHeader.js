import './simpleHeader.css';
import { useNavigate } from 'react-router-dom';

function SimpleHeader({route}) {
  const navigate = useNavigate();
  if (route == undefined) {
    route = -1;
  }
  return (
    <header className='simpleHeader'>
      <img className="backArrow" src="/logo/icons/back-arrow.png" alt="menu arrow" onClick={() => navigate(route)}></img>
    </header>
  );
}

export default SimpleHeader;