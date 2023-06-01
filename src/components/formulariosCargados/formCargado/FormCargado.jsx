import React, { useState } from 'react';
import styles from './FormCargado.module.css';
import ModalEdicion from '../../modalEdicion/ModalEdicion';
import ModalBorrar from '../../modalBorrar/ModalBorrar';

function FormCargado() {
  const [openModal, setOpenModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const formularios = [
    {
      nombre: 'Formulario 1',
      anio: 2023,
      mes: 'Mayo',
      dia: 30,
      hora: '12:00 PM',
      usuario: 'Usuario 1',
      edicion: 'Editar',
    },
    {
      nombre: 'Formulario 2',
      anio: 2023,
      mes: 'Junio',
      dia: 1,
      hora: '10:00 AM',
      usuario: 'Usuario 2',
      edicion: 'Editar',
    },
    {
      nombre: 'Formulario 2',
      anio: 2023,
      mes: 'Junio',
      dia: 1,
      hora: '10:00 AM',
      usuario: 'Usuario 2',
      edicion: 'Editar',
    },
    {
      nombre: 'Formulario 2',
      anio: 2023,
      mes: 'Junio',
      dia: 1,
      hora: '10:00 AM',
      usuario: 'Usuario 2',
      edicion: 'Editar',
    },
    {
      nombre: 'Formulario 2',
      anio: 2023,
      mes: 'Junio',
      dia: 1,
      hora: '10:00 AM',
      usuario: 'Usuario 2',
      edicion: 'Editar',
    },
    // Agrega más objetos de formulario según sea necesario
  ];
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Formulario</th>
              <th>Año</th>
              <th>Mes</th>
              <th>Día</th>
              <th>Hora</th>
              <th>Usuario</th>
              <th>Edición</th>
              <th className={styles.accion}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {formularios.map((formulario, index) => (
              <tr key={index} className={styles.fila}>
                <td>{formulario.nombre}</td>
                <td>{formulario.anio}</td>
                <td>{formulario.mes}</td>
                <td>{formulario.dia}</td>
                <td>{formulario.hora}</td>
                <td>{formulario.usuario}</td>
                <td>{formulario.edicion}</td>
                <td className={styles.contEdicion}>
                  <span className={styles.actionIcon}>
                    <i class='ri-eye-line'></i>
                  </span>
                  <span onClick={() => setOpenModal(true)} className={styles.actionIcon}>
                    <i class='ri-pencil-line'></i>
                  </span>
                  <span onClick={() => setModalDelete(true)} className={styles.actionIcon}>
                    <i class='ri-delete-bin-line'></i>
                  </span>
                  <span className={styles.actionIcon}>
                    <i class='ri-printer-line'></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ModalEdicion openModal={openModal} setOpenModal={setOpenModal} />
        <ModalBorrar modalDelete={modalDelete} setModalDelete={setModalDelete} />
      </div>
    </div>
  );
}

export default FormCargado;
