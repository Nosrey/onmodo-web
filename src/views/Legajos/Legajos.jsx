import React, { useState, useEffect } from 'react';
import styles from './Legajos.module.css';
import ModalBorrar from '../../components/modalBorrar/ModalBorrar';
import { getLegajosPorRol } from '../../services/Request';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/shared/components/Alert/Alert';
import { useMedia } from '../../utils/hooks/UseMedia';

const Legajos = ({filterByKey}) => {
  const navigate = useNavigate();
  const media = useMedia();
  const [legajos, setLegajos] = useState([]);
  const [legajosFiltrados, setLegajosFiltrados] = useState(legajos.map(legajo => ({ ...legajo, openMobileMenu: false })));
  const [fileSelected, setFileSelected] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showEmptyMsg, setShowEmptyMsg] = useState(false);
  const [noResultMsg, setNoResultMsg] = useState(false);

  //** ALERTA */
  const [textAlert, setTextAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showAlert, setShowlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const level = localStorage.getItem("rol");

  useEffect(() => {
    if (openDeleteModal === false) {
      setIsLoading(true);
      cargarLegajos(level).then((res) => {
        setIsLoading(false);
        setLegajosFiltrados(res
          .map(legajo => ({ ...legajo, openMobileMenu: false }))
          .sort((a, b) => a.fullName.localeCompare(b.fullName)));
        return setLegajos(res.map(legajo => ({ ...legajo, openMobileMenu: false })));
      })
      .catch((error) => console.error('Error:', error));
    }
  },[openDeleteModal])

  const cargarLegajos = async (level) => {
    switch(level){
      case '2': 
        return await getLegajosPorRol('1');
      case '3':
        return await getLegajosPorRol('1-2');
      case '4':
        return await getLegajosPorRol('1-2-3');
      default:
        return null;
    }
  }

  const handleOpenDeleteModal = (id) => {
    setFileSelected(id);
    setOpenDeleteModal(true);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setIsLoading(true)
    if (value === 'A-Z') {
      const sorted = [...legajosFiltrados].sort((a, b) => a.fullName.localeCompare(b.fullName));
      setLegajosFiltrados(sorted);
    } else if (value === 'Z-A') {
      const sorted = [...legajosFiltrados].sort((a, b) => b.fullName.localeCompare(a.fullName));
      setLegajosFiltrados(sorted);
    } else if (value === 'Nivel 1') {
      const sorted = legajos.filter((legajo) => legajo.rol === 1);
      setLegajosFiltrados(sorted)
    } else if (value === 'Nivel 2'){
      const sorted = legajos.filter((legajo) => legajo.rol === 2);
      setLegajosFiltrados(sorted)
    } else if (value === 'Nivel 3'){
      const sorted = legajos.filter((legajo) => legajo.rol === 3);
      setLegajosFiltrados(sorted)
    }
    setIsLoading(false)
  };

  const showAlertNotif = (type, msg) => {
    setTextAlert(msg);
    setTypeAlert(type);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setShowlert(true);
    setTimeout(() => {
      setShowlert(false);

    }, 7000);
    if (type === "success") {
      // getData();
    }
  }

  const renderMobileMenuAction = (legajo) => {
    return (
      <tr key={legajo._id} >
        <td className={styles.actionIcon} onClick={() => navigate(`/perfil-legajo/${legajo._id}`)}>
          <i className="ri-eye-line"></i>
        </td>
        <td className={styles.actionIcon} onClick={() => navigate(`/formularios-legajos/${legajo._id}`)}>
          <i className="ri-file-reduce-line"></i>
        </td>
        <td onClick={() => handleOpenDeleteModal(legajo.legajo)} className={styles.actionIcon} style={{paddingLeft: '0px'}}>
          <i className='ri-delete-bin-line'></i>
        </td>
      </tr>
    )
  }

  const handleOpenMobileMenu = (index) => {
    setLegajosFiltrados(prevLegajos => {
      const newLegajos = [...prevLegajos];
      newLegajos[index].openMobileMenu = !newLegajos[index].openMobileMenu;
      return newLegajos;
    });
  };

  
  useEffect(() => {
    console.log("filter", filterByKey)
    // if (filterByKey && filterByKey.trim() !== '') {
    //   setIsLoading(true)
    //  const copy = [...sortedForms];
    //  const results = copy.filter((form)=>form.title.toLowerCase().includes(filterByKey.toLowerCase()))

    //  if (results.length !== 0) {
    //    setSortedForms(results);
    //    setIsLoading(false)

    //  } else {
    //   setNoResultMsg(true);
    //    setIsLoading(false)
    //  }

    // }
    // if (filterByKey === '') {
    //   setIsLoading(true)
    //   // fetchData()
    //   setNoResultMsg(false);
    // }
  }, [filterByKey])
  return (
    <>
      {isLoading ? (
        <Oval
          height={30}
          width={30}
          color='#4fa94d'
          wrapperStyle={{
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: '60px',
            paddingBottom: '60px',
            justifyContent: 'center'
          }}
          wrapperClass=''
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor='#4fa94d'
          strokeWidth={5}
          strokeWidthSecondary={2}
        />
      ) : (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.orderContainer}>
              <span className={styles.spanOrder}>Ordenar por:</span>
              <select name='' id={styles.select} onChange={handleSortChange}>
                <option value='A-Z'>A - Z</option>
                <option value='Z-A'>Z - A</option>
                  {level >= 2 && <option value='Nivel 1'>Nivel 1</option>}
                  {level >= 3 && <option value='Nivel 2'>Nivel 2</option>}
                  {level >= 4 && <option value='Nivel 3'>Nivel 3</option>}
              </select>
            </div>
            <table className={styles.table}>
                <thead className={styles.head} style={{ cursor: 'default'}}>
                  <tr>
                    <th>Legajos</th>
                    <th>Nombre</th>
                    <th>Nivel</th>
                    {media !== 'mobile' && <th className={styles.accion}>Acción</th>}
                  </tr>
                </thead>
                <tbody>
                {legajosFiltrados.length > 0 && legajosFiltrados.map((legajo, index) => (
                  <>
                    <tr key={index} className={`${styles.fila} ${(legajo.openMobileMenu && media === 'mobile') && styles.tableMobile}`} style={{ cursor: 'default'}}>
                      <td>{legajo.legajo}</td>
                      <td>{legajo.fullName}</td>
                      <td>{legajo.rol}</td>
                      <td style={{textAlign: 'center', borderTop: '1px solid #ccc'}}>
                        {media === 'mobile' 
                        ? <i className={legajo.openMobileMenu ? `ri-arrow-up-s-line ${styles.actionIcon}` : `ri-arrow-down-s-line ${styles.actionIcon}`} onClick={()=> handleOpenMobileMenu(index)} ></i> : 
                        <div className={styles.contEdicion}>
                          <span onClick={() => handleOpenDeleteModal(legajo.legajo)} className={styles.actionIcon} style={{fontSize: '18px'}}>
                            <i className='ri-delete-bin-line'></i>
                          </span>
                          <span style={{cursor: 'pointer'}} onClick={() => navigate(`/perfil-legajo/${legajo._id}`)}>
                            Ver perfil
                          </span>
                          <span style={{cursor: 'pointer'}} onClick={() => navigate(`/formularios-legajos/${legajo._id}`)}>
                            Ver formularios cargados
                          </span>
                        </div>
                        }
                      </td>
                    </tr>
                    {legajo.openMobileMenu 
                    && media === 'mobile' 
                    && renderMobileMenuAction(legajo)
                    }
                    </>

                  )
                )}
                </tbody>
              </table>      
              {legajos.length === 0 && <p className={styles.placeholder}>No se encontraron formularios cargados en su historial.</p>}
              <ModalBorrar fileToDelete={'legajo'} modalDelete={openDeleteModal} setModalDelete={setOpenDeleteModal} idForm={fileSelected} showAlert={(type, msg) => showAlertNotif(type, msg)} />
            </div>
        </div>
      )}
      {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
    </>
  )
}
export default Legajos;