import React, { useEffect } from 'react';
import Card from '../card/Card';
import { useState } from 'react';
import styles from './FormulariosCargados.module.css';
import { getUserInfo } from '../../services/Request';

function FormulariosCargados() {
  var idUser = localStorage.getItem("idUser");
  const [forms, setForms] = useState([]);
  const [sortedForms, setSortedForms] = useState(forms);
  
  function transformarArrayForms(forms) {
    return setSortedForms(forms.map(form => ({ title: form, link: `/formularios-cargados/${form}` })));
  }

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
  
 const fetchData = () => {
  getUserInfo(idUser).then((resp)=> {   
    const data = filtrarObjetoPorObjetos(resp[0]);
    const data2 = filtrarObjetoPorArraysNoVacios(data);
    const data3 = obtenerNombresPropiedadesConArraysNoVacios(data2); 
    const arrayFinal = transformarArrayForms(data3)
    transformarArrayForms(data3)

    return setForms(arrayFinal);
  }).catch((err) => {
    console.error('Error:', err);
  })
}
  useEffect(() => {
    fetchData();
  }, [])

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