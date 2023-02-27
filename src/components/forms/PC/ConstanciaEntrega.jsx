import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./ConstanciaEntrega.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Controller, useForm, control } from "react-hook-form";

function ConstanciaEntrega() {
  const [inputs] = useState([
    { id: 1, label: "Producto" },
    { id: 2, label: "Tipo/modelo" },
    { id: 3, label: "Marca" },
    { id: 4, label: "Posee certificacion" },
    { id: 5, label: "Cantidad" },
    { id: 6, label: "Fecha de entrega" },
    { id: 7, label: "Firma del trabajador" },
  ]);
  const [replicas, setReplicas] = useState(1);
  const [showTextField, setShowTextField] = useState(false);

  const handleClick = () => {
    setReplicas(replicas + 1);
  };

  const handleCheckboxChange = (event) => {
    setShowTextField(event.target.checked);
  };

  const { handleSubmit, reset, setValue, control } = useForm();
  const [data, setData] = useState(null);

  return (
    <div>
      <form
        className="form"
        onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
      >
        <div className="titleContainer">
          <h3 className="title">
            Constancia de Entrega de Ropa de Trabajo y de E.P.P
          </h3>
          <h4 className="formNumber"> HS-01-R01</h4>
        </div>
        <div className={styles.personal}>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                label="Apellido y nombre"
                variant="outlined"
              />
            )}
            name="Apellido y nombre"
            className="input"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                label="Contrato"
                variant="outlined"
              />
            )}
            name="Contrato"
            className="input"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                label="DNI"
                variant="outlined"
              />
            )}
            name="DNI"
            className="input"
            control={control}
          />
        </div>
        <div className={styles.personal}>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                label="Direccion"
                variant="outlined"
              />
            )}
            name="Direccion"
            className="input"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                label="Localidad"
                variant="outlined"
              />
            )}
            name="Localidad"
            className="input"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                label="CP"
                variant="outlined"
              />
            )}
            name="CP"
            className="input"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                label="Provincia"
                variant="outlined"
              />
            )}
            name="Provincia"
            className="input"
            control={control}
          />
        </div>
        <div className={styles.personalText}>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                label="Descripcion breve de las tareas a realizar"
                variant="outlined"
              />
            )}
            name="Descripcion breve de las tareas a realizar"
            className="input"
            control={control}
          />
        </div>
        <div className={styles.personal}>
          <Controller
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="Ropa de trabajo"
              />
            )}
            name="Ropa de trabajo"
            className="input"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="Guantes"
              />
            )}
            name="Guantes"
            className="input"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="Calzado de seguridad"
              />
            )}
            name="Calzado de seguridad"
            className="input"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="Antiparras"
              />
            )}
            name="Antiparras"
            className="input"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="Mascara"
              />
            )}
            name="Mascara"
            className="input"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="Cofia"
              />
            )}
            name="Cofia"
            className="input"
            control={control}
          />
          <div>
            <Controller
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      id="showTextField"
                      name="showTextField"
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Otros"
                />
              )}
              name="Otros"
              className="input"
              control={control}
            />

            <label htmlFor="showTextField"></label>
          </div>
        </div>

        <div className={styles.personal}>
          {showTextField && (
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="outlined-basic"
                  label="Otros"
                  variant="outlined"
                />
              )}
              name="Otros"
              className="input"
              control={control}
            />
          )}
        </div>
        <div className="tableSection">
          {Array(replicas)
            .fill(0)
            .map((_, index) => (
              <div className="tableRow" key={index}>
                <p className="index">{index + 1} </p>

                {inputs.map((input) => (
                  <div key={input.id}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id={`${input.id}-${index}`}
                          label={`${input.label}`}
                          variant="outlined"
                        />
                      )}
                      name={`${input.label}`}
                      className="input"
                      control={control}
                    />
                  </div>
                ))}
                <div className="icon">
                  <AddBoxIcon style={{ color: "grey" }} onClick={handleClick} />
                </div>
              </div>
            ))}
        </div>
        <div className={styles.personal}>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id={"Información Adicional"}
                name={"Información Adicional"}
                label={"Información Adicional"}
                variant="outlined"
              />
            )}
            name="Información Adicional"
            className="input"
            control={control}
          />
        </div>
        <div className="btn">
          <Button variant="contained" type="submit">
            Generar PDF
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ConstanciaEntrega;
