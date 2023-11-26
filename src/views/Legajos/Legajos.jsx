import React, { useState, useEffect } from 'react';
import styles from './Legajos.module.css';
import ModalBorrar from '../../components/modalBorrar/ModalBorrar';
import { useDispatch } from 'react-redux';
import { getLegajosPorRol } from '../../services/Request';
import { Oval } from 'react-loader-spinner';

const Legajos = () => {
  const [legajos, setLegajos] = useState([]);
  const dispatch = useDispatch();
  const mock = [
    {_id: 1, legajo: 14523, nombre: 'Carla Perez', nivel: 1},
    {_id: 2, legajo: 14550, nombre: 'María Guevara', nivel: 1},
    {_id: 3, legajo: 14586, nombre: 'Miguel Lattanzi', nivel: 1}
  ];
  const [fileSelected, setFileSelected] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  //** ALERTA */
  const [textAlert, setTextAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showAlert, setShowlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (openDeleteModal === false) {
      const level = localStorage.getItem("rol");
      setIsLoading(true);
      cargarLegajos(level).then((res) => {
        setIsLoading(false);
        return setLegajos(res);
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
              <select name='' id={styles.select} >
              </select>
            </div>
            <table className={styles.table}>
                <thead className={styles.head} style={{ cursor: 'default'}}>
                  <tr>
                    <th>Legajos</th>
                    <th>Nombre</th>
                    <th>Nivel</th>
                    <th className={styles.accion}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                {legajos.length > 0 && legajos.map((legajo, index) => (
                    <tr key={index} className={styles.fila}  style={{ cursor: 'default'}}>
                      <td>{legajo.legajo}</td>
                      <td>{legajo.fullName}</td>
                      <td>{legajo.rol}</td>
                      <td>
                        <div className={styles.contEdicion}>
                        <span onClick={() => handleOpenDeleteModal(legajo._id)} className={styles.actionIcon} style={{fontSize: '18px'}}>
                          <i className='ri-delete-bin-line'></i>
                        </span>
                        <span>
                          Ver perfil
                        </span>
                        <span>
                          Ver formularios cargados
                        </span>
                        </div>
                      </td>
                    </tr>
                  )
                )}
                </tbody>
              </table>      
              {legajos.length === 0 && <p className={styles.placeholder}>No se encontraron formularios cargados en su historial.</p>}
              <ModalBorrar fileToDelete={'legajo'} modalDelete={openDeleteModal} setModalDelete={setOpenDeleteModal} idForm={fileSelected} showAlert={(type, msg) => showAlertNotif(type, msg)} />
            </div>
        </div>
      )}
    </>
  )
}
export default Legajos;