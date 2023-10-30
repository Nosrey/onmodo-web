import { Button, TextField, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./ReporteDeRechazoDevolucionMaterias.module.css";
import Modal from '../../shared/Modal';
import RechazoInfo from "../../modales/RechazoInfo";
import Alert from "../../shared/components/Alert/Alert";
import { reporteRechazo } from "../../../services/FormsRequest";
import { useLocation } from "react-router-dom";

function ReporteDeRechazoDevolucionMaterias() {
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
  const [values,setValues] = useState({
    dia:"",
    proveedor:"",
    producto:"",
    nroLote:"",
    condicionesEntrega : [{
    }],
    calidad : [{
    }],
    diferencias : [{
    }],
    transporte : [{
    }],
    medidasTomadas : [{
    }],
    nombreAdministrador: "",
    nombreProveedor:"",
    date: "",
    idUser: idUser
})
const [condicionesValues,setCondicionesValues] = useState([
  {adelantadoCheck:false,adelantadoDescription:""},
  {atrasadoCheck:false,atrasadoDescription:""}])

const [calidadValues,setCalidadValues] = useState([
  {temperaturaCheck:false,temperaturaDescription:""},
  {vidaUtilCheck:false,vidaUtilDescription:""},
  {embalajeCheck:false,embalajeDescription:""},
  {rotuloCheck:false,rotuloDescription:""},
  {calibreCheck:false,calibreDescription:""},
  {colorCheck:false,colorDescription:""},
  {signosCheck:false,signosDescription:""},
  {consistenciaCheck:false,consistenciaDescription:""},
  {olorCheck:false,olorDescription:""}])

const [diferenciasValues,setDiferenciasValues] = useState([
  {precioCheck:false,precioDescription:""},
  {cantidadCheck:false,cantidadDescription:""}])

const [transporteValues,setTransporteValues] = useState([
  {temperaturaCheck:false,temperaturaDescription:""},
  {uniformeCheck:false,uniformeDescription:""},
  {predisposicionCheck:false,predisposicionDescription:""},
  {vehiculoCheck:false,vehiculoDescription:""},
  {otrasFaltasCheck:false,otrasFaltasDescription:""}])

const [medidasValues,setMedidasValues] = useState([
  {rechazoCheck:false,rechazoDescription:""},  
  {devolucionCheck:false,devolucionDescription:""},
  {aceptadoCheck:false,aceptadoDescription:""}])

  const inputsValuesConstructor = (category, index, value) => {
    const updatedValues = { ...values };
  
    if (category === 'condicionesEntrega') {
      updatedValues[category][index].adelantadoDescription = value;
    } else if (category === 'calidad') {
      updatedValues[category][index][`${value.label.toLowerCase()}Description`] = value;
    } else if (category === 'diferencias') {
      updatedValues[category][index][`${value.label.toLowerCase()}Description`] = value;
    } else if (category === 'transporte') {
      updatedValues[category][index][`${value.label.toLowerCase()}Description`] = value;
    } else if (category === 'medidasTomadas') {
      updatedValues[category][index][`${value.label.toLowerCase()}Description`] = value;
    }
  
    setValues(updatedValues);
  };
  
  const checkboxValuesConstructor = (category, index, value) => {
    const updatedValues = { ...values };
    
    if (category === 'condicionesEntrega') {
      updatedValues[category][index].adelantadoCheck = value;
    } else if (category === 'calidad') {
      updatedValues[category][index][`${value.label.toLowerCase()}Check`] = value;
    } else if (category === 'diferencias') {
      updatedValues[category][index][`${value.label.toLowerCase()}Check`] = value;
    } else if (category === 'transporte') {
      updatedValues[category][index][`${value.label.toLowerCase()}Check`] = value;
    } else if (category === 'medidasTomadas') {
      updatedValues[category][index][`${value.label.toLowerCase()}Check`] = value;
    }
  
    setValues(updatedValues);
  };

const handleSubmit = () => {
  console.log(values)
  // reporteRechazo(values).then((resp)=> {
  //     setTextAlert("¡Formulario cargado exitosamente!");
  //     setTypeAlert("success");
  // }).catch((resp)=> {
  //     setTextAlert("Ocurrió un error")
  //     setTypeAlert("error");
  // }).finally(()=> {
  //     window.scrollTo({
  //         top: 0,
  //         behavior: 'smooth',
  //       });
  //     setShowlert(true);
  //     setTimeout(() => {
  //         setShowlert(false);

  //     }, 7000);
  // }
  // )
};

const location = useLocation();
const infoPrecargada = location.state?.objeto;
useEffect(() => {
  console.log(infoPrecargada)
  if (infoPrecargada)  { // muestro un form del historial
      
setValues({
  dia:infoPrecargada.dia,
  proveedor:infoPrecargada.proveedor,
  producto:infoPrecargada.producto,
  nroLote:infoPrecargada.nroLote,
  condicionesEntrega : infoPrecargada.condicionesEntrega,
  calidad : infoPrecargada.calidad,
  diferencias : infoPrecargada.diferencias,
  transporte : infoPrecargada.transporte,
  medidasTomadas : infoPrecargada.medidasTomadas,
  nombreAdministrador: infoPrecargada.nombreAdministrador,
  nombreProveedor:infoPrecargada.nombreProveedor,
  date: infoPrecargada.date,
  idUser: idUser
})

      console.log("values", values)
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
        </div>
        { showModal ? (
                    <Modal
                    content={<RechazoInfo/>}
                    closeModal={() => setShowModal(false)}
                    />
                
                    )
                    : (
                    <div className='cont-btn'>
                        <Button  size="small" onClick={() => setShowModal(true)}>
                            <i class="ri-information-line" style={{marginRight: "8px", fontSize:"22px"}}></i> Ver Más
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
                value={values?.fecha || ''}
                disabled={!!location.state?.objeto} 
                onChange={(e) => { setValues({ ...values, dia: e.target.value }) }}

            />

            <TextField
              onChange = {(e)=>{
                setValues({...values,proveedor:e.target.value})
              }}
              id="outlined-basic"
              label="PROVEEDOR"
              variant="outlined"
              value={values?.proveedor || ''}
              disabled={!!location.state?.objeto} 
            />
            <TextField
              onChange = {(e)=>{
                setValues({...values,producto:e.target.value})
              }}
              id="outlined-basic"
              label="PRODUCTO"
              variant="outlined"
              value={values?.producto || ''}
              disabled={!!location.state?.objeto} 
            />
            <TextField
              onChange = {(e)=>{
                setValues({...values,nroLote:e.target.value})
              }}
              id="outlined-basic"
              label="NRO. LOTE"
              variant="outlined"
              value={values?.nroLote || ''}
              disabled={!!location.state?.objeto} 
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
                  {inputs.map((section) => (
                    <div >
                      <div className={styles.subtitleCont} key={section}>
                        <p className={styles.subtitle}>
                          {Object.keys(section)}
                        </p>
                      </div>
                      {section[Object.keys(section)].map((value) =>   (
                        <div className={styles.inputRow} key={value.id}>
                          <Checkbox
                            onChange={(e)=>{checkboxValuesConstructor(value.id,e.target.checked)}}
                            label={`${value.label}`}
                            key={value.label}
                          />
                          <p className={styles.itemText}>{value.label}</p>
                          <TextField
                            onKeyUp={(e)=>{
                              inputsValuesConstructor(value.id,e.target.value);
                              }}
                            id={`sectionInput-${value.id}-${index}`}
                            name={`sectionInput-${value.id}-${index}`}
                            label={"Descripción de no conformidad"}
                            variant="outlined"
                            value={values?.condicionesEntrega[index].adelantadoDescription || ''}
                            disabled={!!location.state?.objeto} 
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
                    {secondInputs.map((input) => (
                      <div className={styles.inputRow} key={input.id}>
                        <Checkbox onChange={(e)=>{checkboxValuesConstructor(input.id,e.target.checked)}} label={`${input.label}`} key={input.label} />
                        <p className={styles.itemText}>{input.label}</p>
                        <TextField
                        onKeyUp={(e)=>{
                          inputsValuesConstructor(input.id,e.target.value);
                          }}
                          id={`sectionInput-${input.id}-${index}`}
                          name={`sectionInput-${input.id}-${index}`}
                          label={"Cantidad"}
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
        <div className={styles.personal}>
          <TextField
            onChange = {(e)=>{
              setValues({...values,nombreAdministrador:e.target.value})
            }}
            id="outlined-basic"
            label="Firma Administrador/Encargado"
            variant="outlined"
            fullWidth
          />
          <TextField
            onChange = {(e)=>{
              setValues({...values,nombreProveedor:e.target.value})
            }}
            id="outlined-basic"
            label="Firma Proveedor"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="btn">
          <Button
           onClick={handleSubmit} 
           variant="contained">Guardar</Button>
        </div>
      </div>
      <div></div>
    </div>
    { showAlert && <Alert type={typeAlert} text={textAlert}></Alert> }
    </>

  );
}

export default ReporteDeRechazoDevolucionMaterias;
