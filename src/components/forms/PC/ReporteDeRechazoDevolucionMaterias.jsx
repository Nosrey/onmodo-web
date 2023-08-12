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

const inputsValuesConstructor = (index,value) => {
    /* const inputTarget = document.getElementById(id) */
    if (index === 1) {
      condicionesValues[1].atrasadoDescription=value
      setValues({...values,condicionesEntrega:condicionesValues})
    }
    else if (index === 2) {
      condicionesValues[0].adelantadoDescription= value
      setValues({...values,condicionesEntrega:condicionesValues})
    }
    else if (index === 3) {
      calidadValues[0].temperaturaDescription = value
      setValues({...values,calidad:calidadValues})
    }
    else if (index === 4) {
      calidadValues[1].vidaUtilDescription = value
      setValues({...values,calidad:calidadValues})
    }
    else if (index === 5) {
      calidadValues[2].embalajeDescription = value
      setValues({...values,calidad:calidadValues})
    }
    else if (index === 6) {
      calidadValues[3].rotuloDescription = value
      setValues({...values,calidad:calidadValues})
    }
    else if (index === 7) {
      calidadValues[4].calibreDescription = value
      setValues({...values,calidad:calidadValues})
    }
    else if (index === 8) {
      calidadValues[5].colorDescription = value
      setValues({...values,calidad:calidadValues})
    }
    else if (index === 9) {
      calidadValues[6].signosDescription = value
      setValues({...values,calidad:calidadValues})
    }
    else if (index === 10) {
      calidadValues[7].consistenciaDescription = value
      setValues({...values,calidad:calidadValues})
    }
    else if (index === 11) {
      calidadValues[8].olorDescription = value
    }
    else if (index === 12) {
      diferenciasValues[0].precioDescription = value
      setValues({...values,diferencias:diferenciasValues})
    }
    else if (index === 13) {
      diferenciasValues[1].cantidadDescription = value
      setValues({...values,diferencias:diferenciasValues})
    }
    else if (index === 14) {
      transporteValues[0].temperaturaDescription = value
      setValues({...values,transporte:transporteValues})
    }
    else if (index === 15) {
      transporteValues[1].uniformeDescription = value
      setValues({...values,transporte:transporteValues})
    }
    else if (index === 16) {
      transporteValues[2].predisposicionDescription = value
      setValues({...values,transporte:transporteValues})
    }
    else if (index === 17) {
      transporteValues[3].vehiculoDescription = value
      setValues({...values,transporte:transporteValues})
    }
    else if (index === 18) {
      transporteValues[4].otrasFaltasDescription = value
      setValues({...values,transporte:transporteValues})
    }
    else if (index === 19) {
      medidasValues[0].rechazoDescription = value 
      setValues({...values,medidasTomadas:medidasValues})
    }else if (index === 20) {
      medidasValues[1].devolucionDescription = value
      setValues({...values,medidasTomadas:medidasValues})
    }
    else {
      medidasValues[2].aceptadoDescription = value 
      setValues({...values,medidasTomadas:medidasValues})
    }
    /* index === 1 ? setCondicionesValues([...condicionesValues])
    label === 'Fecha' ?  setObjValues({...objValues,fecha:inputTarget.value, id:index}) :
    label === 'Nombre Comensal' ? setObjValues({...objValues,nombre:inputTarget.value}) :
    label === 'Diagnóstico' ? setObjValues({...objValues,preparacion:inputTarget.value}):
    label === 'Listado de ingredientes' ? setObjValues({...objValues,listado:inputTarget.value}):
    label === 'Responsable' && setObjValues({...objValues,responsable:inputTarget.value}) */
}
const checkboxValuesConstructor = (index,value)=>{
  if (index === 1) {
    condicionesValues[1].atrasadoCheck=value
    setValues({...values,condicionesEntrega:condicionesValues})
  }
  else if (index === 2) {
    condicionesValues[0].adelantadoCheck= value
    setValues({...values,condicionesEntrega:condicionesValues})
  }
  else if (index === 3) {
    calidadValues[0].temperaturaCheck = value
    setValues({...values,calidad:calidadValues})
  }
  else if (index === 4) {
    calidadValues[1].vidaUtilCheck = value
    setValues({...values,calidad:calidadValues})
  }
  else if (index === 5) {
    calidadValues[2].embalajeCheck = value
    setValues({...values,calidad:calidadValues})
  }
  else if (index === 6) {
    calidadValues[3].rotuloCheck = value
    setValues({...values,calidad:calidadValues})
  }
  else if (index === 7) {
    calidadValues[4].calibreCheck = value
    setValues({...values,calidad:calidadValues})
  }
  else if (index === 8) {
    calidadValues[5].colorCheck = value
    setValues({...values,calidad:calidadValues})
  }
  else if (index === 9) {
    calidadValues[6].signosCheck = value
    setValues({...values,calidad:calidadValues})
  }
  else if (index === 10) {
    calidadValues[7].consistenciaCheck = value
    setValues({...values,calidad:calidadValues})
  }
  else if (index === 11) {
    calidadValues[8].olorCheck = value
  }
  else if (index === 12) {
    diferenciasValues[0].precioCheck = value
    setValues({...values,diferencias:diferenciasValues})
  }
  else if (index === 13) {
    diferenciasValues[1].cantidadCheck = value
    setValues({...values,diferencias:diferenciasValues})
  }
  else if (index === 14) {
    transporteValues[0].temperaturaCheck = value
    setValues({...values,transporte:transporteValues})
  }
  else if (index === 15) {
    transporteValues[1].uniformeCheck = value
    setValues({...values,transporte:transporteValues})
  }
  else if (index === 16) {
    transporteValues[2].predisposicionCheck = value
    setValues({...values,transporte:transporteValues})
  }
  else if (index === 17) {
    transporteValues[3].vehiculoCheck = value
    setValues({...values,transporte:transporteValues})
  }
  else if (index === 18) {
    transporteValues[3].otrasFaltasCheck = value
    setValues({...values,transporte:transporteValues})
  }
  else if (index === 19) {
    medidasValues[0].rechazoCheck = value 
    setValues({...values,medidasTomadas:medidasValues})
  }else if (index === 20) {
    medidasValues[1].devolucionCheck = value
    setValues({...values,medidasTomadas:medidasValues})
  }
  else {
    medidasValues[2].aceptadoCheck = value 
    setValues({...values,medidasTomadas:medidasValues})
  }
}

