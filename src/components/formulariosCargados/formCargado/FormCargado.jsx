import React, { useEffect, useState } from 'react';
import styles from './FormCargado.module.css';
import ModalEdicion from '../../modalEdicion/ModalEdicion';
import ModalBorrar from '../../modalBorrar/ModalBorrar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFormulario } from '../../../redux/actions/formulariosActions';

function FormCargado( {formulario} ) {
  const [openModal, setOpenModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [formularios, setFormularios] = useState([]);
  const [name, setName] = useState("");
  const { form } = useParams()
  const [titulo, setTitulo] = useState("");

  const idUser = localStorage.getItem("idUser");

  useEffect(() => {
    getName();
    getData();
    getTitle();
  }, [])


  console.log("form", form)
  async function getTitle() {

    if (form == "controlalergenos") {
      setTitulo("Control Alergenos")
    } else if (form == "entregabidones") {
      setTitulo("Entrega Bidones")
    }
    else if (form == "flashincidente") {
      setTitulo("Flash Incidente")
    }
    else if (form == "informeintaccidente") {
      setTitulo("Informe Accidente")
    }
    else if (form == "registrocapacitacion") {
      setTitulo("Registro Capacitacion")
    }
    else if (form == "registrodecomiso") {
      setTitulo("Registro Decomiso")
    }
    else if (form == "registrosimulacro") {
      setTitulo("Registro Simulacro")
    }
    else if (form == "reporterechazo") {
      setTitulo("Reporte Rechazo")
    }
    else if (form == "verificacionbalanza") {
      setTitulo("Verificacion Balanza")
    }
    else if (form == "verificaciontermometros") {
      setTitulo("Verificacion Termometros")
    }
    else {
      setTitulo("0")
    }
  }

  console.log("formularioooo", formulario)
  async function fetchDataAndAccessData() {
    try {
      const response = await axios.get(`https://api.onmodoapp.com/api/business/${idUser}`);
      const datae = response.data.response[0];
      return datae;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  async function getData() {
    const data = await fetchDataAndAccessData();

    if (data.hasOwnProperty(form)) {
      const info = data[form];
      setFormularios(info)
      console.log(`Valor de formulario`, formularios);
      console.log(`Valor de asd`, info);
    } else {
      console.log("error");
    }
  }

  async function getName() {
    const data = await fetchDataAndAccessData();
    setName(data.fullName)
    console.log("datita", data.fullName)
  }

  console.log(`Valor de formulariooiooooo`, fetchDataAndAccessData());

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.orderContainer}>
          <span className={styles.spanOrder}>Ordenar por:</span>
          <select name='' id={styles.select} onChange={console.log("orden")}>
            <option value='Últimos utilizados'>Últimos utilizados</option>
            <option value='A-Z'>A - Z</option>
            <option value='Z-A'>Z - A</option>
          </select>
        </div>
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
                <td>{titulo}</td>
                <td>{formulario.createdAt.slice(0, 4)}</td>
                <td>{formulario.createdAt.slice(5, 7)}</td>
                <td>{formulario.createdAt.slice(8, 10)}</td>
                <td>{formulario.createdAt.slice(11, 16)}</td>
                <td>{name}</td>
                <td>Edicion</td>
                <td className={styles.contEdicion}>
                <Link
                  to={`/${form}`}
                  onClick={() => setFormulario(formulario) }
                  
                    className={styles.actionIcon}
                    
                > 
                   <i className='ri-eye-line'>

                   </i>
                  </Link>
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

const mapDispatchToProps = {
  setFormulario,
};
const mapStateToProps = (state) => ({
  formulario: state.formulario,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormCargado);
