import { Button, TextField, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './FlashReporteIncidente.module.css';
import Alert from '../../shared/components/Alert/Alert';
import { flashIncidente } from '../../../services/FormsRequest';
import { useLocation } from 'react-router';

function FlashReporteIncidente() {
    const [textAlert, setTextAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [showAlert, setShowlert] = useState(false);
    const idUser = localStorage.getItem("idUser");
    const location = useLocation();
    const [values, setValues] = useState({
        fecha: "",
        hora: "",
        comedor: "",
        responsable: "",
        incidentePotencial: "",
        tipo: "",
        descripcion: "",
        fotografias: [],
        acciones: "",
        nombreAsesor: "",
        firmaAsesor: "",
        nombreSupervisor: "",
        firmaSupervisor: "",
        nombreGerente: "",
        firmaGerente: "",
        idUser: idUser,
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setPhotoFiles(acceptedFiles.slice(0, 5));
        },
    });

    const [photoFiles, setPhotoFiles] = useState([]);

    const handleSubmit = () => {
        flashIncidente(values)
            .then((resp) => {
                setTextAlert("¡Formulario cargado exitosamente!");
                setTypeAlert("success");
            })
            .catch((resp) => {
                setTextAlert("Ocurrió un error");
                setTypeAlert("error");
            })
            .finally(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
                setShowlert(true);
                setTimeout(() => {
                    setShowlert(false);
                }, 7000);
            });
    };

    useEffect(() => {
        const infoPrecargada = location.state?.objeto;
        if (infoPrecargada) {
            setValues({
                
                fecha: infoPrecargada.fecha,
                hora: infoPrecargada.hora,
                comedor: infoPrecargada.comedor,
                responsable: infoPrecargada.responsable,
                incidentePotencial: infoPrecargada.incidentePotencial,
                tipo: infoPrecargada.tipo,
                descripcion: infoPrecargada.descripcion,
                fotografias: infoPrecargada.fotografias || [],
                acciones: infoPrecargada.acciones,
                nombreAsesor: infoPrecargada.nombreAsesor,
                firmaAsesor: infoPrecargada.firmaAsesor,
                nombreSupervisor: infoPrecargada.nombreSupervisor,
                firmaSupervisor: infoPrecargada.firmaSupervisor,
                nombreGerente: infoPrecargada.nombreGerente,
                firmaGerente: infoPrecargada.firmaGerente,
                idUser: idUser,
            });
        } else {
            setValues({
                
                fecha: "",
                hora: "",
                comedor: "",
                responsable: "",
                incidentePotencial: "",
                tipo: "",
                descripcion: "",
                fotografias: [],
                acciones: "",
                nombreAsesor: "",
                firmaAsesor: "",
                nombreSupervisor: "",
                firmaSupervisor: "",
                nombreGerente: "",
                firmaGerente: "",
                idUser: idUser,
            });
        }
    }, []);

    return (
        <>
            {values && (
                <div>
                    <div className="form">
                        <div className="titleContainer">
                            <h3 className="title">Flash Reporte de Incidente</h3>
                        </div>

                        <div className={styles.personal}>
                            
                            <TextField
                                type="date"
                                onChange={(e) => { setValues({ ...values, fecha: e.target.value }) }}
                                value={values.fecha}
                                disabled={!!location.state?.objeto}
                            />
                            <TextField
                                type="time"
                                onChange={(e) => { setValues({ ...values, hora: e.target.value }) }}
                                value={values.hora}
                                disabled={!!location.state?.objeto}
                            />
                        </div>

                        <div className={styles.personal}>
                            <TextField
                                onChange={(e) => { setValues({ ...values, comedor: e.target.value }) }}
                                disabled={!!location.state?.objeto}
                                value={values.comedor}
                                id="outlined-basic"
                                label="Comedor"
                                variant="outlined"
                            />
                            <TextField
                                onChange={(e) => { setValues({ ...values, responsable: e.target.value }) }}
                                disabled={!!location.state?.objeto}
                                value={values.responsable}
                                id="outlined-basic"
                                label="Responsable del contrato"
                                variant="outlined"
                            />
                            <TextField
                                onChange={(e) => { setValues({ ...values, incidentePotencial: e.target.value }) }}
                                disabled={!!location.state?.objeto}
                                value={values.incidentePotencial}
                                id="outlined-basic"
                                label="Incidente Potencial/Real"
                                variant="outlined"
                            />
                        </div>


                        <div className={styles.personalText}>
                            <TextField
                                onChange={(e) => { setValues({ ...values, tipo: e.target.value }) }}
                                disabled={!!location.state?.objeto}
                                value={values.tipo}
                                fullWidth
                                id="outlined-basic"
                                label="Tipo de Incidente"
                                variant="outlined"
                            />
                        </div>

                        <div className={styles.personalText}>
                        <div className={styles.descripcion}>
                            <TextField
                                fullWidth
                                style={{width:"450px"}}
                                id="outlined-multiline-static"
                                label="Descripción del Incidente"
                                multiline
                                value={values.descripcion}
                                rows={4}
                                disabled={!!location.state?.objeto}
                                onChange={(e) => { setValues({ ...values, descripcion: e.target.value }) }}
                            />
                            <p className={styles.aclaracion}>*En esta área no se debe nombrar a la persona que tuvo el accidente, tampoco plantear causales.</p>
                         </div>
                            {/* Área de dropzone */}
                            <div className={styles.border}   {...getRootProps()}>
                                <input  {...getInputProps()} />
                                <h2 style={{fontSize:"18px", textAlign:"left", width:"100%", fontWeight:"bold"}}>Fotografias</h2>
                                <h6 style={{fontSize:"14px", textAlign:"left", width:"100%"}}>Arrastra y suelta las fotografias aquí o hace clic para seleccionar archivos.</h6>
                            
                                <div style={{display:"flex", width:"100%"}}>
                                    {/* Previsualización de imágenes */}
                                    {photoFiles.map((file, index) => (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Preview-${index}`}
                                            className={styles.previewImage}
                                        />
                                  
                                    ))}
                                </div>
                                
                            </div>

                            
                        </div>
       
                        <div className={styles.personalText}>
                    
                            <TextField
                                fullWidth
                                id="outlined-multiline-static"
                                label="Acciones Inmediatas"
                                value={values.acciones}
                                multiline
                                rows={4}
                                disabled={!!location.state?.objeto}
                                onChange={(e) => { setValues({ ...values, acciones: e.target.value }) }}
                            />
                        </div>

                        <div className={styles.responsableCont}>
                            <div className={styles.subtitleCont}>
                                <p className={styles.subtitle}>Responsable (Accountable)</p>
                            </div>
                            <p>Una vez guardada esta planilla ,  es necesario imprimirla desde la sección Formularios Cargados para ser firmada por el Asesor HSEQ, el Supervisor Directo y el Gerente de Área. Con todas las firmas listas, desde la misma sección de Formularios Cargados, edite esta planilla adjuntando en el siguiente campo el documento firmado. </p>
                            <TextField
                                    onChange={(e) => { setValues({ ...values, nombreAsesor: e.target.value }) }}
                                    disabled={!!location.state?.objeto}
                                    value={values.nombreAsesor}
                                    id="outlined-basic"
                                    label="Planilla Firmada"
                                    variant="outlined"
                                />
                        </div>

                        <div className="btn">
                            <Button onClick={handleSubmit} disabled={!!location.state?.objeto} variant="contained">
                                Guardar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
        </>
    );
}

export default FlashReporteIncidente;
