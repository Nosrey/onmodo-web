import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styles from './ConstanciaEntrega.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckboxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useSelector } from 'react-redux';
import Alert from '../../shared/components/Alert/Alert';
import { entregaRopa } from '../../../services/FormsRequest';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';

function ConstanciaEntrega() {
    const location = useLocation();
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);

    const prueba = useSelector(state => state.constanciaEntregaR.inputsValues)

    const [inputs] = useState([
        { id: 1, label: 'Producto' },
        { id: 2, label: 'Tipo/modelo' },
        { id: 3, label: 'Marca' },
        { id: 4, label: 'Posee certificacion' },
        { id: 5, label: 'Cantidad' },
        { id: 6, label: 'Fecha de entrega' },
    ]);
    const [replicas, setReplicas] = useState(1);
    const [replicaValues, setReplicaValues] = useState([{ id: 0 }]);

    const [showTextField, setShowTextField] = useState(false);
    const [values, setValues] = useState({
        nombre: "",
        contrato: "",
        dni: "",
        direccion: "",
        localidad: "",
        cp: "",
        provincia: "",
        descripcion: "",
        infoAdicional: "",
        inputs: [{ "Producto": '', "Tipo / modelo": '', "Marca": '', "Posee certificacion": '', "Cantidad": '', "Fecha de entrega": '', id: 0 }],
        checkboxes: [],
        date: "",
        idUser: "643ea98d5b44dd9765966ae7"
    })
    const [objValues, setObjValues] = useState({ producto: "", tipo: "", marca: "", certificacion: "", cantidad: "", fecha: "", })
    const [inputValues, setInputValues] = useState([])
    const [check, setCheck] = useState([{
        check0: false,
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false
    }])
    const [checkValues, setCheckValues] = useState({
        check0: false,
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false
    })

    const [trigger, setTrigger] = useState(false)
    useEffect(() => {
        if (replicas === 1 && objValues.producto !== "" && objValues.tipo !== "" && objValues.marca !== "" && objValues.certificacion !== "" && objValues.cantidad !== "" && objValues.fecha !== "" && objValues.id !== "") {
            setInputValues([objValues])
        } else if (replicas > 1 && objValues.producto !== "" && objValues.tipo !== "" && objValues.marca !== "" && objValues.certificacion !== "" && objValues.cantidad !== "" && objValues.fecha !== "" && objValues.id !== "") {
            setInputValues([...inputValues, objValues])
        }
    }, [trigger])

    useEffect(() => {
        setValues({ ...values, inputs: inputValues, checkboxes: check })
    }, [inputValues, check])
    useEffect(() => {
        // replicaValues = [
        //     //         {
        //     //             "Tipo / modelo": "a",
        //     //             "Producto": "a",
        //     //             "Posee certificacion": "a",
        //     //             "Marca": "a",
        //     //             "Cantidad": "a"
        //     //         }
        //     //     ]
        if ((values?.nombre !== "" && values?.contrato !== "" && values?.dni !== "" && values?.direccion !== "" && values?.localidad !== "" && values?.cp !== "" && values?.provincia !== "" && values?.descripcion !== "")) {
            let confirmado = false
            for (let i = 0; i < replicaValues.length; i++) {
                if (replicaValues[i]?.["Tipo / modelo"]?.length && replicaValues[i]?.["Producto"]?.length && replicaValues[i]?.["Posee certificacion"]?.length && replicaValues[i]?.["Marca"]?.length && replicaValues[i]?.["Cantidad"]?.length && replicaValues[i]?.["fecha"]?.length) {
                    confirmado = true
                } else {
                    confirmado = false
                    break
                }
            }
            if (confirmado) {
                setTrigger(true)
            } else {
                setTrigger(false)
            }
        } else {
            setTrigger(false)
        }
    }, [values, replicaValues])

    useEffect(() => {
        setCheck([checkValues])
    }, [checkValues])

    const handleCheck = (n, v) => {
        setCheckValues({ ...checkValues, [n]: v })
        /* setCheck(check.pop()) */
    }

    const handleClick = (index) => {
       
        setReplicas(replicas + 1);
        const id = uuidv4();
        setReplicaValues([...replicaValues, { id: id }]);
        setTrigger(false);
    };


    const handleClickRemove = (index) => {
        let copyReplicas = replicaValues.filter(replica => replica.id !== index)
        setReplicaValues(copyReplicas);
        setReplicas(replicas - 1);
    }

    const handleCheckboxChange = (event) => {
        setShowTextField(event.target.checked);
    };

    const handleSubmit = () => {
        let objetoFinal = { ...values, inputs: replicaValues }

        entregaRopa(objetoFinal).then((resp) => {
            setTextAlert("¡Formulario cargado exitosamente!");
            setTypeAlert("success");
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

    return (
        <>
            <div>
                <div className="form">
                    <div className="titleContainer">
                        <h3 className="title">Constancia de Entrega de Ropa de Trabajo y de E.P.P</h3>
                    </div>
                    <div className={styles.personal}>
                        <TextField onChange={(e) => { setValues({ ...values, nombre: e.target.value }) }} id="outlined-basic" label="Apellido y nombre" variant="outlined" />
                        <TextField onChange={(e) => { setValues({ ...values, contrato: e.target.value }) }} id="outlined-basic" label="Contrato" variant="outlined" />
                        <TextField onChange={(e) => { setValues({ ...values, dni: e.target.value }) }} id="outlined-basic" label="DNI/Legajo" variant="outlined" />
                    </div>
                    <div className={styles.personal}>
                        <TextField onChange={(e) => { setValues({ ...values, direccion: e.target.value }) }} id="outlined-basic" label="Direccion" variant="outlined" />
                        <TextField onChange={(e) => { setValues({ ...values, localidad: e.target.value }) }} id="outlined-basic" label="Localidad" variant="outlined" />
                        <TextField onChange={(e) => { setValues({ ...values, cp: e.target.value }) }} id="outlined-basic" label="CP" variant="outlined" />
                        <TextField onChange={(e) => { setValues({ ...values, provincia: e.target.value }) }} id="outlined-basic" label="Provincia" variant="outlined" />
                    </div>
                    <div className={styles.personalText}>
                        <TextField onChange={(e) => { setValues({ ...values, descripcion: e.target.value }) }} fullWidth id="outlined-basic" label="Descripcion breve de las tareas a realizar" variant="outlined" />
                    </div>
                    <div className={styles.personal}>
                        <FormControlLabel control={<Checkbox checked={check[0].check0} onChange={(e) => { handleCheck("check0", e.target.checked) }} />} label="Ropa de trabajo" />
                        <FormControlLabel control={<Checkbox checked={check[0].check1} onChange={(e) => { handleCheck("check1", e.target.checked) }} />} label="Guantes" />
                        <FormControlLabel control={<Checkbox checked={check[0].check2} onChange={(e) => { handleCheck("check2", e.target.checked) }} />} label="Calzado de seguridad" />
                        <FormControlLabel control={<Checkbox checked={check[0].check3} onChange={(e) => { handleCheck("check3", e.target.checked) }} />} label="Antiparras" />
                        <FormControlLabel control={<Checkbox checked={check[0].check4} onChange={(e) => { handleCheck("check4", e.target.checked) }} />} label="Barbijo" />
                        <FormControlLabel control={<Checkbox checked={check[0].check5} onChange={(e) => { handleCheck("check5", e.target.checked) }} />} label="Cofia" />
                        <div>

                            <FormControlLabel control={<Checkbox
                                id="showTextField"
                                name="showTextField"
                                onChange={handleCheckboxChange} />} label="Otros" />
                            <label htmlFor="showTextField"></label>

                        </div>
                    </div>

                    <div className={styles.personal}>
                        {showTextField && (
                            <TextField id="outlined-basic" name="textField" variant="outlined" label="Otros" />
                        )}
                    </div>

                    {/* <div className="table">
                        <div className='tableSection'>
                            {Array(replicas)
                                .fill(0)
                                .map((_, index) => (
                                    <div className='tableRow' key={index}>
                                        <p className='index'>{index + 1} </p>

                                        {inputs.map((input) => (
                                            <div key={input.id}>
                                                {input.label === 'Fecha de entrega' ? (
                                                    <TextField
                                                        type='date'
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={(e) => {
                                                            let replicaCopy = [...replicaValues];
                                                            replicaCopy[index].fecha = e.target.value;
                                                            setReplicaValues(replicaCopy);
                                                        }}
                                                        value={replicaValues[index].fecha}
                                                        id={`input-${input.id}-${index}`}
                                                        name={`input-${input.id}-${index}`}
                                                        disabled={!!location.state?.objeto}
                                                    />
                                                ) : (
                                                    <TextField
                                                        id={`input-${input.id}-${index}`}
                                                        name={`input-${input.id}-${index}`}
                                                        label={`${input.label}`}
                                                        value={
                                                            replicaValues[index][input.label.toLowerCase().replace(/\s/g, '')]
                                                        }
                                                        onChange={(e) => {
                                                            let replicaCopy = [...replicaValues];
                                                            replicaCopy[index][
                                                                input.label.toLowerCase().replace(/\s/g, '')
                                                            ] = e.target.value;
                                                            setReplicaValues(replicaCopy);
                                                        }}
                                                        variant='outlined'
                                                        disabled={!!location.state?.objeto}
                                                        className='input'
                                                    />
                                                )}
                                            </div>
                                        ))}

                                        <div className="icon">
                                            {
                                                (index == 0 || index > Array(replicas).fill(0).length) ?
                                                    <AddBoxIcon style={{ color: 'grey' }} onClick={() => handleClick(index)} />
                                                    : <IndeterminateCheckboxIcon style={{ color: 'grey' }} onClick={() => handleClickRemove(index)} />
                                            }
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div> */}

                    <div className="table">
                        <div className='tableSection'>

                            {replicaValues.map((input, index) => {

                                return (
                                    <div className='tableRow' key={input.id}>
                                        <p className='index'>{index + 1} </p>

                                        <div key={input.id + 1}>
                                            <TextField
                                                id={`input-${input.id}-${index}`}
                                                name={`Producto`}
                                                label={`Producto`}
                                                value={
                                                    replicaValues[index]?.Producto
                                                }
                                                onChange={(e) => {
                                                    let replicaCopy = [...replicaValues];
                                                    replicaCopy[index] = { ...replicaCopy[index], Producto: e.target.value };
                                                    setReplicaValues(replicaCopy);
                                                }}
                                                variant='outlined'
                                                disabled={!!location.state?.objeto}
                                                className='input'
                                            />
                                        </div>

                                        <div key={input.id + 2}>
                                            <TextField
                                                id={`input-${input.id}-${index}`}
                                                name={`Tipo / modelo`}
                                                label={`Tipo / modelo`}
                                                value={
                                                    replicaValues[index]?.["Tipo / modelo"]
                                                }
                                                onChange={(e) => {
                                                    let replicaCopy = [...replicaValues];
                                                    replicaCopy[index] = { ...replicaCopy[index], "Tipo / modelo": e.target.value };
                                                    setReplicaValues(replicaCopy);
                                                }}
                                                variant='outlined'
                                                disabled={!!location.state?.objeto}
                                                className='input'
                                            />
                                        </div>

                                        <div key={input.id + 3}>
                                            <TextField
                                                id={`input-${input.id}-${index}`}
                                                name={`Posee certificacion`}
                                                label={`Posee certificacion`}
                                                value={
                                                    replicaValues[index]?.["Posee certificacion"]
                                                }
                                                onChange={(e) => {
                                                    let replicaCopy = [...replicaValues];
                                                    replicaCopy[index] = { ...replicaCopy[index], "Posee certificacion": e.target.value };
                                                    setReplicaValues(replicaCopy);
                                                }}
                                                variant='outlined'
                                                disabled={!!location.state?.objeto}
                                                className='input'
                                            />
                                        </div>

                                        <div key={input.id + 4}>
                                            <TextField
                                                id={`input-${input.id}-${index}`}
                                                name={`Marca`}
                                                label={`Marca`}
                                                value={
                                                    replicaValues[index]?.["Marca"]
                                                }
                                                onChange={(e) => {
                                                    let replicaCopy = [...replicaValues];
                                                    replicaCopy[index] = { ...replicaCopy[index], "Marca": e.target.value };
                                                    setReplicaValues(replicaCopy);
                                                }}
                                                variant='outlined'
                                                disabled={!!location.state?.objeto}
                                                className='input'
                                            />
                                        </div>

                                        <div key={input.id + 5}>
                                            <TextField
                                                id={`input-${input.id}-${index}`}
                                                name={`Cantidad`}
                                                label={`Cantidad`}
                                                value={
                                                    replicaValues[index]?.["Cantidad"]
                                                }
                                                onChange={(e) => {
                                                    let replicaCopy = [...replicaValues];
                                                    replicaCopy[index] = { ...replicaCopy[index], "Cantidad": e.target.value };
                                                    setReplicaValues(replicaCopy);
                                                }}
                                                variant='outlined'
                                                disabled={!!location.state?.objeto}
                                                className='input'
                                            />
                                        </div>

                                        <div key={input.id + 6}>
                                            <TextField
                                                type='date'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => {
                                                    let replicaCopy = [...replicaValues];
                                                    replicaCopy[index] = { ...replicaCopy[index], fecha: e.target.value };
                                                    setReplicaValues(replicaCopy);
                                                }}
                                                value={replicaValues[index]?.fecha}
                                                id={`input-${input.id}-${index}`}
                                                name={`input-${input.id}-${index}`}
                                                disabled={!!location.state?.objeto}
                                            />
                                        </div>


                                        <div className="icon">
                                            {
                                                (index == 0 || index > Array(replicas).fill(0).length) ?
                                                    <AddBoxIcon style={{ color: 'grey' }} onClick={() => handleClick(index)} />
                                                    : <IndeterminateCheckboxIcon style={{ color: 'grey' }} onClick={() => handleClickRemove(input.id)} />
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>

                    <div className={styles.personal}>
                        <TextField onChange={(e) => { setValues({ ...values, infoAdicional: e.target.value }) }} fullWidth id="outlined-basic" label="Informacion adicional" variant="outlined" />
                    </div>
                    <div className="btn">
                        {!trigger && <span>*Completar todos los campos para poder  Guardar</span>}

                        <Button onClick={handleSubmit}
                            disabled={!trigger}
                            variant="contained">Guardar</Button>

                    </div>

                </div>
            </div>
            {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
        </>

    )
}

export default ConstanciaEntrega