import { Button, TextField, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./ReporteDeRechazoDevolucionMaterias.module.css";
import Modal from '../../shared/Modal';
import RechazoInfo from "../../modales/RechazoInfo";
import Alert from "../../shared/components/Alert/Alert";
import { editReporteRechazo, reporteRechazo, sendEditApplication } from "../../../services/FormsRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

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
          status: "",
        }
        sendEditApplication({ values: data, formId: infoPrecargada._id, form: '/reporterechazo' }).finally((resp) => {
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
        checksNoConformidades: [
          infoPrecargada.condicionesEntrega, infoPrecargada.calidad, infoPrecargada.diferencias, infoPrecargada.transporte,
        ],
        checksMedidas: infoPrecargada.medidasTomadas
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
            {(currentStatus === 'view' || currentStatus === 'edit') &&
              <span style={{ marginLeft: '20px', fontSize: '20px' }}>
                <i className={currentStatus === 'view' ? 'ri-eye-line' : 'ri-pencil-line'}></i>
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
              {/* {Array(replicas)
                .fill(0)
                .map((_, index) => (
                  <div className={styles.sectionsContainer} key={uuidv4()}>
                    {inputs.map((section, indexInputs) => (
                      <div key={uuidv4()}>
                        <div className={styles.subtitleCont} key={section}>
                          <p className={styles.subtitle}>
                            {Object.keys(section)}
                          </p>
                        </div>
                        {section[Object.keys(section)].map((value, indexSection) => (
                          <div className={styles.inputRow} key={uuidv4()}>
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
                              value={values?.checksNoConformidades?.[indexInputs]?.[indexSection]?.description}
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
                ))} */}


              {/* agrego cada uno manualmente iniciando por Atrasado */}

              <div className={styles.sectionsContainer}>
                <div>
                  <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>Condiciones de entrega</p>
                  </div>
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Atrasado"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[0]?.[0]?.label : values?.checksNoConformidades?.[0]?.[0]?.label)}
                        checked={values?.checksNoConformidades?.[0]?.[0]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[0] && newValues.checksNoConformidades[0][0]) {
                            newValues.checksNoConformidades[0][0].checked = e.target.checked;
                            newValues.checksNoConformidades[0][0].name = inputs[0]['Condiciones de entrega'][0].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[0] = newValues.checksNoConformidades[0] || [];
                            newValues.checksNoConformidades[0][0] = newValues.checksNoConformidades[0][0] || {};
                            newValues.checksNoConformidades[0][0].checked = e.target.checked;
                            newValues.checksNoConformidades[0][0].name = inputs[0]['Condiciones de entrega'][0].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Atrasado</p>
                    </div>

                    <TextField
                      id="sectionInput-1-0"
                      name="sectionInput-1-0"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[0]?.[0]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[0] && newValues.checksNoConformidades[0][0]) {
                          newValues.checksNoConformidades[0][0].description = e.target.value;
                          newValues.checksNoConformidades[0][0].name = inputs[0]['Condiciones de entrega'][0].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[0] = newValues.checksNoConformidades[0] || [];
                          newValues.checksNoConformidades[0][0] = newValues.checksNoConformidades[0][0] || {};
                          newValues.checksNoConformidades[0][0].description = e.target.value;
                          newValues.checksNoConformidades[0][0].name = inputs[0]['Condiciones de entrega'][0].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />



                  </div>

                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Adelantado"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[0]?.[1]?.label : values?.checksNoConformidades?.[0]?.[1]?.label)}
                        checked={values?.checksNoConformidades?.[0]?.[1]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[0] && newValues.checksNoConformidades[0][1]) {
                            newValues.checksNoConformidades[0][1].checked = e.target.checked;
                            newValues.checksNoConformidades[0][1].name = inputs[0]['Condiciones de entrega'][1].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[0] = newValues.checksNoConformidades[0] || [];
                            newValues.checksNoConformidades[0][1] = newValues.checksNoConformidades[0][1] || {};
                            newValues.checksNoConformidades[0][1].checked = e.target.checked;
                            newValues.checksNoConformidades[0][1].name = inputs[0]['Condiciones de entrega'][1].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Atrasado</p>
                    </div>

                    <TextField
                      id="sectionInput-1-1"
                      name="sectionInput-1-1"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[0]?.[1]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[0] && newValues.checksNoConformidades[0][1]) {
                          newValues.checksNoConformidades[0][1].description = e.target.value;
                          newValues.checksNoConformidades[0][1].name = inputs[0]['Condiciones de entrega'][1].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[0] = newValues.checksNoConformidades[0] || [];
                          newValues.checksNoConformidades[0][1] = newValues.checksNoConformidades[0][1] || {};
                          newValues.checksNoConformidades[0][1].description = e.target.value;
                          newValues.checksNoConformidades[0][1].name = inputs[0]['Condiciones de entrega'][1].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />

                  </div>
                </div>
              </div>

              {/* Calidad */}
              <div className={styles.sectionsContainer}>
                <div>
                  <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>Calidad</p>
                  </div>
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Temperatura"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[1]?.[0]?.label : values?.checksNoConformidades?.[1]?.[0]?.label)}
                        checked={values?.checksNoConformidades?.[1]?.[0]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][0]) {
                            newValues.checksNoConformidades[1][0].checked = e.target.checked;
                            newValues.checksNoConformidades[1][0].name = inputs[1]['Calidad'][0].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                            newValues.checksNoConformidades[1][0] = newValues.checksNoConformidades[1][0] || {};
                            newValues.checksNoConformidades[1][0].checked = e.target.checked;
                            newValues.checksNoConformidades[1][0].name = inputs[1]['Calidad'][0].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Temperatura</p>
                    </div>

                    <TextField
                      id="sectionInput-2-0"
                      name="sectionInput-2-0"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[1]?.[0]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][0]) {
                          newValues.checksNoConformidades[1][0].description = e.target.value;
                          newValues.checksNoConformidades[1][0].name = inputs[1]['Calidad'][0].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                          newValues.checksNoConformidades[1][0] = newValues.checksNoConformidades[1][0] || {};
                          newValues.checksNoConformidades[1][0].description = e.target.value;
                          newValues.checksNoConformidades[1][0].name = inputs[1]['Calidad'][0].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>

                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Vida útil"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[1]?.[1]?.label : values?.checksNoConformidades?.[1]?.[1]?.label)}
                        checked={values?.checksNoConformidades?.[1]?.[1]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][1]) {
                            newValues.checksNoConformidades[1][1].checked = e.target.checked;
                            newValues.checksNoConformidades[1][1].name = inputs[1]['Calidad'][1].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                            newValues.checksNoConformidades[1][1] = newValues.checksNoConformidades[1][1] || {};
                            newValues.checksNoConformidades[1][1].checked = e.target.checked;
                            newValues.checksNoConformidades[1][1].name = inputs[1]['Calidad'][1].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Vida útil</p>
                    </div>

                    <TextField
                      id="sectionInput-2-1"
                      name="sectionInput-2-1"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[1]?.[1]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][1]) {
                          newValues.checksNoConformidades[1][1].description = e.target.value;
                          newValues.checksNoConformidades[1][1].name = inputs[1]['Calidad'][1].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                          newValues.checksNoConformidades[1][1] = newValues.checksNoConformidades[1][1] || {};
                          newValues.checksNoConformidades[1][1].description = e.target.value;
                          newValues.checksNoConformidades[1][1].name = inputs[1]['Calidad'][1].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>

                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Embalaje"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[1]?.[2]?.label : values?.checksNoConformidades?.[1]?.[2]?.label)}
                        checked={values?.checksNoConformidades?.[1]?.[2]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][2]) {
                            newValues.checksNoConformidades[1][2].checked = e.target.checked;
                            newValues.checksNoConformidades[1][2].name = inputs[1]['Calidad'][2].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                            newValues.checksNoConformidades[1][2] = newValues.checksNoConformidades[1][2] || {};
                            newValues.checksNoConformidades[1][2].checked = e.target.checked;
                            newValues.checksNoConformidades[1][2].name = inputs[1]['Calidad'][2].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Embalaje</p>
                    </div>

                    <TextField
                      id="sectionInput-2-2"
                      name="sectionInput-2-2"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[1]?.[2]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][2]) {
                          newValues.checksNoConformidades[1][2].description = e.target.value;
                          newValues.checksNoConformidades[1][2].name = inputs[1]['Calidad'][2].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                          newValues.checksNoConformidades[1][2] = newValues.checksNoConformidades[1][2] || {};
                          newValues.checksNoConformidades[1][2].description = e.target.value;
                          newValues.checksNoConformidades[1][2].name = inputs[1]['Calidad'][2].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>

                  {/* ahora creamos Rótulo  */}
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Rótulo"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[1]?.[3]?.label : values?.checksNoConformidades?.[1]?.[3]?.label)}
                        checked={values?.checksNoConformidades?.[1]?.[3]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][3]) {
                            newValues.checksNoConformidades[1][3].checked = e.target.checked;
                            newValues.checksNoConformidades[1][3].name = inputs[1]['Calidad'][3].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                            newValues.checksNoConformidades[1][3] = newValues.checksNoConformidades[1][3] || {};
                            newValues.checksNoConformidades[1][3].checked = e.target.checked;
                            newValues.checksNoConformidades[1][3].name = inputs[1]['Calidad'][3].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Rótulo</p>
                    </div>

                    <TextField
                      id="sectionInput-2-3"
                      name="sectionInput-2-3"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[1]?.[3]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][3]) {
                          newValues.checksNoConformidades[1][3].description = e.target.value;
                          newValues.checksNoConformidades[1][3].name = inputs[1]['Calidad'][3].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                          newValues.checksNoConformidades[1][3] = newValues.checksNoConformidades[1][3] || {};
                          newValues.checksNoConformidades[1][3].description = e.target.value;
                          newValues.checksNoConformidades[1][3].name = inputs[1]['Calidad'][3].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>

                  {/* ahora creamos Calibre  */}
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Calibre"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[1]?.[4]?.label : values?.checksNoConformidades?.[1]?.[4]?.label)}
                        checked={values?.checksNoConformidades?.[1]?.[4]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][4]) {
                            newValues.checksNoConformidades[1][4].checked = e.target.checked;
                            newValues.checksNoConformidades[1][4].name = inputs[1]['Calidad'][4].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                            newValues.checksNoConformidades[1][4] = newValues.checksNoConformidades[1][4] || {};
                            newValues.checksNoConformidades[1][4].checked = e.target.checked;
                            newValues.checksNoConformidades[1][4].name = inputs[1]['Calidad'][4].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Calibre</p>
                    </div>

                    <TextField
                      id="sectionInput-2-4"
                      name="sectionInput-2-4"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[1]?.[4]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][4]) {
                          newValues.checksNoConformidades[1][4].description = e.target.value;
                          newValues.checksNoConformidades[1][4].name = inputs[1]['Calidad'][4].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                          newValues.checksNoConformidades[1][4] = newValues.checksNoConformidades[1][4] || {};
                          newValues.checksNoConformidades[1][4].description = e.target.value;
                          newValues.checksNoConformidades[1][4].name = inputs[1]['Calidad'][4].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>

                  {/* ahora creamos Color  */}
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Color"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[1]?.[5]?.label : values?.checksNoConformidades?.[1]?.[5]?.label)}
                        checked={values?.checksNoConformidades?.[1]?.[5]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][5]) {
                            newValues.checksNoConformidades[1][5].checked = e.target.checked;
                            newValues.checksNoConformidades[1][5].name = inputs[1]['Calidad'][5].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                            newValues.checksNoConformidades[1][5] = newValues.checksNoConformidades[1][5] || {};
                            newValues.checksNoConformidades[1][5].checked = e.target.checked;
                            newValues.checksNoConformidades[1][5].name = inputs[1]['Calidad'][5].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Color</p>
                    </div>

                    <TextField
                      id="sectionInput-2-5"
                      name="sectionInput-2-5"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[1]?.[5]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][5]) {
                          newValues.checksNoConformidades[1][5].description = e.target.value;
                          newValues.checksNoConformidades[1][5].name = inputs[1]['Calidad'][5].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                          newValues.checksNoConformidades[1][5] = newValues.checksNoConformidades[1][5] || {};
                          newValues.checksNoConformidades[1][5].description = e.target.value;
                          newValues.checksNoConformidades[1][5].name = inputs[1]['Calidad'][5].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>

                  {/* ahora creamos Signos de maduración  */}
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Signos de maduración"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[1]?.[6]?.label : values?.checksNoConformidades?.[1]?.[6]?.label)}
                        checked={values?.checksNoConformidades?.[1]?.[6]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][6]) {
                            newValues.checksNoConformidades[1][6].checked = e.target.checked;
                            newValues.checksNoConformidades[1][6].name = inputs[1]['Calidad'][6].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                            newValues.checksNoConformidades[1][6] = newValues.checksNoConformidades[1][6] || {};
                            newValues.checksNoConformidades[1][6].checked = e.target.checked;
                            newValues.checksNoConformidades[1][6].name = inputs[1]['Calidad'][6].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Signos de maduración</p>
                    </div>

                    <TextField
                      id="sectionInput-2-6"
                      name="sectionInput-2-6"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[1]?.[6]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][6]) {
                          newValues.checksNoConformidades[1][6].description = e.target.value;
                          newValues.checksNoConformidades[1][6].name = inputs[1]['Calidad'][6].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                          newValues.checksNoConformidades[1][6] = newValues.checksNoConformidades[1][6] || {};
                          newValues.checksNoConformidades[1][6].description = e.target.value;
                          newValues.checksNoConformidades[1][6].name = inputs[1]['Calidad'][6].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>

                  {/* ahora creamos Consistencia/Textura  */}
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Consistencia/Textura"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[1]?.[7]?.label : values?.checksNoConformidades?.[1]?.[7]?.label)}
                        checked={values?.checksNoConformidades?.[1]?.[7]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][7]) {
                            newValues.checksNoConformidades[1][7].checked = e.target.checked;
                            newValues.checksNoConformidades[1][7].name = inputs[1]['Calidad'][7].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                            newValues.checksNoConformidades[1][7] = newValues.checksNoConformidades[1][7] || {};
                            newValues.checksNoConformidades[1][7].checked = e.target.checked;
                            newValues.checksNoConformidades[1][7].name = inputs[1]['Calidad'][7].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Consistencia/Textura</p>
                    </div>

                    <TextField
                      id="sectionInput-2-7"
                      name="sectionInput-2-7"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[1]?.[7]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][7]) {
                          newValues.checksNoConformidades[1][7].description = e.target.value;
                          newValues.checksNoConformidades[1][7].name = inputs[1]['Calidad'][7].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                          newValues.checksNoConformidades[1][7] = newValues.checksNoConformidades[1][7] || {};
                          newValues.checksNoConformidades[1][7].description = e.target.value;
                          newValues.checksNoConformidades[1][7].name = inputs[1]['Calidad'][7].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>

                  {/* ahora creamos Olor  */}
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Olor"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[1]?.[8]?.label : values?.checksNoConformidades?.[1]?.[8]?.label)}
                        checked={values?.checksNoConformidades?.[1]?.[8]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][8]) {
                            newValues.checksNoConformidades[1][8].checked = e.target.checked;
                            newValues.checksNoConformidades[1][8].name = inputs[1]['Calidad'][8].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                            newValues.checksNoConformidades[1][8] = newValues.checksNoConformidades[1][8] || {};
                            newValues.checksNoConformidades[1][8].checked = e.target.checked;
                            newValues.checksNoConformidades[1][8].name = inputs[1]['Calidad'][8].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Olor</p>
                    </div>

                    <TextField
                      id="sectionInput-2-8"
                      name="sectionInput-2-8"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[1]?.[8]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[1] && newValues.checksNoConformidades[1][8]) {
                          newValues.checksNoConformidades[1][8].description = e.target.value;
                          newValues.checksNoConformidades[1][8].name = inputs[1]['Calidad'][8].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[1] = newValues.checksNoConformidades[1] || [];
                          newValues.checksNoConformidades[1][8] = newValues.checksNoConformidades[1][8] || {};
                          newValues.checksNoConformidades[1][8].description = e.target.value;
                          newValues.checksNoConformidades[1][8].name = inputs[1]['Calidad'][8].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>

                  {/* hasta aca van las filas */}
                </div>
              </div>

              {/* Diferencias */}
              <div className={styles.sectionsContainer}>
                <div>
                  <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>Diferencias</p>
                  </div>
                  {/* ahora Precio */}
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Precio"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[2]?.[0]?.label : values?.checksNoConformidades?.[2]?.[0]?.label)}
                        checked={values?.checksNoConformidades?.[2]?.[0]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[2] && newValues.checksNoConformidades[2][0]) {
                            newValues.checksNoConformidades[2][0].checked = e.target.checked;
                            newValues.checksNoConformidades[2][0].name = inputs[2]['Diferencias'][0].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[2] = newValues.checksNoConformidades[2] || [];
                            newValues.checksNoConformidades[2][0] = newValues.checksNoConformidades[2][0] || {};
                            newValues.checksNoConformidades[2][0].checked = e.target.checked;
                            newValues.checksNoConformidades[2][0].name = inputs[2]['Diferencias'][0].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Precio</p>
                    </div>

                    <TextField
                      id="sectionInput-3-0"
                      name="sectionInput-3-0"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[2]?.[0]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[2] && newValues.checksNoConformidades[2][0]) {
                          newValues.checksNoConformidades[2][0].description = e.target.value;
                          newValues.checksNoConformidades[2][0].name = inputs[2]['Diferencias'][0].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[2] = newValues.checksNoConformidades[2] || [];
                          newValues.checksNoConformidades[2][0] = newValues.checksNoConformidades[2][0] || {};
                          newValues.checksNoConformidades[2][0].description = e.target.value;
                          newValues.checksNoConformidades[2][0].name = inputs[2]['Diferencias'][0].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>


                  {/* ahora Cantidad */}
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Cantidad"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[2]?.[1]?.label : values?.checksNoConformidades?.[2]?.[1]?.label)}
                        checked={values?.checksNoConformidades?.[2]?.[1]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[2] && newValues.checksNoConformidades[2][1]) {
                            newValues.checksNoConformidades[2][1].checked = e.target.checked;
                            newValues.checksNoConformidades[2][1].name = inputs[2]['Diferencias'][1].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[2] = newValues.checksNoConformidades[2] || [];
                            newValues.checksNoConformidades[2][1] = newValues.checksNoConformidades[2][1] || {};
                            newValues.checksNoConformidades[2][1].checked = e.target.checked;
                            newValues.checksNoConformidades[2][1].name = inputs[2]['Diferencias'][1].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Cantidad</p>
                    </div>

                    <TextField
                      id="sectionInput-3-1"
                      name="sectionInput-3-1"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[2]?.[1]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[2] && newValues.checksNoConformidades[2][1]) {
                          newValues.checksNoConformidades[2][1].description = e.target.value;
                          newValues.checksNoConformidades[2][1].name = inputs[2]['Diferencias'][1].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[2] = newValues.checksNoConformidades[2] || [];
                          newValues.checksNoConformidades[2][1] = newValues.checksNoConformidades[2][1] || {};
                          newValues.checksNoConformidades[2][1].description = e.target.value;
                          newValues.checksNoConformidades[2][1].name = inputs[2]['Diferencias'][1].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>


                  {/* hasta aca van las filas */}
                </div>
              </div>

              {/* ahora Transporte */}
              <div className={styles.sectionsContainer}>
                <div>
                  <div className={styles.subtitleCont}>
                    <p className={styles.subtitle}>Transporte</p>
                  </div>

                  {/* ahora Temperatura de la caja */}
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Temperatura de la caja"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[3]?.[0]?.label : values?.checksNoConformidades?.[3]?.[0]?.label)}
                        checked={values?.checksNoConformidades?.[3]?.[0]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[3] && newValues.checksNoConformidades[3][0]) {
                            newValues.checksNoConformidades[3][0].checked = e.target.checked;
                            newValues.checksNoConformidades[3][0].name = inputs[3]['Transporte'][0].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[3] = newValues.checksNoConformidades[3] || [];
                            newValues.checksNoConformidades[3][0] = newValues.checksNoConformidades[3][0] || {};
                            newValues.checksNoConformidades[3][0].checked = e.target.checked;
                            newValues.checksNoConformidades[3][0].name = inputs[3]['Transporte'][0].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Temperatura de la caja</p>
                    </div>

                    <TextField
                      id="sectionInput-4-0"
                      name="sectionInput-4-0"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[3]?.[0]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[3] && newValues.checksNoConformidades[3][0]) {
                          newValues.checksNoConformidades[3][0].description = e.target.value;
                          newValues.checksNoConformidades[3][0].name = inputs[3]['Transporte'][0].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[3] = newValues.checksNoConformidades[3] || [];
                          newValues.checksNoConformidades[3][0] = newValues.checksNoConformidades[3][0] || {};
                          newValues.checksNoConformidades[3][0].description = e.target.value;
                          newValues.checksNoConformidades[3][0].name = inputs[3]['Transporte'][0].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />

                  </div>

                  {/* ahora Uniforme del proveedor */}

                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Uniforme del proveedor"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[3]?.[1]?.label : values?.checksNoConformidades?.[3]?.[1]?.label)}
                        checked={values?.checksNoConformidades?.[3]?.[1]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[3] && newValues.checksNoConformidades[3][1]) {
                            newValues.checksNoConformidades[3][1].checked = e.target.checked;
                            newValues.checksNoConformidades[3][1].name = inputs[3]['Transporte'][1].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[3] = newValues.checksNoConformidades[3] || [];
                            newValues.checksNoConformidades[3][1] = newValues.checksNoConformidades[3][1] || {};
                            newValues.checksNoConformidades[3][1].checked = e.target.checked;
                            newValues.checksNoConformidades[3][1].name = inputs[3]['Transporte'][1].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Uniforme del proveedor</p>
                    </div>

                    <TextField
                      id="sectionInput-4-1"
                      name="sectionInput-4-1"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[3]?.[1]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[3] && newValues.checksNoConformidades[3][1]) {
                          newValues.checksNoConformidades[3][1].description = e.target.value;
                          newValues.checksNoConformidades[3][1].name = inputs[3]['Transporte'][1].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[3] = newValues.checksNoConformidades[3] || [];
                          newValues.checksNoConformidades[3][1] = newValues.checksNoConformidades[3][1] || {};
                          newValues.checksNoConformidades[3][1].description = e.target.value;
                          newValues.checksNoConformidades[3][1].name = inputs[3]['Transporte'][1].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>

                  {/* ahora Predisposición /Conducta */}

                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Predisposición /Conducta"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[3]?.[2]?.label : values?.checksNoConformidades?.[3]?.[2]?.label)}
                        checked={values?.checksNoConformidades?.[3]?.[2]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[3] && newValues.checksNoConformidades[3][2]) {
                            newValues.checksNoConformidades[3][2].checked = e.target.checked;
                            newValues.checksNoConformidades[3][2].name = inputs[3]['Transporte'][2].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[3] = newValues.checksNoConformidades[3] || [];
                            newValues.checksNoConformidades[3][2] = newValues.checksNoConformidades[3][2] || {};
                            newValues.checksNoConformidades[3][2].checked = e.target.checked;
                            newValues.checksNoConformidades[3][2].name = inputs[3]['Transporte'][2].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Predisposición /Conducta</p>
                    </div>

                    <TextField
                      id="sectionInput-4-2"
                      name="sectionInput-4-2"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[3]?.[2]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[3] && newValues.checksNoConformidades[3][2]) {
                          newValues.checksNoConformidades[3][2].description = e.target.value;
                          newValues.checksNoConformidades[3][2].name = inputs[3]['Transporte'][2].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[3] = newValues.checksNoConformidades[3] || [];
                          newValues.checksNoConformidades[3][2] = newValues.checksNoConformidades[3][2] || {};
                          newValues.checksNoConformidades[3][2].description = e.target.value;
                          newValues.checksNoConformidades[3][2].name = inputs[3]['Transporte'][2].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>

                  {/* ahora Vehículo */}
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Vehículo"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[3]?.[3]?.label : values?.checksNoConformidades?.[3]?.[3]?.label)}
                        checked={values?.checksNoConformidades?.[3]?.[3]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[3] && newValues.checksNoConformidades[3][3]) {
                            newValues.checksNoConformidades[3][3].checked = e.target.checked;
                            newValues.checksNoConformidades[3][3].name = inputs[3]['Transporte'][3].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[3] = newValues.checksNoConformidades[3] || [];
                            newValues.checksNoConformidades[3][3] = newValues.checksNoConformidades[3][3] || {};
                            newValues.checksNoConformidades[3][3].checked = e.target.checked;
                            newValues.checksNoConformidades[3][3].name = inputs[3]['Transporte'][3].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Vehículo</p>
                    </div>

                    <TextField
                      id="sectionInput-4-3"
                      name="sectionInput-4-3"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[3]?.[3]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[3] && newValues.checksNoConformidades[3][3]) {
                          newValues.checksNoConformidades[3][3].description = e.target.value;
                          newValues.checksNoConformidades[3][3].name = inputs[3]['Transporte'][3].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[3] = newValues.checksNoConformidades[3] || [];
                          newValues.checksNoConformidades[3][3] = newValues.checksNoConformidades[3][3] || {};
                          newValues.checksNoConformidades[3][3].description = e.target.value;
                          newValues.checksNoConformidades[3][3].name = inputs[3]['Transporte'][3].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>

                  {/* ahora Otras Faltas */}
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Otras Faltas"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksNoConformidades?.[3]?.[4]?.label : values?.checksNoConformidades?.[3]?.[4]?.label)}
                        checked={values?.checksNoConformidades?.[3]?.[4]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksNoConformidades && newValues.checksNoConformidades[3] && newValues.checksNoConformidades[3][4]) {
                            newValues.checksNoConformidades[3][4].checked = e.target.checked;
                            newValues.checksNoConformidades[3][4].name = inputs[3]['Transporte'][4].label;
                          } else {
                            // lo creo entonces
                            newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                            newValues.checksNoConformidades[3] = newValues.checksNoConformidades[3] || [];
                            newValues.checksNoConformidades[3][4] = newValues.checksNoConformidades[3][4] || {};
                            newValues.checksNoConformidades[3][4].checked = e.target.checked;
                            newValues.checksNoConformidades[3][4].name = inputs[3]['Transporte'][4].label;
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Otras Faltas</p>
                    </div>

                    <TextField
                      id="sectionInput-4-4"
                      name="sectionInput-4-4"
                      label={currentStatus !== 'view' && "Descripción de no conformidad"}
                      variant="outlined"
                      disabled={currentStatus === 'view'}
                      value={values?.checksNoConformidades?.[3]?.[4]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksNoConformidades && newValues.checksNoConformidades[3] && newValues.checksNoConformidades[3][4]) {
                          newValues.checksNoConformidades[3][4].description = e.target.value;
                          newValues.checksNoConformidades[3][4].name = inputs[3]['Transporte'][4].label;
                        } else {
                          // lo creo entonces
                          newValues.checksNoConformidades = newValues.checksNoConformidades || [];
                          newValues.checksNoConformidades[3] = newValues.checksNoConformidades[3] || [];
                          newValues.checksNoConformidades[3][4] = newValues.checksNoConformidades[3][4] || {};
                          newValues.checksNoConformidades[3][4].description = e.target.value;
                          newValues.checksNoConformidades[3][4].name = inputs[3]['Transporte'][4].label;
                        }
                        setValues(newValues);
                      }
                      }
                      fullWidth
                      multiline
                    />
                  </div>
                </div>
              </div>



            </div>
            <br />
            <br />
            <div>
              <h2 className={styles.sectionTitle} onProgress={() => {
                console.log('values.checksMedidas: ', values?.checksMedidas)
              }}>MEDIDAS TOMADAS</h2>
              <div>
                {/* {Array(replicas)
                  .fill(0)
                  .map((_, index) => (
                    <div className={styles.sectionsContainer} key={uuidv4()}>
                      {secondInputs.map((input, indexInputs) => (
                        <div className={styles.inputRow} key={uuidv4()}>
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
                                setValues(newValues);
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
                  ))} */}

                {/* agrego cada uno manualmente iniciando por Rechazo (en el momento de la recepción) */}
                <div className={styles.sectionsContainer}>
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Rechazo (en el momento de la recepción)"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksMedidas?.[0]?.name : values?.checksMedidas?.[0]?.name)}
                        checked={values?.checksMedidas?.[0]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksMedidas && newValues.checksMedidas[0]) {
                            newValues.checksMedidas[0].checked = e.target.checked;
                            newValues.checksMedidas[0].name = 'Rechazo (en el momento de la recepción)';
                          } else {
                            // lo creo entonces
                            newValues.checksMedidas = newValues.checksMedidas || [];
                            newValues.checksMedidas[0] = newValues.checksMedidas[0] || {};
                            newValues.checksMedidas[0].checked = e.target.checked;
                            newValues.checksMedidas[0].name = 'Rechazo (en el momento de la recepción)';
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Rechazo (en el momento de la recepción)</p>
                    </div>

                    <TextField
                      disabled={currentStatus === 'view'}
                      value={values?.checksMedidas?.[0]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksMedidas && newValues.checksMedidas[0]) {
                          newValues.checksMedidas[0].description = e.target.value;
                          newValues.checksMedidas[0].name = 'Rechazo (en el momento de la recepción)';
                        } else {
                          // lo creo entonces
                          newValues.checksMedidas = newValues.checksMedidas || [];
                          newValues.checksMedidas[0] = newValues.checksMedidas[0] || {};
                          newValues.checksMedidas[0].description = e.target.value;
                          newValues.checksMedidas[0].name = 'Rechazo (en el momento de la recepción)';
                        }
                        setValues(newValues);
                      }}
                      id="sectionInput-5-0"
                      name="sectionInput-5-0"
                      label={currentStatus !== 'view' && "Descripción de la medida"}
                      variant="outlined"
                      multiline
                      fullWidth
                      rows={4}
                    />
                  </div>
                </div>

                {/* ahora Devolución (lotes ya ingresados) */}
                <div className={styles.sectionsContainer}>
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Devolución (lotes ya ingresados)"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksMedidas?.[1]?.name : values?.checksMedidas?.[1]?.name)}
                        checked={values?.checksMedidas?.[1]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksMedidas && newValues.checksMedidas[1]) {
                            newValues.checksMedidas[1].checked = e.target.checked;
                            newValues.checksMedidas[1].name = 'Devolución (lotes ya ingresados)';
                          } else {
                            // lo creo entonces
                            newValues.checksMedidas = newValues.checksMedidas || [];
                            newValues.checksMedidas[1] = newValues.checksMedidas[1] || {};
                            newValues.checksMedidas[1].checked = e.target.checked;
                            newValues.checksMedidas[1].name = 'Devolución (lotes ya ingresados)';
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Devolución (lotes ya ingresados)</p>
                    </div>

                    <TextField
                      disabled={currentStatus === 'view'}
                      value={values?.checksMedidas?.[1]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksMedidas && newValues.checksMedidas[1]) {
                          newValues.checksMedidas[1].description = e.target.value;
                          newValues.checksMedidas[1].name = 'Devolución (lotes ya ingresados)';
                        } else {
                          // lo creo entonces
                          newValues.checksMedidas = newValues.checksMedidas || [];
                          newValues.checksMedidas[1] = newValues.checksMedidas[1] || {};
                          newValues.checksMedidas[1].description = e.target.value;
                          newValues.checksMedidas[1].name = 'Devolución (lotes ya ingresados)';
                        }
                        setValues(newValues);
                      }}
                      id="sectionInput-5-1"
                      name="sectionInput-5-1"
                      label={currentStatus !== 'view' && "Descripción de la medida"}
                      variant="outlined"
                      multiline
                      fullWidth
                      rows={4}
                    />
                  </div>
                </div>

                {/* ahora con Aceptado condicional (ante cambios de calidad de mercadería, sin peligros de inocuidad) */}
                <div className={styles.sectionsContainer}>
                  <div className={styles.inputRow}>
                    <div className={styles.inputRowCheck}>
                      <Checkbox
                        label="Aceptado condicional (ante cambios de calidad de mercadería, sin peligros de inocuidad)"
                        key={(currentStatus === 'view' ? infoPrecargada?.checksMedidas?.[2]?.name : values?.checksMedidas?.[2]?.name)}
                        checked={values?.checksMedidas?.[2]?.checked}
                        disabled={currentStatus === 'view'}
                        onChange={(e) => {
                          let newValues = { ...values };
                          if (newValues.checksMedidas && newValues.checksMedidas[2]) {
                            newValues.checksMedidas[2].checked = e.target.checked;
                            newValues.checksMedidas[2].name = 'Aceptado condicional (ante cambios de calidad de mercadería, sin peligros de inocuidad)';
                          } else {
                            // lo creo entonces
                            newValues.checksMedidas = newValues.checksMedidas || [];
                            newValues.checksMedidas[2] = newValues.checksMedidas[2] || {};
                            newValues.checksMedidas[2].checked = e.target.checked;
                            newValues.checksMedidas[2].name = 'Aceptado condicional (ante cambios de calidad de mercadería, sin peligros de inocuidad)';
                          }
                          setValues(newValues);
                        }}
                      />
                      <p className={styles.itemText}>Aceptado condicional (ante cambios de calidad de mercadería, sin peligros de inocuidad)</p>
                    </div>

                    <TextField
                      disabled={currentStatus === 'view'}
                      value={values?.checksMedidas?.[2]?.description}
                      onChange={(e) => {
                        let newValues = { ...values };
                        if (newValues.checksMedidas && newValues.checksMedidas[2]) {
                          newValues.checksMedidas[2].description = e.target.value;
                          newValues.checksMedidas[2].name = 'Aceptado condicional (ante cambios de calidad de mercadería, sin peligros de inocuidad)';
                        } else {
                          // lo creo entonces
                          newValues.checksMedidas = newValues.checksMedidas || [];
                          newValues.checksMedidas[2] = newValues.checksMedidas[2] || {};
                          newValues.checksMedidas[2].description = e.target.value;
                          newValues.checksMedidas[2].name = 'Aceptado condicional (ante cambios de calidad de mercadería, sin peligros de inocuidad)';
                        }
                        setValues(newValues);
                      }}
                      id="sectionInput-5-2"
                      name="sectionInput-5-2"
                      label={currentStatus !== 'view' && "Descripción de la medida"}
                      variant="outlined"
                      multiline
                      fullWidth
                      rows={4}
                    />
                  </div>
                </div>



                {/* hasta aca van las filas */}
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
            (currentStatus === 'edit') &&
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
