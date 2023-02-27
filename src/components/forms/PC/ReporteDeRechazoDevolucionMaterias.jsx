import { Button, TextField, Checkbox } from "@mui/material";
import React, { useState } from "react";
import styles from "./ReporteDeRechazoDevolucionMaterias.module.css";
import Modal from '../../shared/Modal';
import RechazoInfo from "../../modales/RechazoInfo";

function ReporteDeRechazoDevolucionMaterias() {
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


  return (
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
            <TextField id="outlined-basic" label="DÍA" variant="outlined" />
            <TextField
              id="outlined-basic"
              label="PROVEEDOR"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="PRODUCTO"
              variant="outlined"
            />
            <TextField
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
                            label={`${value.label}`}
                            key={value.label}
                          />
                          <p className={styles.itemText}>{value.label}</p>
                          <TextField
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
                        <Checkbox label={`${input.label}`} key={input.label} />
                        <p>{input.label}</p>
                        <TextField
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
            id="outlined-basic"
            label="Nombre Administrador/Encargado"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Nombre Proveedor"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="btn">
          <Button variant="contained">Generar PDF</Button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ReporteDeRechazoDevolucionMaterias;
