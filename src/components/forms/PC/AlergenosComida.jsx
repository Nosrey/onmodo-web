import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./AlergenosComida.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Controller, useForm, control } from "react-hook-form";

function AlergenosComida() {
  const [inputs] = useState([
    { id: 1, label: "Fecha" },
    { id: 2, label: "Nombre Comensal" },
    { id: 3, label: "Preparación" },
    { id: 4, label: "Listado de ingredientes" },
    { id: 5, label: "Responsable" },
  ]);
  const [replicas, setReplicas] = useState(1);

  const handleClick = () => {
    setReplicas(replicas + 1);
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
          <h3 className="title">Control de Alérgenos en las Comidas</h3>
          <h4 className="formNumber">Q/SOP-10-R02</h4>
        </div>
        <div className={styles.personal}>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                label="Comedor"
                variant="outlined"
              />
            )}
            name="Comedor"
            className="input"
            control={control}
          />
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
                          id={`${input.label}-${index}`}
                          name={`${input.label}-${index}`}
                          label={`${input.label}`}
                          variant="outlined"
                        />
                      )}
                      name={`${input.label}-${index}`}
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
                id={"Verificado por"}
                name={"Verificado por"}
                label={"Verificado por"}
                variant="outlined"
              />
            )}
            name={"Verificado por"}
            className="input"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                id={"Fecha"}
                name={"Fecha"}
                label={"Fecha"}
                variant="outlined"
              />
            )}
            name={"Fecha"}
            className="input"
            control={control}
          />
        </div>
        <div className="btn">
          <Button type="submit" variant="contained">
            Generar PDF
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AlergenosComida;
