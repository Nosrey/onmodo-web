import React, { useEffect, useState } from 'react';
import styles from './SolicitudesDeEdicion.module.css';
import 'moment-timezone';

import { Oval } from 'react-loader-spinner';
import ModalEdicion from '../../components/modalEdicion/ModalEdicion';
import ModalBorrar from '../../components/modalBorrar/ModalBorrar';
import Alert from '../../components/shared/components/Alert/Alert';
import { FORMS_DE_VARIAS_ETAPAS, getUrlForm } from '../../utils/constants/data';
import { generatePDF } from '../../services/PDF';
import { getSolicitudesDeEdicion } from '../../services/Request';
import { useNavigate, useParams } from 'react-router-dom';
import ModalEdicionRespuesta from '../../components/modalEdicionRespuesta/ModalEdicionRespuesta';
import ModalEdicionInfo from '../../components/modalEdicionInfo/ModalEdicionInfo';
import { useMedia } from '../../utils/hooks/UseMedia';

const urlMapping = {
  controlalergenos: '/dietas-especiales',
  entregaBidones: '/bidones-de-aceite',
  flashIncidente: '/reporte-incidente',
  informeIntAccidente: '/informe-accidente',
  registroCapacitacion: '/registro-de-capacitacion',
  registroDecomiso: '/registro-decomisos-mp',
  registrosimulacro: '/registro-simulacro',
  reporteRechazo: '/rechazo-mp',
  verificacionBalanza: '/verificacion-balanza',
  verificacionTermometros: '/verificacion-termometro',
  entregaropa: '/ropa-de-trabajo',
};
const titleMapping = {
  controlalergenos: 'Control de comensales con dietas Especiales',
  entregaBidones: 'Entrega de bidones de aceite usado',
  flashIncidente: 'Flash reporte de incidentes',
  informeIntAccidente: 'Informe interno de accidente',
  registroCapacitacion: 'Registro de Capacitación',
  registroDecomiso: 'Decomiso de materias primas',
  registrosimulacro: 'Registro de Simulacro',
  reporteRechazo: 'Rechazo - Devolución de mat primas',
  verificacionBalanza: 'Verificación Balanzas',
  verificacionTermometros: 'Verificación Termómetros',
  entregaropa: 'Entrega de ropa de trabajo y EPP',
  controlCloro: 'Control de Cloro Activo Residual',
  recuperacionProducto: 'Recuperación de Productos',
  chequeoEpp: 'Chequeo de uso de EPP',
  descongelamiento: 'Planilla de Descongelamiento',
  carga: 'Planilla de Carga / Recepción de Materias Primas',
  controlEquipoFrio: 'Control de Equipos de Frio',
  controlProcesos: 'Control de Procesos',
  controlVidrio: 'Control de Vidrios',
  despachoProduccion: 'Despacho a Producción',
  distribucion: 'Distribución / Expedición',
  planillaArmado: 'Planilla de Armado y Fraccionamiento',
  recepcion: 'Planilla de Recepción',
  sanitizacion: 'Planilla de Sanitización',
  servicioEnLinea: 'Servicios en línea',
  usoCambioAceite: 'Uso y Cambio de Aceite en Freidora',
};

