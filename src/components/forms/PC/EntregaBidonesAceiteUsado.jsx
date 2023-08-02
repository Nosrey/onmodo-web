import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';

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

    const handleButtonClick = async () => {
        await axios.post(`http://localhost:4000/api/entregabidones`, values);
        console.log("Valor de idUser:", idUser);
        console.log("Values", values);
    };

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

    return (
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
                    <Button onClick={() => handleButtonClick()} variant="contained">Guardar</Button>
                </div>
            </div>
        </div>
    );
}

export default EntregaBidonesAceiteUsado;