const handleSubmit = () => {
  reporteRechazo(values).then((resp)=> {
      setTextAlert("¡Formulario cargado exitosamente!");
      setTypeAlert("success");
  }).catch((resp)=> {
      setTextAlert("Ocurrió un error")
      setTypeAlert("error");
  }).finally(()=> {
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

const location = useLocation();
  useEffect(() => {
    const infoPrecargada = location.state?.objeto;
    console.log(infoPrecargada)
  }, [])
  
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
          <input
  onChange={(e) => { setValues({ ...values, dia: e.target.value }) }}
  type="date"
  id="fecha"
  name="fecha"
  required
/>

            <TextField
              onChange = {(e)=>{
                setValues({...values,proveedor:e.target.value})
              }}
              id="outlined-basic"
              label="PROVEEDOR"
              variant="outlined"
            />
            <TextField
              onChange = {(e)=>{
                setValues({...values,producto:e.target.value})
              }}
              id="outlined-basic"
              label="PRODUCTO"
              variant="outlined"
            />
            <TextField
              onChange = {(e)=>{
                setValues({...values,nroLote:e.target.value})
              }}
              id="outlined-basic"
              label="NRO. LOTE"
              variant="outlined"
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
                      {section[Object.keys(section)].map((value) => (
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
                        <p>{input.label}</p>
                        <TextField
                        onKeyUp={(e)=>{
                          inputsValuesConstructor(input.id,e.target.value);
                          }}
                          id={`sectionInput-${input.id}-${index}`}
                          name={`sectionInput-${input.id}-${index}`}
                          label={"Cant"}
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
            label="Nombre Administrador/Encargado"
            variant="outlined"
            fullWidth
          />
          <TextField
            onChange = {(e)=>{
              setValues({...values,nombreProveedor:e.target.value})
            }}
            id="outlined-basic"
            label="Nombre Proveedor"
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
