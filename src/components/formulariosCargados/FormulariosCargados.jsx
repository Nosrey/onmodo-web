import React, { useEffect } from 'react';
import Card from '../card/Card';
import { useState } from 'react';
import styles from './FormulariosCargados.module.css';
import { getUserInfo } from '../../services/Request';
import { Oval } from 'react-loader-spinner';
import { FORMS_WEB } from '../../utils/constants/data';

function FormulariosCargados({filterByKey}) {
  var idUser = localStorage.getItem("idUser");
  const [forms, setForms] = useState([]);
  const [sortedForms, setSortedForms] = useState(forms);
  const [isLoading, setIsLoading] = useState(true);
  const [showEmptyMsg, setShowEmptyMsg] = useState(false);
  const [noResultMsg, setNoResultMsg] = useState(false);

  function transformarArrayForms(forms) {
    return setSortedForms(forms.map(form => ({
      title: form.clave,
      link: `/formularios-cargados/${form.clave}`,
      cantidad: form.cantidad,
      ultimaActualizacion: form.ultimaActualizacion
    })));
      }

  const handleSortChange = (event) => {
    const value = event.target.value;
    setIsLoading(true)
    if (value === 'A-Z') {
      const sorted = [...sortedForms].sort((a, b) => a.title.localeCompare(b.title));
      setSortedForms(sorted);
    } else if (value === 'Z-A') {
      const sorted = [...sortedForms].sort((a, b) => b.title.localeCompare(a.title));
      setSortedForms(sorted);
    } else if (value === 'Más utilizados') {
      const sorted = [...sortedForms].sort((a, b) => b.cantidad - a.cantidad);
      setSortedForms(sorted)
    } else if (value === 'Último modificado'){
      const sorted = [...sortedForms].sort((a, b) => new Date(b.ultimaActualizacion) - new Date(a.ultimaActualizacion));
      setSortedForms(sorted)

    }
    setIsLoading(false)
  };

  function obtenerNombresPropiedadesConArraysNoVacios(objeto) {
    const nombresPropiedades = [];
    for (const clave in objeto) {
      if (Array.isArray(objeto[clave]) && objeto[clave].length > 0) {
        // para calcular la fecha mas recientemente actualizada de cada formulario 
        let fechaMasReciente = new Date(0);
        let formActualizadoMasReciente = null;

        // Recorre el array y compara las fechas updatedAt
        for (const item of objeto[clave]) {
            const fechaActual = new Date(item.updatedAt);
            if (fechaActual > fechaMasReciente) {
                fechaMasReciente = fechaActual;
                formActualizadoMasReciente = item;
            }
        }

        // le agrego a mi info del form las propiedades que voy a necesitar para renderizar la card y para hacer los filters
        nombresPropiedades.push({clave, cantidad: objeto[clave].length, ultimaActualizacion: formActualizadoMasReciente.updatedAt});
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
  
  const obtenerSoloFormsDeWeb = (data) =>{
    const objetoFiltrado = {};

    for (const propiedad in data) {
      if (FORMS_WEB.includes(propiedad)) {
        objetoFiltrado[propiedad] = data[propiedad];
      }
    }
    return objetoFiltrado;
  }
  
 const fetchData = () => {
  getUserInfo(idUser).then((resp)=> {   
    const data = filtrarObjetoPorObjetos(resp[0]);
    const data2 = filtrarObjetoPorArraysNoVacios(data);
    const dataWeb = obtenerSoloFormsDeWeb(data2)
    const data3 = obtenerNombresPropiedadesConArraysNoVacios(dataWeb); 
    const arrayFinal = transformarArrayForms(data3)
    transformarArrayForms(data3)
    setIsLoading(false)
    return setForms(arrayFinal);
   
  }).catch((err) => {
    console.error('Error:', err);
  })
}
  useEffect(() => {
    fetchData();
    setNoResultMsg(false);
  }, [])

  useEffect(() => {
    if (forms && forms.length === 0) {
      setShowEmptyMsg(true)
    } 
  }, [forms])

  useEffect(() => {
    
    if (filterByKey && filterByKey.trim() !== '') {
      setIsLoading(true)
     const copy = [...sortedForms];
     const results = copy.filter((form)=>form.title.toLowerCase().includes(filterByKey.toLowerCase()))

     if (results.length !== 0) {
       setSortedForms(results);
       setIsLoading(false)

     } else {
      setNoResultMsg(true);
       setIsLoading(false)
     }

    }
    if (filterByKey === '') {
      setIsLoading(true)
      fetchData()
      setNoResultMsg(false);
    }
  }, [filterByKey])

  return (
    <>
    {isLoading ? (
      <Oval
        height={30}
        width={30}
        color='#4fa94d'
        wrapperStyle={{
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: '60px',
          paddingBottom: '60px',
          justifyContent: 'center'
        }}
        wrapperClass=''
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='#4fa94d'
        strokeWidth={5}
        strokeWidthSecondary={2}
      />
    ) : (
            <><h2 className={styles.tituloRecord}>Formularios Cargados</h2>
            <div className={styles.container}>

            <div className={styles.wrapper}>
              <div className={styles.orderContainer}>
                <span className={styles.spanOrder}>Ordenar por:</span>
                <select name='' id={styles.select} onChange={handleSortChange}>
                  <option value='A-Z'>A - Z</option>
                  <option value='Z-A'>Z - A</option>
                  <option value='Más utilizados'>Más utilizados</option>
                  <option value='Último modificado'>Último modificado</option>
                </select>
              </div>
              {filterByKey && filterByKey.length !== 0 && !noResultMsg && sortedForms.length !== 0 && <div><span>Resultados para:  "{filterByKey}"</span></div>}

              <div className={styles.cardContainer}>
                {noResultMsg ?
                  <span>No hay resultados para su búsqueda</span>
                  :
                  <>
                    {sortedForms.length > 0
                      ? sortedForms.map((form, index) => <Card text={form} key={index} />)
                      : <span>No hay Formularios cargados en su historial</span>}
                  </>}
              </div>

            </div>
          </div></>
    )}
    </>
  );
}

export default FormulariosCargados;

