import React, { useEffect, useState } from 'react';
import styles from './RecordatoriosContainer.module.css';
import CreacionRecordatorio from './components/CreacionRecordatorio/CreacionRecordatorio';
import ListadoRecordatorios from './components/ListadoRecordatorios/ListadoRecordatorios';
import { useMedia } from '../../utils/hooks/UseMedia';
import { Button } from '@mui/material';
import Modal from '../../components/shared/Modal';
const DATA_RECORDATORIOS = [
    {
        tarea: "2" ,
        descripcion: "Es neceario limpiar los tanques dos veces al año . Para esto es necesario utilizar los productos detallados en la documentación adjunta y los elementos de protección necesarios.",
        link:"https://www.google.com",
        linkTitle:"Manual paso a paso",
        frecuencia : "Semestral",
        fechaInicio: "10/11/23",
        fechas: [
            {
                "fecha": "14/10/2023",
                "ejecutado": true
            },
            {
                "fecha": "14/11/2023",
                "ejecutado": true
            },
            {
                "fecha": "14/12/2023",
                "ejecutado": true
            },
            {
                "fecha": "05/11/2023",
                "ejecutado": false
            },
            {
                "fecha": "14/02/2024",
                "ejecutado": false
            },
        ],
        status: "En curso", 
        id: 1
    },
    {
        tarea: "5" ,
        descripcion: "Es necesario pintar las rejas del edificio utilizando pintura sintética color negro. No olvidar icluir antioxidante.",
        link:"https://www.google.com",
        linkTitle:"Instructivo",
        frecuencia : "Cada 2 años",
        fechaInicio: "29/10/23",
        status: "En curso",

        fechas:  [
            {
                "fecha": "01/12/2022",
                "ejecutado": false
            },
            {
                "fecha": "14/11/2023",
                "ejecutado": false
            },
            {
                "fecha": "14/12/2023",
                "ejecutado": false
            },
            {
                "fecha": "14/01/2024",
                "ejecutado": false
            },
            {
                "fecha": "14/02/2024",
                "ejecutado": false
            },
        ],
        id: 2
    },
    {
        tarea: "0" ,
        descripcion: "Llamar al banco para pedir el resumen de cuenta ",
        link:"https://www.google.com",
        linkTitle:"Documentación",
        frecuencia : "",
        status: "En proceso de desarrollo",
        fechas:  [],
        fechaInicio: "",
        id: 3
    },
]

function RecordatoriosContainer() {
    const [dataReminders, setDataReminders] = useState();
    const media = useMedia();
    const [showModal, setShowModal] = useState(false);
    var nivelRol = localStorage.getItem('rol');
    const handleUpdateInfo = (item) => {
        setShowModal(false)
        // const updatedData = [...dataReminders, item];
        // setDataReminders(updatedData);
    }

    useEffect(() => {
        
      // Filtrary ordenar por fecha creciente
       
      setDataReminders(()=>[...DATA_RECORDATORIOS])
    }, [])
    


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
        {dataReminders && <ListadoRecordatorios recordatorios={dataReminders}/>}
            
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
