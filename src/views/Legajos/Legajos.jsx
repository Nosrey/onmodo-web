import React, { useState, useEffect } from 'react';
import styles from './Legajos.module.css';
import ModalBorrar from '../../components/modalBorrar/ModalBorrar';


const Legajos = () => {
  const [legajos, setLegajos] = useState([]);
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

  useEffect(()=> {
    setLegajos(mock);
  },[])

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
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.orderContainer}>
            <span className={styles.spanOrder}>Ordenar por:</span>
            <select name='' id={styles.select} >
            </select>
          </div>
          <table className={styles.table}>
              <thead className={styles.head}>
                <tr>
                  <th>Legajos</th>
                  <th>Nombre</th>
                  <th>Nivel</th>
                  <th className={styles.accion}>Acción</th>
                </tr>
              </thead>
              <tbody>
              {legajos.map((legajo, index) => (
                  <tr key={index} className={styles.fila}>
                    <td>{legajo.legajo}</td>
                    <td>{legajo.nombre}</td>
                    <td>{legajo.nivel}</td>
                    {/* <td style={{textTransform:'capitalize'}}>{name}</td> */}
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
              {legajos.length === 0 && <p className={styles.placeholder}>No se encontraron formularios cargados en su historial.</p>}
              </tbody>
            </table>      
            <ModalBorrar fileToDelete={'legajo'} modalDelete={openDeleteModal} setModalDelete={setOpenDeleteModal} idForm={fileSelected} showAlert={(type, msg) => showAlertNotif(type, msg)} />
          </div>
      </div>
  </>

  )
}
export default Legajos;