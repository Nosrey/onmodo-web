import React, { useEffect, useState } from 'react';
import styles from './FormCargado.module.css';
import ModalEdicion from '../../modalEdicion/ModalEdicion';
import ModalBorrar from '../../modalBorrar/ModalBorrar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFormulario } from '../../../redux/actions/formulariosActions';
import Alert from '../../shared/components/Alert/Alert';
import moment from 'moment';
import 'moment-timezone';

import { generatePDF } from '../../../services/PDF';


function FormCargado() {
  const [openModal, setOpenModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [formSelected, setFormSelected] = useState();
  const [formularios, setFormularios] = useState([]);
  const [name, setName] = useState("");
  const { form } = useParams()
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  const idUser = localStorage.getItem("idUser");
  const navigate = useNavigate();

  //** ALERTA */
  const [textAlert, setTextAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showAlert, setShowlert] = useState(false);


  const goToForm = (form) => {
    navigate(url, { state: { objeto: form } });
  };

  useEffect(() => {
    getName();
    getData();
    getTitle();
  }, [])


  async function getTitle() {

    if (form == "controlalergenos") {
      setTitulo("Control Alergenos")
      setUrl("/dietas-especiales")

    } else if (form == "entregabidones") {
      setTitulo("Entrega de Bidones de aceite usado")
      setUrl("/bidones-de-aceite")
    }
    else if (form == "flashincidente") {
      setTitulo("Flash reporte de incidentes")
      setUrl("/reporte-incidente")
    }
    else if (form == "informeintaccidente") {
      setTitulo("Informe interno de accidente")
      setUrl("/informe-accidente")
    }
    else if (form == "registrocapacitacion") {
      setTitulo("Registro de capacitación")
      setUrl("/registro-de-capacitacion")
    }
    else if (form == "registrodecomiso") {
      setTitulo("Registro Decomiso")
      setUrl("/registro-decomisos-mp")
    }
    else if (form == "registrosimulacro") {
      setTitulo("Registro de simulacro")
      setUrl("/registro-simulacro")
    }
    else if (form == "reporterechazo") {
      setTitulo("Reporte de rechazo de materia prima");
      setUrl("/rechazo-mp")
    }
    else if (form == "verificacionbalanza") {
      setTitulo("Verificacion Balanza")
      setUrl("/verificacion-balanza")
    }
    else if (form == "verificaciontermometros") {
      setTitulo("Verificacion Termometros");
      setUrl("/verificacion-termometro")
    }
    else if (form == "carga") {
      setTitulo("Carga y Recepción");
      setUrl("/carga")
    }
    else {
      setTitulo("0")
    }
  }

  async function fetchDataAndAccessData() {
    try {
      const response = await axios.get(`http://localhost:8080/api/business/${idUser}`);
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
    } else {
      console.log("error");
    }
  }

  async function getName() {
    const data = await fetchDataAndAccessData();
    setName(data.fullName)
  }

  const openDeleteModal = (id) => {
    setFormSelected(id);
    setModalDelete(true);
  }

  const openModalEdit = (form) => {
    console.log(form._id)
    setFormSelected(form._id);
    if (formSelected && form.status !== "pending" && form.status !== "denied") {
      setOpenModal(true);
    }
    if(form.status === "approved"){
      goToForm(form)
      // abrir modal con mensaje y enviar a editar
    }
    if(form.status === "denied"){
      // abrir modal con mensaje
    }
  }

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
      getData();
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.orderContainer}>
            <span className={styles.spanOrder}>Ordenar por:</span>
            <select name='' id={styles.select} onChange={() => console.log("orden")}>
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
            {formularios.map((formulario, index) => {
  const createdAtUTC = new Date(formulario.createdAt);
  const argentinaTime = new Date(createdAtUTC.getTime() );

  return (
    <tr key={index} className={`${styles.fila} ${formulario.status === "" ? "" : (
      formulario.status === "pending" ? styles.pendingRow : (
        formulario.status === "approved" ? styles.aprovedRow : (
          formulario.status === "denied" ? styles.deniedRow : ""
        )
      )
    )}`}>
      <td>{titulo}</td>
      <td>{argentinaTime.getFullYear()}</td>
      <td>{argentinaTime.getMonth() + 1}</td>
      <td>{argentinaTime.getDate()}</td>
      <td>{argentinaTime.getHours()}:{String(argentinaTime.getMinutes()).padStart(2, '0')}</td>
      <td>{name}</td>
      <td className={formulario.status === "" ? "" : (
          formulario.status === "pending" ? styles.pendingText : (
            formulario.status === "approved" ? styles.aprovedText : (
              formulario.status === "denied" ? styles.deniedText : ""
            )
          )
        )}>
        {formulario.status === "" ? "-" : (
          formulario.status === "pending" ? "Pendiente" : (
            formulario.status === "approved" ? "Aprobado" : (
              formulario.status === "denied" ? "Denegado" : ""
            )
          )
        )}
      </td>
      <td className={styles.contEdicion}>
        <span onClick={() => goToForm(formulario)} className={styles.actionIcon}>
          <i className='ri-eye-line' ></i>
        </span>
        <span onClick={() => openModalEdit(formulario)} className={styles.actionIcon}>
          <i className='ri-pencil-line'></i>
        </span>
        <span onClick={() => openDeleteModal(formulario._id)} className={styles.actionIcon}>
          <i className='ri-delete-bin-line'></i>
        </span>
        <span onClick={() => generatePDF(formulario, form)} className={styles.actionIcon}>
          <i className='ri-printer-line'></i>
        </span>
      </td>
    </tr>
  );
})}

            </tbody>
          </table>
          <ModalEdicion openModal={openModal} setOpenModal={setOpenModal} idForm={formSelected} urlForm={form} showAlert={(type, msg) => showAlertNotif(type, msg)}/>
          <ModalBorrar modalDelete={modalDelete} setModalDelete={setModalDelete} idForm={formSelected} url={form} showAlert={(type, msg) => showAlertNotif(type, msg)} />
        </div>
      </div>
      {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
    </>

  );
}

const mapDispatchToProps = {
  setFormulario,
};
const mapStateToProps = (state) => ({
  formulario: state.formulario,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormCargado);
