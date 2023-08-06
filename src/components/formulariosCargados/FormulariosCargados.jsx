import React, { useEffect } from 'react';
import Card from '../card/Card';
import { useState } from 'react';
import styles from './FormulariosCargados.module.css';
import axios from 'axios';

function FormulariosCargados() {
 
  const [forms, setForms] = useState([]);
  const [sortedForms, setSortedForms] = useState(forms);
  const [reload, setReload] = useState(true);
  // // // [
  // // //   {
  // // //     title: 'Registros de decomisos de materias primas',
  // // //     link: '',
  // // //   },
  // // //   {
  // // //     title: 'Reporte de Rechazo/Devolución de Materias Primas',
  // // //     link: '',
  // // //   },
  // // //   {
  // // //     title: 'Verificación de balanzas',
  // // //     link: '',
  // // //   },
  // // //   {
  // // //     title: 'Verificación de termómetros',
  // // //     link: '',
  // // //   },
  // // // ];

  
  function transformarArrayForms(forms) {
    return setSortedForms(forms.map(form => ({ title: form, link: form })));
  }



  var idUser = localStorage.getItem("idUser");
  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value === 'A-Z') {
      const sorted = [...forms].sort((a, b) => a.title.localeCompare(b.title));
      setSortedForms(sorted);
    } else if (value === 'Z-A') {
      const sorted = [...forms].sort((a, b) => b.title.localeCompare(a.title));
      setSortedForms(sorted);
    }
  };


  function obtenerNombresPropiedadesConArraysNoVacios(objeto) {
    const nombresPropiedades = [];
    for (const clave in objeto) {
      if (Array.isArray(objeto[clave]) && objeto[clave].length > 0) {
        nombresPropiedades.push(clave);
      }
    }
    return nombresPropiedades;
  }
  const handleButtonClick =async () => {

    const response = await axios.get(`http://localhost:4000/api/business/${idUser}`);
    console.log(response.data.response[0])

  };


useEffect(() => {
  fetchData()
}, [forms,sortedForms])


  function filtrarObjetoPorObjetos(objeto) {
    const resultado = {};
    for (const clave in objeto) {
      if (typeof objeto[clave] === 'object' && objeto[clave] !== null ) {
        resultado[clave] = objeto[clave];
      }
    }
    return resultado;
  }
  function filtrarObjetoPorArraysNoVacios(objeto) {
    const resultado = {};
    for (const clave in objeto) {
      if (Array.isArray(objeto[clave]) && objeto[clave].length > 0) {
        resultado[clave] = objeto[clave];
      }
    }
    return resultado;
  }
  
console.log( axios.get(`http://localhost:4000/api/business/${idUser}`))
async function fetchData() {
  try {
    const response = await axios.get(`http://localhost:4000/api/business/${idUser}`);
    const datae = response.data.response[0];
    const dataaa = [datae][0]
    const datita = filtrarObjetoPorObjetos(dataaa)

    const data2 = filtrarObjetoPorArraysNoVacios(datita)

    const data3 = obtenerNombresPropiedadesConArraysNoVacios(data2)

 
    const arrayFinal = transformarArrayForms(data3)
    transformarArrayForms(data3)
    setReload(false)
    console.log("final", arrayFinal)

    return setForms(arrayFinal);
  } catch (error) {
    console.error('Error:', error);

    return null;
  }
}









  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.orderContainer}>
          <span className={styles.spanOrder}>Ordenar por:</span>
          <select name='' id={styles.select} onChange={handleSortChange}>
            <option value='A-Z'>A - Z</option>
            <option value='Z-A'>Z - A</option>
            <option value='Últimos utilizados'>Últimos utilizados</option>
            <option value='Z-A'>Fecha de modificación</option>
          </select>
          <button onClick={handleButtonClick}>
      Presiona para obtener formularios cargados
    </button>
        </div>
        <div className={styles.cardContainer}>
          {sortedForms.length > 0
            ? sortedForms.map((form, index) => <Card text={form} key={index} />)
            : forms.map((form, index) => <Card text={form} key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default FormulariosCargados;
