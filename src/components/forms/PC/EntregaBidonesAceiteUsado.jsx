import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDropzone } from 'react-dropzone';
import { entregaBidones } from '../../../services/FormsRequest';
import Alert from '../../shared/components/Alert/Alert';
import { useLocation } from 'react-router';
import styles from './EntregaBidonesAceiteUsado.module.css';

function EntregaBidonesAceiteUsado() {
  const [replicas, setReplicas] = useState(1);
  const [replicaValues, setReplicaValues] = useState([{}]);
  const [trigger, setTrigger] = useState(false);

  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const idUser = localStorage.getItem('idUser');

  const inputs = [
    { id: 1, label: 'Fecha' },
    { id: 2, label: 'Cantidad de Litros entregados' },
    { id: 3, label: 'Responsable de Entrega' },
    { id: 4, label: 'Responsable de Retiro' },
    { id: 5, label: 'Certificado de Transporte' },
    { id: 6, label: 'Certificado de Disposición final' },
    { id: 7, label: 'Transporte' },
    { id: 8, label: 'Disposición final' },
 
  ];

  const areAllValuesFilled = (valuesObj) => {
    return Object.values(valuesObj).every((value) => value !== '');
  };

  useEffect(() => {
    if (replicas === 1 && areAllValuesFilled(replicaValues[0])) {
      // setValues({ ...values, inputs: [replicaValues[0]] });
    } else if (replicas > 1 && replicaValues.every(areAllValuesFilled)) {
      // setValues({ ...values, inputs: replicaValues });
    }
  }, [replicaValues, replicas]);

  const handleInputChange = (event, index, label) => {
    const { value } = event.target;
    const newReplicaValues = replicaValues.map((replicaValue, i) => {
      return i === index ? { ...replicaValue, [label.toLowerCase().replace(/\s/g, '')]: value, idUser: idUser } : replicaValue;
    });
    setReplicaValues(newReplicaValues);
  };

  const handleFileChange = (files, index, label) => {
    const file = files[0];
    const newReplicaValues = replicaValues.map((replicaValue, i) =>
      i === index
        ? { ...replicaValue, [label.toLowerCase().replace(/\s/g, '')]: file, idUser: idUser }
        : replicaValue
    );
    setReplicaValues(newReplicaValues);
  };

  const Dropzone = ({ onDrop, index, label }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
      <div {...getRootProps()} className={ styles.border }>
        <input {...getInputProps()} />
        <h6>Selecciona una foto de {label}</h6>
        {replicaValues[index][label.toLowerCase().replace(/\s/g, '')] && (
          <h6 className={styles.select}>Archivo seleccionado: {replicaValues[index][label.toLowerCase().replace(/\s/g, '')].name}</h6>
        )}
      </div>
    );
  };

  const handleClick = () => {
    setReplicas(replicas + 1);
    setReplicaValues([...replicaValues, {}]);
    setTrigger(false);
  };

  const handleSubmit = () => {
    entregaBidones(replicaValues)
      .then((resp) => {
        setTextAlert('¡Formulario cargado exitosamente!');
        setTypeAlert('success');
      })
      .catch((resp) => {
        setTextAlert('Ocurrió un error');
        setTypeAlert('error');
      })
      .finally(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
      });
  };

  const location = useLocation();
  const infoPrecargada = location.state?.objeto;
  useEffect(() => {
    if (infoPrecargada) {
      setReplicas(infoPrecargada.inputs.length);
      setReplicaValues(infoPrecargada.inputs);
    } else {
      setReplicas(1);
      setReplicaValues([{}]);
    }
  }, [location.state?.objeto]);

  return (
    <>
      <div>
        <div className="form">
          <div className="titleContainer">
            <h3 className="title">Circuito de Aceite Usado</h3>
          </div>
          <div className="table">
            <div className="tableSection">
              {Array(replicas)
                .fill(0)
                .map((_, index) => (
                  <div className="tableRow" key={index}>
                    <p className="index">{index + 1} </p>

                    {inputs.map((input) => (
                      <div key={input.id}>
                        {input.label === 'Fecha' ? (
                          <TextField
                            type="date"
                            onBlur={(e) => handleInputChange(e, index, input.label)}
                            id={`input-${input.id}-${index}`}
                            name={`input-${input.id}-${index}`}
                            value={replicaValues[index].fecha}
                            disabled={!!location.state?.objeto}
                          />
                        ) : input.label === 'Transporte' || input.label === 'Disposición final' ? (
                          <Dropzone
                            onDrop={(files) => handleFileChange(files, index, input.label)}
                            index={index}
                            label={input.label}
                          />
                        ) : (
                          <TextField
                            onBlur={(e) => handleInputChange(e, index, input.label)}
                            id={`input-${input.id}-${index}`}
                            name={`input-${input.id}-${index}`}
                            label={`${input.label}`}
                            value={replicaValues[index][input.label.toLowerCase().replace(/\s/g, '')]}
                            variant="outlined"
                            disabled={!!location.state?.objeto}
                          />
                        )}
                      </div>
                    ))}
                    {infoPrecargada ? <div></div> : <div className="icon">
                      <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                    </div>}
                  </div>
                ))}
            </div>
          </div>
          <div className="btn">
            <Button disabled={!!location.state?.objeto} onClick={handleSubmit} variant="contained">
              Guardar
            </Button>
          </div>
        </div>
      </div>
      {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
    </>
  );
}

export default EntregaBidonesAceiteUsado;



