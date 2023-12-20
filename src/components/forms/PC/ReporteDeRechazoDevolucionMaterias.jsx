import { Button, TextField, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./ReporteDeRechazoDevolucionMaterias.module.css";
import Modal from '../../shared/Modal';
import RechazoInfo from "../../modales/RechazoInfo";
import Alert from "../../shared/components/Alert/Alert";
import { editReporteRechazo, reporteRechazo, sendEditApplication } from "../../../services/FormsRequest";
import { useLocation, useNavigate } from "react-router-dom";

function ReporteDeRechazoDevolucionMaterias() {
  const location = useLocation();
  const navigate = useNavigate();
  let infoPrecargada = location.state?.objeto;

  // }; // objeto que viene del historial (si vengo del historial)
  const currentStatus = location.state?.status; // ('view' o 'edit' segun si vengo del icono del ojito o  de editar)
  //** ALERTA */
  const [textAlert, setTextAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showAlert, setShowlert] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [inputs] = useState([
    {
      "Condiciones de entrega": [
        { id: 1, label: "Atrasado" },
        { id: 2, label: "Adelantado" },
      ],
    },
    {
      Calidad: [
        { id: 3, label: "Temperatura" },
        { id: 4, label: "Vida útil" },
        { id: 5, label: "Embalaje" },
        { id: 6, label: "Rótulo" },
        { id: 7, label: "Calibre" },
        { id: 8, label: "Color" },
        { id: 9, label: "Signos de maduración" },
        { id: 10, label: "Consistencia/Textura" },
        { id: 11, label: "Olor" },
      ],
    },
    {
      Diferencias: [
        { id: 12, label: "Precio" },
        { id: 13, label: "Cantidad" },
      ],
    },
    {
      Transporte: [
        { id: 14, label: "Temperatura de la caja" },
        { id: 15, label: "Uniforme del proveedor" },
        { id: 16, label: "Predisposición /Conducta" },
        { id: 17, label: "Vehículo" },
        { id: 18, label: "Otras Faltas" },
      ],
    },
  ]);
  const [secondInputs] = useState([
    { id: 19, label: "Rechazo  (en el momento de la recepción)" },
    { id: 20, label: "Devolución (lotes ya ingresados)" },
    {
      id: 21,
      label:
        "Aceptado condicional  (ante cambios de calidad de mercadería, sin peligros de inocuidad)",
    },
  ]);
  const [replicas] = useState(1);
  var idUser = localStorage.getItem("idUser");
  const [values, setValues] = useState({
    dia: "",
    proveedor: "",
    producto: "",
    nroLote: "",
    checksNoConformidades: [
      [
        {
          "checked": false,
          "name": "Atrasado",
          "description": ""
        },
        {
          "checked": false,
          "name": "Adelantado",
          "description": ""
        }
      ],
      [
        {
          "checked": false,
          "description": "",
          "name": "Temperatura"
        },
        {
          "checked": false,
          "name": "Vida útil",
          "description": ""
        },
        {
          "description": "",
          "name": "Embalaje",
          "checked": false
        },
        {
          "checked": false,
          "name": "Rótulo",
          "description": ""
        },
        {
          "checked": false,
          "name": "Calibre",
          "description": ""
        },
        {
          "checked": false,
          "name": "Color",
          "description": ""
        },
        {
          "description": "",
          "name": "Signos de maduración",
          "checked": false
        },
        {
          "checked": false,
          "name": "Consistencia/Textura",
          "description": ""
        },
        {
          "checked": false,
          "name": "Olor",
          "description": ""
        }
      ],
      [
        {
          "checked": false,
          "name": "Precio",
          "description": ""
        },
        {
          "checked": false,
          "name": "Cantidad",
          "description": ""
        }
      ],
      [
        {
          "description": "",
          "name": "Temperatura de la caja",
          "checked": false
        },
        {
          "description": "",
          "name": "Uniforme del proveedor",
          "checked": false
        },
        {
          "description": "",
          "name": "Predisposición /Conducta",
          "checked": false
        },
        {
          "description": "",
          "name": "Vehículo",
          "checked": false
        },
        {
          "description": "",
          "name": "Otras Faltas",
          "checked": false
        }
      ]
    ],
    checksMedidas: [
      {
        "description": "",
        "name": "Rechazo  (en el momento de la recepción)",
        "checked": false
      },
      {
        "description": "",
        "name": "Devolución (lotes ya ingresados)",
        "checked": false
      },
      {
        "description": "",
        "name": "Aceptado condicional  (ante cambios de calidad de mercadería, sin peligros de inocuidad)",
        "checked": false
      }
    ],
    idUser: idUser
  })

  const inputsValuesConstructor = () => {
    let objetoFinal = {
      dia: values?.dia,
      proveedor: values?.proveedor,
      producto: values?.producto,
      nroLote: values?.nroLote,
      condicionesEntrega: values.checksNoConformidades && values.checksNoConformidades[0] || [],
      calidad: values.checksNoConformidades && values.checksNoConformidades[1] || [],
      diferencias: values.checksNoConformidades && values.checksNoConformidades[2] || [],
      transporte: values.checksNoConformidades && values.checksNoConformidades[3] || [],
      medidasTomadas: values.checksMedidas,
      idUser: idUser
    }
    return objetoFinal;
  };

  const handleSubmit = () => {
    let objetoFinal = inputsValuesConstructor();
    reporteRechazo(objetoFinal).then((resp) => {
      if (resp.error) {
        setTextAlert('Ocurrió un error');
        setTypeAlert('error');
      } else {
        setTextAlert('¡Formulario cargado exitosamente!');
        setTypeAlert('success');
         // limpiar fomr
       window.location.href = window.location.href;
      }
    }).catch((resp) => {
      setTextAlert("Ocurrió un error")
      setTypeAlert("error");
    }).finally(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setShowlert(true);
      setTimeout(() => {
        setShowlert(false);

      }, 7000);
    }
    )
  };

  const handleEdit = () => {
    let objetoFinal = inputsValuesConstructor();
    editReporteRechazo(objetoFinal, infoPrecargada._id).then((resp) => {
      if (resp.error) {
        setTextAlert('Ocurrió un error');
        setTypeAlert('error');
      } else {
        setTextAlert('¡Formulario editado exitosamente!');
        setTypeAlert('success');
        const data = {
          editEnabled: false,
          status:"",
        }
        sendEditApplication({values: data, formId:  infoPrecargada._id, form: '/reporterechazo'}).finally((resp)=>{
          navigate('/formularios-cargados/reporterechazo');
        })
      }
    }).catch((resp) => {
      setTextAlert("Ocurrió un error")
      setTypeAlert("error");
    }).finally(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setShowlert(true);
      setTimeout(() => {
        setShowlert(false);

      }, 7000);
    }
    )
  };

  useEffect(() => {
    if (infoPrecargada) { // muestro un form del historial
      console.log(infoPrecargada)
      setValues({
        dia: infoPrecargada.dia,
        proveedor: infoPrecargada.proveedor,
        producto: infoPrecargada.producto,
        nroLote: infoPrecargada.nroLote,
        // condicionesEntrega: infoPrecargada.condicionesEntrega,
        // calidad: infoPrecargada.calidad,
        // diferencias: infoPrecargada.diferencias,
        // transporte: infoPrecargada.transporte,
        // medidasTomadas: infoPrecargada.medidasTomadas,
        date: infoPrecargada.date,
        idUser: idUser,
        checksNoConformidades:[
          infoPrecargada.condicionesEntrega,infoPrecargada.calidad,infoPrecargada.diferencias,infoPrecargada.transporte,
        ],
        checksMedidas:infoPrecargada.medidasTomadas
      })

    } else { // creo un form desde cero


    }
  }, [location.state?.objeto])

  return (
    <>
      <div>
        <div className="form">
          <div className="titleContainer">
            <h3 className="title">
              Reporte de Rechazo/Devolución de Materias Primas
            </h3>
            { (currentStatus === 'view' || currentStatus === 'edit') &&
                <span style={{marginLeft:'20px', fontSize:'20px'}}>
                    <i className={ currentStatus === 'view' ? 'ri-eye-line':'ri-pencil-line' }></i>
                </span>
            }
          </div>
          {showModal ? (
            <Modal
              content={<RechazoInfo />}
              closeModal={() => setShowModal(false)}
            />

          )
            : (
              <div className='cont-btn'>
                <Button size="small" onClick={() => setShowModal(true)}>
                  <i class="ri-information-line" style={{ marginRight: "8px", fontSize: "22px" }}></i> Ver Más
                </Button>
              </div>
            )
          }

          <div className="tableSection">
            <div className={styles.personal}>

              <TextField
                label="Fecha"
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                id="fecha"
                name="fecha"
                value={values?.dia || ''}
                disabled={currentStatus === 'view'}
                onChange={(e) => { setValues({ ...values, dia: e.target.value }) }}

              />

              <TextField
                onChange={(e) => {
                  setValues({ ...values, proveedor: e.target.value })
                }}
                id="outlined-basic"
                label="PROVEEDOR"
                variant="outlined"
                value={values?.proveedor || ''}
                disabled={currentStatus === 'view'}
              />
              <TextField
                onChange={(e) => {
                  setValues({ ...values, producto: e.target.value })
                }}
                id="outlined-basic"
                label="PRODUCTO"
                variant="outlined"
                value={values?.producto || ''}
                disabled={currentStatus === 'view'}
              />
              <TextField
                onChange={(e) => {
                  setValues({ ...values, nroLote: e.target.value })
                }}
                id="outlined-basic"
                label="NRO. LOTE"
                variant="outlined"
                value={values?.nroLote || ''}
                disabled={currentStatus === 'view'}
              />
            </div>
            <br />
            <br />
            <div>
              <h2 className={styles.sectionTitle}>Posibles no conformidades</h2>
              <p>
                Marcar la casilla y completar con la descripción de la no
                conformidad.
              </p>
              {Array(replicas)
                .fill(0)
                .map((_, index) => (
                  <div className={styles.sectionsContainer} key={index}>
                    {inputs.map((section, indexInputs) => (
                      <div >
                        <div className={styles.subtitleCont} key={section}>
                          <p className={styles.subtitle}>
                            {Object.keys(section)}
                          </p>
                        </div>
                        {section[Object.keys(section)].map((value, indexSection) => (
                          <div className={styles.inputRow} key={value.id}>
                          <div className={styles.inputRowCheck}>
                            <Checkbox
                              onChange={(e) => {
                                let newValues = { ...values };
                                // newValues.checksNoConformidades[indexInputs][indexSection].checked = e.target.checked
                                if (newValues.checksNoConformidades && newValues.checksNoConformidades[indexInputs] && newValues.checksNoConformidades[indexInputs][indexSection]) {
                                  newValues.checksNoConformidades[indexInputs][indexSection].checked = e.target.checked;
                                  newValues.checksNoConformidades[indexInputs][indexSection].name = value.label;
                                } else {
                                  // lo creo entonces
                                  newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                                  newValues.checksNoConformidades[indexInputs] = newValues.checksNoConformidades[indexInputs] || [];
                                  newValues.checksNoConformidades[indexInputs][indexSection] = newValues.checksNoConformidades[indexInputs][indexSection] || {};
                                  newValues.checksNoConformidades[indexInputs][indexSection].checked = e.target.checked;
                                  newValues.checksNoConformidades[indexInputs][indexSection].name = value.label;
                                }
                                setValues(newValues);
                              }}

                              // value={values?.checksNoConformidades?.[indexInputs]?.[indexSection]?.checked || false}
                              label={`${value.label}`}
                              key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[indexInputs]?.[indexSection]?.label : values?.checksNoConformidades?.[indexInputs]?.[indexSection]?.label)}
                              disabled={currentStatus === 'view'}
                              checked={values?.checksNoConformidades?.[indexInputs]?.[indexSection]?.checked}
                            />
                            <p className={styles.itemText}>{value.label}</p>
                          </div>
                            
                            <TextField
                              id={`sectionInput-${value.id}-${index}`}
                              name={`sectionInput-${value.id}-${index}`}
                              label={currentStatus !== 'view' && "Descripción de no conformidad"}
                              variant="outlined"
                              disabled={currentStatus === 'view'}
                              value={values?.checksNoConformidades?.[indexInputs]?.[indexSection]?.description }
                              onChange={(e) => {
                                let newValues = { ...values };
                                if (newValues.checksNoConformidades && newValues.checksNoConformidades[indexInputs] && newValues.checksNoConformidades[indexInputs][indexSection]) {
                                  newValues.checksNoConformidades[indexInputs][indexSection].description = e.target.value;
                                  newValues.checksNoConformidades[indexInputs][indexSection].name = value.label;
                                } else {
                                  // lo creo entonces
                                  newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                                  newValues.checksNoConformidades[indexInputs] = newValues.checksNoConformidades[indexInputs] || [];
                                  newValues.checksNoConformidades[indexInputs][indexSection] = newValues.checksNoConformidades[indexInputs][indexSection] || {};
                                  newValues.checksNoConformidades[indexInputs][indexSection].description = e.target.value;
                                  newValues.checksNoConformidades[indexInputs][indexSection].name = value.label;
                                }
                                // newValues.checksNoConformidades[indexInputs][indexSection].description = e.target.value

                                setValues(newValues);
                              }}
                              fullWidth
                              multiline
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
            </div>

            <br />
            <br />
            <div>
              <h2 className={styles.sectionTitle}>MEDIDAS TOMADAS</h2>
              <div>
                {Array(replicas)
                  .fill(0)
                  .map((_, index) => (
                    <div className={styles.sectionsContainer} key={index}>
                      {secondInputs.map((input, indexInputs) => (
                        <div className={styles.inputRow} key={input.id}>
                          <div className={styles.inputRowCheck}>
                            <Checkbox
                              label={`${input.label}`}
                              key={(currentStatus === 'view' ? infoPrecargada?.checksMedidas?.[indexInputs]?.name : values?.checksMedidas?.[indexInputs]?.name)}
                              checked={values?.checksMedidas?.[indexInputs]?.checked}
                              disabled={currentStatus === 'view'}
                              onChange={(e) => {
                                let newValues = { ...values };
                                if (newValues.checksMedidas && newValues.checksMedidas[indexInputs]) {
                                  newValues.checksMedidas[indexInputs].checked = e.target.checked;
                                  newValues.checksMedidas[indexInputs].name = secondInputs[indexInputs].label;
                                } else {
                                  // lo creo entonces
                                  newValues.checksMedidas = newValues.checksMedidas || [];
                                  newValues.checksMedidas[indexInputs] = newValues.checksMedidas[indexInputs] || {};
                                  newValues.checksMedidas[indexInputs].checked = e.target.checked;
                                  newValues.checksMedidas[indexInputs].name = secondInputs[indexInputs].label;
                                }
                              }}
                            />
                            <p className={styles.itemText}>{input.label}</p>
                          </div>
                          
                          <TextField
                            disabled={currentStatus === 'view'}
                            value={values?.checksMedidas?.[indexInputs]?.description}

                            onChange={(e) => {
                              let newValues = { ...values };
                              if (newValues.checksMedidas && newValues.checksMedidas[indexInputs]) {
                                newValues.checksMedidas[indexInputs].description = e.target.value;
                                newValues.checksMedidas[indexInputs].name = secondInputs[indexInputs].label;
                              } else {
                                // lo creo entonces
                                newValues.checksMedidas = newValues.checksMedidas || [];
                                newValues.checksMedidas[indexInputs] = newValues.checksMedidas[indexInputs] || {};
                                newValues.checksMedidas[indexInputs].description = e.target.value;
                                newValues.checksMedidas[indexInputs].name = secondInputs[indexInputs].label;
                              }
                              setValues(newValues);
                            }}

                            id={`sectionInput-${input.id}-${index}`}
                            name={`sectionInput-${input.id}-${index}`}
                            label={currentStatus !== 'view' && "Cantidad"}
                            variant="outlined"
                            multiline
                            fullWidth
                            rows={4}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          {
            (infoPrecargada === undefined) &&
                <div className='btn'>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                    >
                        Guardar
                    </Button>
                </div>
            }
            {
                (currentStatus === 'edit' ) &&
                <div className='btn'>
                    <Button
                        onClick={handleEdit}
                        variant='contained'
                    >
                        Editar
                    </Button>
                </div>
            }
        </div>
        <div></div>
      </div>
      {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
    </>

  );
}

export default ReporteDeRechazoDevolucionMaterias;
