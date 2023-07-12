import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/image/on-modo-logo.png';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const currentLocation = location.pathname;
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    if (currentLocation === '/cuenta') setShowSearch(false);
    else setShowSearch(true);
  }, [currentLocation]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftContainer}>
          <img src={logo} alt='logo On Modo' />
          {showSearch && (
            <div className={styles.inputContainer}>
              <input className={styles.search} type='search' placeholder='¿Qué estás buscando?' />
              <i
                style={{ position: 'absolute', left: '20px', bottom: '7px', color: '#959595' }}
                className='ri-search-line'
              ></i>
            </div>
          )}
        </div>
        <div className={styles.rightContainer}>
          <Link to="/inicio">Inicio</Link> |

          <i
            style={{ marginLeft: '10px',  cursor: 'pointer', position: "absolute",  transform: 'rotateY(180deg)' }}
            className="ri-logout-box-line"
            title="Cerrar sesión"
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Header;
