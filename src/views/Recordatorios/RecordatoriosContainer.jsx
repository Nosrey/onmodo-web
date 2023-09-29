import React, { useState } from 'react';
import styles from './RecordatoriosContainer.module.css';
import CreacionRecordatorio from './components/CreacionRecordatorio/CreacionRecordatorio';
import ListadoRecordatorios from './components/ListadoRecordatorios/ListadoRecordatorios';

const DATA_RECORDATORIOS = [
    {
        titulo: "Limpieza de tanque de agua" ,
        descripcion: "Es neceario limpiar los tanques dos veces al año . Para esto es necesario utilizar los productos detallados en la documentación adjunta y los elementos de protección necesarios.",
        link:"https://www.google.com",
        linkTitle:"Manual paso a paso",
        frecuencia : "Semestral",
        fechaEspecífica: "",
        id: 1
    },
    {
        titulo: "Pintar las rejas" ,
        descripcion: "Es necesario pintar las rejas del edificio utilizando pintura sintética color negro. No olvidar icluir antioxidante.",
        link:"https://www.google.com",
        linkTitle:"Instructivo",
        frecuencia : "Fecha específica",
        fechaEspecífica: "",
        id: 2
    },
    {
        titulo: "Llamar al banco" ,
        descripcion: "Llamar al banco para pedir el resumen de cuenta ",
        link:"https://www.google.com",
        linkTitle:"Documentación",
        frecuencia : "Mensual",
        fechaEspecífica: "",
        id: 3
    },
    
    
]
function RecordatoriosContainer() {
    const [dataReminders, setDataReminders] = useState(DATA_RECORDATORIOS)

    const handleUpdateInfo = (item) => {
        const updatedData = [...dataReminders, item];
        setDataReminders(updatedData);
    }

  return (
    <>
    <h2 className={styles.tituloRecord}>Recordatorios</h2>

    <div className={styles.containerBody}>
        <CreacionRecordatorio updateRecordatorios={(e)=>handleUpdateInfo(e)}/>
        <ListadoRecordatorios recordatorios={dataReminders}/>
    </div>
    </>
  );
}

export default RecordatoriosContainer;
