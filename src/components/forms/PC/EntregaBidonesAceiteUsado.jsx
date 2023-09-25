import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';
import { entregaBidones } from '../../../services/FormsRequest';
import Alert from '../../shared/components/Alert/Alert';
import { useLocation } from 'react-router';

function EntregaBidonesAceiteUsado({ idUser }) {
    const [inputs] = useState([
        { id: 1, label: 'Fecha' },
        { id: 2, label: 'Litros entregados' },
        { id: 3, label: 'Responsable de Entrega' },
        { id: 4, label: 'Responsable de Retiro' },
        { id: 5, label: 'Certif. de Transporte' },
        { id: 6, label: 'Certif. de Disposición final' },
    ]);

    var idUser = localStorage.getItem("idUser");

    const [replicas, setReplicas] = useState(1);
    const [values, setValues] = useState();
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
        console.log("replicaValues", replicaValues);
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
    
    const location = useLocation();
    const infoPrecargada = location.state?.objeto;
    useEffect( () => {
        if (infoPrecargada) { // muestro un form del historial
            console.log("infoPrecargada", infoPrecargada);
            setReplicas(infoPrecargada.inputs.length);
            setReplicaValues(infoPrecargada.inputs);
            console.log("replicaValues", replicaValues);
        } else { // creo un form desde cero
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

                                                label={input.label}
                                                variant="outlined"
                                                type="date"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                 value= {replicaValues[index].fecha}
                                                    disabled={!!location.state?.objeto}
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
                                                    value= {replicaValues[index][input.label.toLowerCase().replace(/\s/g, "")]}
                                                    variant="outlined"
                                                    disabled={!!location.state?.objeto}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    {infoPrecargada ? <div></div> : <div className="icon">
                                        <AddBoxIcon  style={{ color: 'grey' }} onClick={handleClick} />
                                    </div>}
                                </div>
                            ))}
                    </div>
                </div>
                <div className="btn">
                    <Button disabled={!!location.state?.objeto} onClick={handleSubmit} variant="contained">Guardar</Button>
                </div>
            </div>
        </div>
        { showAlert && <Alert type={typeAlert} text={textAlert}></Alert> }
        </>
    );
}

export default EntregaBidonesAceiteUsado;