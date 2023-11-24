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
import { current } from '@reduxjs/toolkit';

function ConstanciaEntrega() {
    const location = useLocation();
  const infoPrecargada = location.state?.objeto;
  const currentStatus= location.state?.status; // ('view' o 'edit' segun si vengo del icono del ojito o  de editar)
    //** ALERTA */
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);

    const prueba = useSelector(state => state.constanciaEntregaR.inputsValues)
    var idUser = localStorage.getItem("idUser");

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
        idUser: idUser
    })
    const [objValues, setObjValues] = useState({ producto: "", tipo: "", marca: "", certificacion: "", cantidad: "", fecha: "", })
    const [inputValues, setInputValues] = useState([])
    const [check, setCheck] = useState([{
        check0: false,
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        check6: false
    }])
    const [checkValues, setCheckValues] = useState({
        check0: false,
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        check6: false
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
        let checkboxes = values?.checkboxes

        if (checkboxes.length) {
            checkboxes[0] = { ...checkboxes[0], textInputCheck6: values.otrosCheck6 }
        } else {
            checkboxes = []
        }
            
        
        let objetoFinal = { ...values, inputs: replicaValues, checkboxes: checkboxes }

        entregaRopa(objetoFinal).then((resp) => {
            if (resp.error) {
                setTextAlert('Ocurrió un error');
                setTypeAlert('error');
              } else {
                setTextAlert('¡Formulario cargado exitosamente!');
                setTypeAlert('success');
                 // limpiar fomr
              window.location.href = window.location.href;
              }
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
                        <TextField
                            onChange={(e) => { setValues({ ...values, nombreUsuario: e.target.value }) }}
                            id="outlined-basic"
                            label="Apellido y nombre"
                            variant="outlined"
                            value={(currentStatus === 'view' && infoPrecargada?.nombreUsuario) ? infoPrecargada?.nombreUsuario : values?.nombreUsuario}
                            disabled={currentStatus === 'view'}
                        />

                        <TextField 
                        onChange={(e) => { setValues({ ...values, contrato: e.target.value }) }} 
                        id="outlined-basic" 
                        label="Contrato" 
                        variant="outlined" 
                        value={(currentStatus === 'view' && infoPrecargada?.contrato) ? infoPrecargada?.contrato : values?.contrato}
                        disabled={currentStatus === 'view'}
                        />

                        <TextField 
                        onChange={(e) => { setValues({ ...values, dni: e.target.value }) }} 
                        id="outlined-basic" 
                        label="DNI/Legajo" 
                        variant="outlined" 
                        value={(currentStatus === 'view' && infoPrecargada?.dni) ? infoPrecargada?.dni : values?.dni}
                        disabled={currentStatus === 'view'}
                        />
                    </div>
                    <div className={styles.personal}>
                        <TextField 
                        onChange={(e) => { setValues({ ...values, direccion: e.target.value }) }} 
                        id="outlined-basic" 
                        label="Direccion" 
                        variant="outlined" 
                        value={(currentStatus === 'view' && infoPrecargada?.direccion) ? infoPrecargada?.direccion : values?.direccion}
                        disabled={currentStatus === 'view'}
                        />

                        <TextField 
                        onChange={(e) => { setValues({ ...values, localidad: e.target.value }) }} 
                        id="outlined-basic" 
                        label="Localidad" 
                        variant="outlined" 
                        value={(currentStatus === 'view' && infoPrecargada?.localidad) ? infoPrecargada?.localidad : values?.localidad}
                        disabled={currentStatus === 'view'}
                        />

                        <TextField 
                        onChange={(e) => { setValues({ ...values, cp: e.target.value }) }} 
                        id="outlined-basic" 
                        label="CP" 
                        variant="outlined" 
                        value={(currentStatus === 'view' && infoPrecargada?.cp) ? infoPrecargada?.cp : values?.cp}
                        disabled={currentStatus === 'view'}
                        />

                        <TextField 
                        onChange={(e) => { setValues({ ...values, provincia: e.target.value }) }} 
                        id="outlined-basic" 
                        label="Provincia" 
                        variant="outlined"
                        value={(currentStatus === 'view' && infoPrecargada?.provincia) ? infoPrecargada?.provincia : values?.provincia}
                        disabled={currentStatus === 'view'}
                        />
                    </div>

                    <div className={styles.personalText}>
                        <TextField 
                        onChange={(e) => { setValues({ ...values, descripcion: e.target.value }) }} 
                        fullWidth id="outlined-basic" 
                        label="Descripcion breve de las tareas a realizar" 
                        variant="outlined" 
                        value={(currentStatus === 'view' && infoPrecargada?.descripcion) ? infoPrecargada?.descripcion : values?.descripcion}
                        disabled={currentStatus === 'view'}
                        />
                    </div>

                    <div className={styles.personal}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={currentStatus === "view" ? infoPrecargada?.checkboxes[0].check0 : check[0].check0}
                                    onChange={(e) => { handleCheck("check0", e.target.checked) }}
                                    disabled={currentStatus === "view"}
                                />
                            }
                            label="Ropa de trabajo"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={currentStatus === "view" ? infoPrecargada?.checkboxes[0].check1 : check[0].check1}
                                    onChange={(e) => { handleCheck("check1", e.target.checked) }}
                                    disabled={currentStatus === "view"}
                                />
                            }
                            label="Guantes"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={currentStatus === "view" ? infoPrecargada?.checkboxes[0].check2 : check[0].check2}
                                    onChange={(e) => { handleCheck("check2", e.target.checked) }}
                                    disabled={currentStatus === "view"}
                                />
                            }
                            label="Calzado de seguridad"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={currentStatus === "view" ? infoPrecargada?.checkboxes[0].check3 : check[0].check3}
                                    onChange={(e) => { handleCheck("check3", e.target.checked) }}
                                    disabled={currentStatus === "view"}
                                />
                            }
                            label="Antiparras"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={currentStatus === "view" ? infoPrecargada?.checkboxes[0].check4 : check[0].check4}
                                    onChange={(e) => { handleCheck("check4", e.target.checked) }}
                                    disabled={currentStatus === "view"}
                                />
                            }
                            label="Barbijo"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={currentStatus === "view" ? infoPrecargada?.checkboxes[0].check5 : check[0].check5}
                                    onChange={(e) => { handleCheck("check5", e.target.checked) }}
                                    disabled={currentStatus === "view"}
                                />
                            }
                            label="Cofia"
                        />
                        <div>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={currentStatus === "view" ? infoPrecargada?.checkboxes[0].check6 : check[0].check6}
                                        onChange={(e) => { handleCheck("check6", e.target.checked) }}
                                        disabled={currentStatus === "view"}
                                    />
                                }
                                label="Otros"
                            />

                            <label htmlFor="showTextField"></label>

                        </div>
                    </div>

                    <div className={styles.personal}>
                        {(currentStatus === "view" ? infoPrecargada?.checkboxes[0].check6 : checkValues?.check6) && (
                            <TextField 
                            id="outlined-basic" 
                            name="textField" 
                            variant="outlined" 
                            label="Otros" 
                            value={currentStatus === "view" ? infoPrecargada?.checkboxes[0].textInputCheck6 : values?.otrosCheck6} 
                            onChange={(e) => {
                                setValues({ ...values, otrosCheck6: e.target.value })
                            }} 
                            disabled={currentStatus === "view"}
                            />
                            
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
                                                        disabled={currentStatus === 'view'}
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
                                                        disabled={currentStatus === 'view'}
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
                                                    (currentStatus === 'view' && infoPrecargada?.inputs[index]?.Producto) ? infoPrecargada?.inputs[index]?.Producto : replicaValues[index]?.["Producto"]
                                                }
                                                onChange={(e) => {
                                                    let replicaCopy = [...replicaValues];
                                                    replicaCopy[index] = { ...replicaCopy[index], Producto: e.target.value };
                                                    setReplicaValues(replicaCopy);
                                                }}
                                                variant='outlined'
                                                disabled={currentStatus === 'view'}
                                                className='input'
                                            />
                                        </div>

                                        <div key={input.id + 2}>
                                            <TextField
                                                id={`input-${input.id}-${index}`}
                                                name={`Tipo / modelo`}
                                                label={`Tipo / modelo`}
                                                value={
                                                    (currentStatus === 'view' && infoPrecargada?.inputs[index]?.["Tipo / modelo"]) ? infoPrecargada?.inputs[index]?.["Tipo / modelo"] : replicaValues[index]?.["Tipo / modelo"]
                                                }
                                                onChange={(e) => {
                                                    let replicaCopy = [...replicaValues];
                                                    replicaCopy[index] = { ...replicaCopy[index], "Tipo / modelo": e.target.value };
                                                    setReplicaValues(replicaCopy);
                                                }}
                                                variant='outlined'
                                                disabled={currentStatus === 'view'}
                                                className='input'
                                            />
                                        </div>

                                        <div key={input.id + 3}>
                                            <TextField
                                                id={`input-${input.id}-${index}`}
                                                name={`Posee certificacion`}
                                                label={`Posee certificacion`}
                                                value={
                                                    (currentStatus === 'view' && infoPrecargada?.inputs[index]?.["Posee certificacion"]) ? infoPrecargada?.inputs[index]?.["Posee certificacion"] : replicaValues[index]?.["Posee certificacion"]
                                                }
                                                onChange={(e) => {
                                                    let replicaCopy = [...replicaValues];
                                                    replicaCopy[index] = { ...replicaCopy[index], "Posee certificacion": e.target.value };
                                                    setReplicaValues(replicaCopy);
                                                }}
                                                variant='outlined'
                                                disabled={currentStatus === 'view'}
                                                className='input'
                                            />
                                        </div>

                                        <div key={input.id + 4}>
                                            <TextField
                                                id={`input-${input.id}-${index}`}
                                                name={`Marca`}
                                                label={`Marca`}
                                                value={
                                                    (currentStatus === 'view' && infoPrecargada?.inputs[index]?.Marca) ? infoPrecargada?.inputs[index]?.Marca : replicaValues[index]?.["Marca"]
                                                }
                                                onChange={(e) => {
                                                    let replicaCopy = [...replicaValues];
                                                    replicaCopy[index] = { ...replicaCopy[index], "Marca": e.target.value };
                                                    setReplicaValues(replicaCopy);
                                                }}
                                                variant='outlined'
                                                disabled={currentStatus === 'view'}
                                                className='input'
                                            />
                                        </div>

                                        <div key={input.id + 5}>
                                            <TextField
                                                id={`input-${input.id}-${index}`}
                                                name={`Cantidad`}
                                                label={`Cantidad`}
                                                value={
                                                    (currentStatus === 'view' && infoPrecargada?.inputs[index]?.Cantidad) ? infoPrecargada?.inputs[index]?.Cantidad : replicaValues[index]?.["Cantidad"]
                                                }
                                                onChange={(e) => {
                                                    let replicaCopy = [...replicaValues];
                                                    replicaCopy[index] = { ...replicaCopy[index], "Cantidad": e.target.value };
                                                    setReplicaValues(replicaCopy);
                                                }}
                                                variant='outlined'
                                                disabled={currentStatus === 'view'}
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
                                                value={
                                                    (currentStatus === 'view' && infoPrecargada?.inputs[index]?.fecha) ? infoPrecargada?.inputs[index]?.fecha : replicaValues[index]?.["fecha"]
                                                }
                                                id={`input-${input.id}-${index}`}
                                                name={`input-${input.id}-${index}`}
                                                disabled={currentStatus === 'view'}
                                            />
                                        </div>


                                        {currentStatus !== 'view' && (
                                            <div className="icon">
                                                {index == 0 || index > Array(replicas).fill(0).length ? (
                                                    <AddBoxIcon style={{ color: 'grey' }} onClick={() => handleClick(index)} />
                                                ) : (
                                                    <IndeterminateCheckboxIcon style={{ color: 'grey' }} onClick={() => handleClickRemove(input.id)} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>

                    <div className={styles.personal}>
                        <TextField onChange={(e) => { setValues({ ...values, infoAdicional: e.target.value }) }} fullWidth id="outlined-basic" label="Informacion adicional" variant="outlined"
                        value={(currentStatus === "view" && infoPrecargada?.infoAdicional ? infoPrecargada?.infoAdicional : values?.infoAdicional)}
                        disabled={currentStatus === 'view'}
                        />
                    </div>

                    {
                        (currentStatus === 'edit' || infoPrecargada === undefined) &&
                        <div className='btn'>
                            <Button
                            onClick={handleSubmit}
                            variant='contained'
                            >
                            Guardar
                            </Button>
                        </div>
                        }

                </div>
            </div>
            {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
        </>

    )
}

export default ConstanciaEntrega