function SolicitudesDeEdicion() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [openInfo, setOpenInfo] = useState([]);
  const media = useMedia();

  const [formSelected, setFormSelected] = useState();
  const [formularios, setFormularios] = useState([]);
  const navigate = useNavigate();

  //** ALERTA */
  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [showAlert, setShowlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const goToForm = (form, status) => {
    navigate(form.url, { state: { objeto: form, status } });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (formularios) {
      const booleanos = [];
      for (let i = 0; i < formularios.length; i++) {
        booleanos.push(false);
      }
      setOpenInfo(booleanos);
    }
  }, [formularios]);
  const getTitle = (form) => {
    return titleMapping[form] || form;
  };

  const getUrl = (form) => {
    return urlMapping[form] || undefined;
  };

  const handleOrder = (value) => {
    console.log(value);
    switch (value) {
      case 'Más reciente':
        setFormularios(() => [...ordenReciente(formularios)]);
        break;
      case 'Más antiguo':
        console.log('entro aca');
        setFormularios(() => [...ordenAntiguo(formularios)]);
        break;
      default:
        break;
    }
  };

  const ordenReciente = (forms) => {
    return forms.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const ordenAntiguo = (forms) => {
    return forms.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  async function getData() {
    getSolicitudesDeEdicion()
      .then((resp) => {
        const result = [];
        for (const key in resp) {
          if (resp.hasOwnProperty(key)) {
            const items = resp[key];
            for (const item of items) {
              // creo mi objeto solo con la info que voy a necesitar
              console.log(key, getUrlForm(item.key));
              const newItem = {
                form: key,
                user: item.nombre,
                rol: item.rol,
                id: item._id,
                date: item.createdAt,
                url: getUrl(key),
                status: item.status,
                motivoPeticion: item.motivoPeticion,
                motivo: item.motivo,
                whoApproved: item.whoApproved,
                urlForm: getUrlForm(key),
              };
              result.push(newItem);
            }
          }
        }
        setIsLoading(false);
        return setFormularios(ordenReciente(result));
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }

  const openModalEdit = (form) => {
    setFormSelected(form);
    setOpenModal(true);
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
    if (type === 'success') {
      getData();
    }
  };

  const handleEdit = (formulario) => {
    openModalEdit(formulario);
  };

  const handleViewInfo = (formulario) => {
    setFormSelected(formulario);
    setOpenModalInfo(true);
  };
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
            justifyContent: 'center',
          }}
          wrapperClass=''
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor='#4fa94d'
          strokeWidth={5}
          strokeWidthSecondary={2}
        />
      ) : (
        <>
          <h2 className={styles.tituloRecord}>Solicitudes de Edición</h2>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <div className={styles.orderContainer}>
                <span className={styles.spanOrder}>Ordenar por:</span>
                <select name='' id={styles.select} onChange={(e) => handleOrder(e.target.value)}>
                  <option value='Más reciente'>Más reciente creado</option>
                  <option value='Más antiguo'>Más antiguo creado</option>
                </select>
              </div>
              <table className={styles.table}>
                <thead>
                  {media === 'mobile' ? (
                    <tr>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Estado</th>
                    </tr>
                  ) : (
                    <tr>
                      <th>Formulario</th>
                      <th>Año</th>
                      <th>Mes</th>
                      <th>Día</th>
                      <th>Hora</th>
                      <th>Solicitado por</th>
                      <th>Nivel</th>
                      <th>Estado</th>
                      <th className={styles.accion}>Acción</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {formularios.map((formulario, index) => {
                    const createdAtUTC = new Date(formulario.date);
                    const argentinaTime = new Date(createdAtUTC.getTime());

                    return (
                      <>
                        {media === 'mobile' ? (
                          <>
                            <tr key={index} className={styles.fila}>
                              <td style={{ borderBottom: 'none' }}>
                                {argentinaTime.getDate()}/{argentinaTime.getMonth() + 1}/
                                {argentinaTime.getFullYear()}
                              </td>

                              <td style={{ borderBottom: 'none' }}>
                                {argentinaTime.getHours()}:
                                {String(argentinaTime.getMinutes()).padStart(2, '0')}
                              </td>

                              <td
                                style={{ borderBottom: 'none' }}
                                className={
                                  formulario.status === ''
                                    ? ''
                                    : formulario.status === 'pending'
                                    ? styles.pendingText
                                    : formulario.status === 'approved'
                                    ? styles.aprovedText
                                    : formulario.status === 'denied'
                                    ? styles.deniedText
                                    : ''
                                }
                              >
                                {formulario.status === ''
                                  ? '-'
                                  : formulario.status === 'pending'
                                  ? 'Pendiente'
                                  : formulario.status === 'approved'
                                  ? 'Aprobado'
                                  : formulario.status === 'denied'
                                  ? 'Denegado'
                                  : ''}
                              </td>
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
                            {console.log(openInfo)}
                            {openInfo[index] && (
                              <>
                                <tr>
                                  <td style={{ borderBottom: 'none' }} className={styles.titulo}>
                                    {getTitle(formulario.form)}
                                  </td>
                                  <td style={{ textTransform: 'capitalize', borderBottom: 'none' }}>
                                    {formulario.user}
                                  </td>
                                  <td style={{ textTransform: 'capitalize', borderBottom: 'none' }}>
                                    Nivel {formulario.rol}
                                  </td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #ccc' }}>
                                  <td style={{ borderBottom: 'none' }}>
                                    <span
                                      onClick={() => goToForm(formulario, 'view')}
                                      className={styles.actionIcon}
                                    >
                                      <i className='ri-eye-line'></i>
                                    </span>

                                    {formulario.status === 'pending' ? (
                                      <span
                                        onClick={() => handleEdit(formulario)}
                                        className={styles.actionIcon}
                                      >
                                        <i className='ri-pencil-line'></i>
                                      </span>
                                    ) : (
                                      <span
                                        onClick={() => handleViewInfo(formulario)}
                                        className={styles.actionIcon}
                                      >
                                        <i className='ri-information-line'></i>
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              </>
                            )}
                          </>
                        ) : (
                          <tr key={index} className={styles.fila}>
                            <td className={styles.titulo}>{getTitle(formulario.form)}</td>
                            <td>{argentinaTime.getFullYear()}</td>
                            <td>{argentinaTime.getMonth() + 1}</td>
                            <td>{argentinaTime.getDate()}</td>
                            <td>
                              {argentinaTime.getHours()}:
                              {String(argentinaTime.getMinutes()).padStart(2, '0')}
                            </td>
                            <td style={{ textTransform: 'capitalize' }}>{formulario.user}</td>
                            <td style={{ textTransform: 'capitalize' }}>{formulario.rol}</td>

                            <td
                              className={
                                formulario.status === ''
                                  ? ''
                                  : formulario.status === 'pending'
                                  ? styles.pendingText
                                  : formulario.status === 'approved'
                                  ? styles.aprovedText
                                  : formulario.status === 'denied'
                                  ? styles.deniedText
                                  : ''
                              }
                            >
                              {formulario.status === ''
                                ? '-'
                                : formulario.status === 'pending'
                                ? 'Pendiente'
                                : formulario.status === 'approved'
                                ? 'Aprobado'
                                : formulario.status === 'denied'
                                ? 'Denegado'
                                : ''}
                            </td>
                            <td className={styles.contEdicion}>
                              <span
                                onClick={() => goToForm(formulario, 'view')}
                                className={styles.actionIcon}
                              >
                                <i className='ri-eye-line'></i>
                              </span>

                              {formulario.status === 'pending' ? (
                                <span
                                  onClick={() => handleEdit(formulario)}
                                  className={styles.actionIcon}
                                >
                                  <i className='ri-pencil-line'></i>
                                </span>
                              ) : (
                                <span
                                  onClick={() => handleViewInfo(formulario)}
                                  className={styles.actionIcon}
                                >
                                  <i class='ri-information-line'></i>
                                </span>
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                  {formularios.length === 0 && (
                    <p className={styles.placeholder}>
                      No se encontraron formularios cargados en su historial.
                    </p>
                  )}
                </tbody>
              </table>
              <ModalEdicionInfo
                openModal={openModalInfo}
                setOpenModal={setOpenModalInfo}
                form={formSelected}
              />

              <ModalEdicionRespuesta
                openModal={openModal}
                setOpenModal={setOpenModal}
                idForm={formSelected && formSelected.id}
                urlForm={formSelected && formSelected.urlForm}
                showAlert={(type, msg) => showAlertNotif(type, msg)}
                motivo={
                  formSelected && formSelected.motivoPeticion ? formSelected.motivoPeticion : null
                }
              />
            </div>
          </div>
        </>
      )}
      {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
    </>
  );
}

export default SolicitudesDeEdicion;
