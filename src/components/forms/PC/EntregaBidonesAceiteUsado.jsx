import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';
import { entregaBidones } from '../../../services/FormsRequest';
import Alert from '../../shared/components/Alert/Alert';

function EntregaBidonesAceiteUsado({ idUser }) {
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Cantidad de Litros entregados' },
        { id: 3, label: 'Responsable de Entrega' },
        { id: 4, label: 'Responsable de Retiro' },
        { id: 5, label: 'Certificado de Transporte' },
        { id: 6, label: 'Certificado de Disposición final' },
    ]);

    var idUser = localStorage.getItem("idUser");

    const [replicas, setReplicas] = useState(1);
    const [values, setValues] = useState({
        inputs: [{}],
        idUser: idUser
    });
    const [replicaValues, setReplicaValues] = useState([{}]);
    const [trigger, setTrigger] = useState(false);

    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);

    useEffect(() => {
        if (replicas === 1 && areAllValuesFilled(replicaValues[0])) {
            setValues({ ...values, inputs: [replicaValues[0]] });
        } else if (replicas > 1 && replicaValues.every(areAllValuesFilled)) {
            setValues({ ...values, inputs: replicaValues });
        }
    }, [replicaValues, replicas]);

    const areAllValuesFilled = (valuesObj) => {
        return Object.values(valuesObj).every(value => value !== "");
    };

    const handleInputChange = (event, index, label) => {
        const { value } = event.target;
        const newReplicaValues = replicaValues.map((replicaValue, i) => {
            return i === index ? { ...replicaValue, [label.toLowerCase().replace(/\s/g, "")]: value, idUser: idUser } : replicaValue; // Include idUser in the updated object.
        });
        setReplicaValues(newReplicaValues);
    };

    const handleClick = () => {
        setReplicas(replicas + 1);
        setReplicaValues([...replicaValues, {}]);
        setTrigger(false);
    };

    const handleSubmit = () => {
        entregaBidones(values).then((resp)=> {
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
                                                <input
                                                    type="date"
                                                    onBlur={(e) => handleInputChange(e, index, input.label)}
                                                    id={`input-${input.id}-${index}`}
                                                    name={`input-${input.id}-${index}`}
                                                />
                                            ) : (
                                                <TextField
                                                    onBlur={(e) => handleInputChange(e, index, input.label)}
                                                    id={`input-${input.id}-${index}`}
                                                    name={`input-${input.id}-${index}`}
                                                    label={`${input.label}`}
                                                    variant="outlined"
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <div className="icon">
                                        <AddBoxIcon style={{ color: 'grey' }} onClick={handleClick} />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="btn">
                    <Button onClick={handleSubmit} variant="contained">Guardar</Button>
                </div>
            </div>
        </div>
        { showAlert && <Alert type={typeAlert} text={textAlert}></Alert> }
        </>
    );
}

export default EntregaBidonesAceiteUsado;