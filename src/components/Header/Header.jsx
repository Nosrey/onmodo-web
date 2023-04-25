import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/image/on-modo-logo.png';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
                class='ri-search-line'
              ></i>
            </div>
          )}
        </div>
        <div className={styles.rightContainer}>Inicio |</div>
      </div>
    </div>
  );
}

export default Header;
