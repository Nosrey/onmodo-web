import React, { useState } from 'react';
import styles from './RecordatoriosContainer.module.css';
import CreacionRecordatorio from './components/CreacionRecordatorio/CreacionRecordatorio';
import ListadoRecordatorios from './components/ListadoRecordatorios/ListadoRecordatorios';
import { useMedia } from '../../utils/hooks/UseMedia';
import { Button } from '@mui/material';
import Modal from '../../components/shared/Modal';

const DATA_RECORDATORIOS = [
    {
        titulo: "Limpieza de tanque de agua" ,
        descripcion: "Es neceario limpiar los tanques dos veces al año . Para esto es necesario utilizar los productos detallados en la documentación adjunta y los elementos de protección necesarios.",
        link:"https://www.google.com",
        linkTitle:"Manual paso a paso",
        frecuencia : "Semestral",
        fechaEspecifica: "",
        id: 1
    },
    {
        titulo: "Pintar las rejas" ,
        descripcion: "Es necesario pintar las rejas del edificio utilizando pintura sintética color negro. No olvidar icluir antioxidante.",
        link:"https://www.google.com",
        linkTitle:"Instructivo",
        frecuencia : "Fecha específica",
        fechaEspecifica: "29/10/23",
        id: 2
    },
    {
        titulo: "Llamar al banco" ,
        descripcion: "Llamar al banco para pedir el resumen de cuenta ",
        link:"https://www.google.com",
        linkTitle:"Documentación",
        frecuencia : "Mensual",
        fechaEspecifica: "",
        id: 3
    },
    
    
]
function RecordatoriosContainer() {
    const [dataReminders, setDataReminders] = useState(DATA_RECORDATORIOS);
    const media = useMedia();
    const [showModal, setShowModal] = useState(false);
    var nivelRol = localStorage.getItem('rol');
    const handleUpdateInfo = (item) => {
        setShowModal(false)
        const updatedData = [...dataReminders, item];
        setDataReminders(updatedData);
    }


  return (
    <>
    <h2 className={styles.tituloRecord}>Recordatorios</h2>        
        <div className={styles.containerBody}>
        {(nivelRol === "2" && media !== 'mobile') && <CreacionRecordatorio updateRecordatorios={(e)=>handleUpdateInfo(e)}/>}
        {(nivelRol === "2" && media === 'mobile') && 
           <div className="btn">
            <Button onClick={()=> setShowModal(true)} variant="contained">Crear Nuevo</Button>
            </div>
        }  
            <ListadoRecordatorios recordatorios={dataReminders}/>
        </div>

        {
            showModal &&
            <Modal
                content={<CreacionRecordatorio updateRecordatorios={(e)=>handleUpdateInfo(e)}/>}
                closeModal={() => setShowModal(false)}
                />
        }
    </>
  );
}

export default RecordatoriosContainer;
