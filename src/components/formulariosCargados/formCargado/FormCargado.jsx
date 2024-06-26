import React, { useEffect, useState } from 'react';
import styles from './FormCargado.module.css';
import ModalEdicion from '../../modalEdicion/ModalEdicion';
import ModalBorrar from '../../modalBorrar/ModalBorrar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFormulario } from '../../../redux/actions/formulariosActions';
import Alert from '../../shared/components/Alert/Alert';
import 'moment-timezone';

import { generatePDF } from '../../../services/PDF';
import { Oval } from 'react-loader-spinner';
import ModalEdicionInfo from '../../modalEdicionInfo/ModalEdicionInfo';
import { FORMS_WEB, FORMS_TITLES } from '../../../utils/constants/data';
import { useMedia } from '../../../utils/hooks/UseMedia';


function FormCargado() {
  const location = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [formSelected, setFormSelected] = useState();
  const [formularios, setFormularios] = useState([]);
  const [name, setName] = useState("");
  const { form, legajo } = useParams()
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  const idUser = localStorage.getItem("idUser");
  const navigate = useNavigate();
  const [openInfo, setOpenInfo] = useState([]);
  const media = useMedia();

  //** ALERTA */
  const [textAlert, setTextAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showAlert, setShowlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const goToForm = (form, status) => {
    if (url === "/registro-de-capacitacion") {
      let form2 = {
        ...form,
        asistentes: JSON.parse(form?.asistentes),
        checkboxes: JSON.parse(form?.checkboxes),
        materialEntregado: JSON.parse(form?.materialEntregado),
        materialExpuesto: JSON.parse(form?.materialExpuesto),
      }
      navigate(url, { state: { objeto: form2, status } });
    } else if (url === "/registro-simulacro") {
      let form2 = {
        ...form,
        personas: JSON.parse(form?.personas),
      }
      navigate(url, { state: { objeto: form2, status } });
    }
    else {
      navigate(url, { state: { objeto: form, status } });
    }
  };

  useEffect(() => {
    getName();
    getData();
    getTitle();
  }, [])


  async function getTitle() {
    if (form == "controlalergenos") {
      setTitulo("Control de comensales con dietas Especiales")
      setUrl("/dietas-especiales")

    } else if (form == "entregabidones") {
      setTitulo("Entrega de bidones de aceite usado")
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
      setTitulo("Registro de Capacitación")
      setUrl("/registro-de-capacitacion")
    }
    else if (form == "registrodecomiso") {
      setTitulo("Decomiso de materias primas")
      setUrl("/registro-decomisos-mp")
    }
    else if (form == "registrosimulacro") {
      setTitulo("Registro de Simulacro")
      setUrl("/registro-simulacro")
    }
    else if (form == "reporterechazo") {
      setTitulo("Rechazo - Devolución de mat primas");
      setUrl("/rechazo-mp")
    }
    else if (form == "verificacionbalanza") {
      setTitulo("Verificación Balanzas")
      setUrl("/verificacion-balanza")
    }
    else if (form == "verificaciontermometros") {
      setTitulo("Verificación Termómetros");
      setUrl("/verificacion-termometro")
    }
    else if (form == "entregaropa") {
      setTitulo("Entrega de ropa de trabajo y EPP")
      setUrl('/ropa-de-trabajo')
    }
    else {
      setTitulo("0")
    }
  }

  async function fetchDataAndAccessData(id) {
    try {
      const response = await axios.get(`https://api.onmodoapp.com/api/business/${id}`);
      const datae = response.data.response[0];
      return datae;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  const getAllWebForms = (data) =>{
    return FORMS_WEB.reduce((acumulador, form) => {
      if (data.hasOwnProperty(form)) {
        const dataWithTitle = data[form].map(obj => ({...obj, title: FORMS_TITLES[form]}))
        return acumulador.concat(dataWithTitle);
      }
      return acumulador;
    }, []);
  }

  const handleSetForms = (forms) => {
    setFormularios(forms.reverse());
    setIsLoading(false)
  }

  async function getData() {
    let data;
    if(location.pathname.includes('formularios-legajos') && legajo) {
      const allForms = await fetchDataAndAccessData(legajo);
      data = getAllWebForms(allForms);
      handleSetForms(data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
    }else {
      data = await fetchDataAndAccessData(idUser);
    }

    if (data.hasOwnProperty(form)) {
      const info = data[form];
      handleSetForms(info);
    } else {
      console.log("error");
    }
  }

  async function getName() {
    const data = await fetchDataAndAccessData(legajo ? legajo : idUser);
    setName(data.fullName)
  }

  const openDeleteModal = (id) => {
    setFormSelected(id);
    setModalDelete(true);
  }

  const openModalEdit = (form) => {
    setFormSelected(form._id);
    if (form.status !== "pending" && form.status !== "denied") {
      setOpenModal(true);
    }
    // if(form.status === "approved"){
    //   goToForm(form, 'edit')
    //   // abrir modal con mensaje y enviar a editar
    // }
  }

  const handleViewInfo = (formulario) => {
    setFormSelected(formulario);
    setOpenModalInfo(true);
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
            <select name='' id={styles.select} onChange={() => console.log("orden")}>
              <option value='Últimos utilizados'>Últimos utilizados</option>
              <option value='A-Z'>A - Z</option>
              <option value='Z-A'>Z - A</option>
            </select>
          </div>
          <table className={styles.table}>
            <thead>
            {media === 'mobile' ? (
                    <tr>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Usuario</th>
                    </tr>
                  ) : (
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
               )}
            </thead>
            <tbody>
            {formularios.map((formulario, index) => {
              const createdAtUTC = new Date(formulario.createdAt);
              const argentinaTime = new Date(createdAtUTC.getTime() );

              return (
                <>
                  {media === 'mobile' ? (
                    <>
                   <tr key={index} className={styles.fila}>

                      <td
                                style={{
                                  borderBottom: openInfo[index] ? 'none' : '1px solid #ccc',
                                }}
                              >
                                {argentinaTime.getDate()}/{argentinaTime.getMonth() + 1}/
                                {argentinaTime.getFullYear()}
                              </td>                      <td
                          style={{
                            borderBottom: openInfo[index] ? 'none' : '1px solid #ccc',
                          }}
                        >
                          {argentinaTime.getHours()}:
                          {String(argentinaTime.getMinutes()).padStart(2, '0')}
                        </td>
                      <td style={{textTransform:'capitalize', borderBottom: openInfo[index] ? 'none' : '1px solid #ccc' }}>{name}</td>
                      <td style={{ borderBottom: 'none' }}>
                          <span
                            onClick={() => {
                              const copy = [...openInfo];
                              copy[index] = !copy[index];
                              setOpenInfo(copy);
                            }}
                          >
                            {openInfo[index] ? (
                              <i class='ri-arrow-up-s-line'></i>
                            ) : (
                              <i class='ri-arrow-down-s-line'></i>
                            )}
                          </span>
                        </td>
                    </tr>
                     {openInfo[index] && (
                      <>
                        <tr style={{ borderBottom: '1px solid #ccc' }}>
                        <td className={styles.contEdicion}>
                        <span onClick={() => goToForm(formulario, 'view')} className={styles.actionIcon}>
                          <i className='ri-eye-line' ></i>
                        </span>
                        {
                          formulario.status === 'denied' ?
                            <span onClick={() => handleViewInfo(formulario)} className={styles.actionIcon}>
                              <i class="ri-information-line"></i>
                            </span>
                          :
                          <span 
                            onClick={() =>{
                              if (formulario.status === 'free'|| (formulario.status === 'approved' && formulario.editEnabled === true)) {
                      
                                goToForm(formulario, 'edit')
                              } else {
                                openModalEdit(formulario)}

                              }
                            }
                            className={styles.actionIcon}>
                            <i className='ri-pencil-line'></i>
                          </span>
                        }
                        
                        <span onClick={() => openDeleteModal(formulario._id)} className={styles.actionIcon}>
                          <i className='ri-delete-bin-line'></i>
                        </span>
                        
                      </td>
                        </tr>
                      </>
                      )}
                    </>
                  ) : (
                <tr key={index} className={styles.fila}>
                  <td className={styles.titulo}>{formulario.title ? formulario.title : titulo}</td>
                  <td>{argentinaTime.getFullYear()}</td>
                  <td>{argentinaTime.getMonth() + 1}</td>
                  <td>{argentinaTime.getDate()}</td>
                  <td>{argentinaTime.getHours()}:{String(argentinaTime.getMinutes()).padStart(2, '0')}</td>
                  <td style={{textTransform:'capitalize'}}>{name}</td>
                  <td className={formulario.status === "" ? "" : (
                      formulario.status === "pending" ? styles.pendingText : (
                        formulario.status === "approved" ? styles.aprovedText : (
                          formulario.status === "denied" ? styles.deniedText : ""
                        )
                      )
                    )}>
                    {formulario.status === "" || formulario.status === 'free' ? "-" : (
                      formulario.status === "pending" ? "Pendiente" : (
                        formulario.status === "approved" ? "Aprobado" : (
                          formulario.status === "denied" ? "Denegado" : ""
                        )
                      )
                    )}
                  </td>
                  <td className={styles.contEdicion}>
                    <span onClick={() => goToForm(formulario, 'view')} className={styles.actionIcon}>
                      <i className='ri-eye-line' ></i>
                    </span>
                    {
                      formulario.status === 'denied' ?
                        <span onClick={() => handleViewInfo(formulario)} className={styles.actionIcon}>
                          <i class="ri-information-line"></i>
                        </span>
                      :
                      <span 
                        onClick={() =>{
                          if (formulario.status === 'free'|| (formulario.status === 'approved' && formulario.editEnabled === true)) {
                  
                            goToForm(formulario, 'edit')
                          } else {
                            openModalEdit(formulario)}

                          }
                        }
                        className={styles.actionIcon}>
                        <i className='ri-pencil-line'></i>
                      </span>
                    }
                    
                    <span onClick={() => openDeleteModal(formulario._id)} className={styles.actionIcon}>
                      <i className='ri-delete-bin-line'></i>
                    </span>
                    <span onClick={() => generatePDF(formulario, form)} className={styles.actionIcon}>
                      <i className='ri-printer-line'></i>
                    </span>
                  </td>
                </tr>
                )}
                </>
              );
            })}
            {formularios.length === 0 && <p className={styles.placeholder}>No se encontraron formularios cargados en su historial.</p>}

            </tbody>
          </table>
          <ModalEdicionInfo openModal={openModalInfo} setOpenModal={setOpenModalInfo} form={formSelected}/>

          <ModalEdicion openModal={openModal} setOpenModal={setOpenModal} idForm={formSelected} urlForm={form} showAlert={(type, msg) => showAlertNotif(type, msg)}/>
          <ModalBorrar fileToDelete={'formulario'} modalDelete={modalDelete} setModalDelete={setModalDelete} idForm={formSelected} url={form} showAlert={(type, msg) => showAlertNotif(type, msg)} />
        </div>
      </div>)}
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