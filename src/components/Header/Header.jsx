import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/image/on-modo-logo.png';
import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate,  } from 'react-router-dom';


function Header({search}) {
  const location = useLocation();
  const currentLocation = location.pathname;
  const [showSearch, setShowSearch] = useState(true);
  const [logoBusiness, setLogoBusiness] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentLocation === '/formularios' || currentLocation === '/formularios-cargados' || currentLocation === '/legajos') setShowSearch(true);
    else setShowSearch(false);
  }, [currentLocation]);

  useEffect(() => {
    const myLogo = localStorage.getItem('imgBusiness')
    if (myLogo !==  null  || myLogo !== undefined) {
      setLogoBusiness(myLogo)
    }
  }, []);

  const handleSearch = (e) => {
    if (e.keyCode === 13 || (e.keyCode === 8 && e.target.value=== '' )) {
      search(e.target.value)
    }
  }
  const handleSChangeSearch = (e) => {
    if (e.target.value=== '' ) {
      search(e.target.value)
    }
  }
  const handleSearchRemove = () => {
    search('');
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftContainer}>
          <img src={logoBusiness ? logoBusiness : logo} alt='logo On Modo' />
          {showSearch && (
            <div className={styles.inputContainer}>
              <input className={styles.search} type='search' placeholder='¿Qué estás buscando?' onKeyUp={(e)=> handleSearch(e)} onChange={(e)=>handleSChangeSearch(e)}/>
              <div onClick={()=>   handleSearchRemove()}>
              <i
                style={{ position: 'absolute', left: '20px', bottom: '7px', color: '#000' }}
                
                className='ri-search-line'
              ></i>
              </div>
             
            </div>
          )}
        </div>
        <div className={styles.rightContainer}>
          <Link to="/inicio">Inicio</Link> |

          <i
            style={{ marginLeft: '10px',  cursor: 'pointer', position: "absolute",  transform: 'rotateY(180deg)' }}
            className="ri-logout-box-line"
            title="Cerrar sesión"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('rol');
              localStorage.removeItem('idChief');
              localStorage.removeItem('idUser');
              localStorage.removeItem('business');
              navigate('/inicio-de-sesion');

            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Header;
