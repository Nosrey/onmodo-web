import React from 'react';
import styles from './Formularios.module.css';
import Card from '../card/Card';
import { useState , useEffect} from 'react';

function FormulariosContainer() {
  const [sortedForms, setSortedForms] = useState([]);
  const myRol = localStorage.getItem("rol")

  let forms = [
    {
      title: 'Entrega de ropa de trabajo y EPP',
      link: '/ropa-de-trabajo',
      rol:'superior'
    },
    {
      title: 'Control de comensales con dietas Especiales',
      link: '/dietas-especiales',
      rol:'superior'
    },
    {
      title: 'Entrega de bidones de aceite usado',
      link: '/bidones-de-aceite',
      rol:'superior'
    },
    {
      title: 'Flash reporte de incidentes',
      link: '/reporte-incidente',
      rol:'superior'
    },
    {
      title: 'Informe interno de accidente',
      link: '/informe-accidente',
      rol:'superior'
    },
    {
      title: 'Registro de Capacitación',
      link: '/registro-de-capacitacion',
      rol:'superior'
    },
    {
      title: 'Decomiso de materias primas',
      link: '/registro-decomisos-mp',
      rol:'all'
    },
    {
      title: 'Registro de Simulacro',
      link: '/registro-simulacro',
      rol:'superior'
    },
    {
      title: 'Rechazo-devolución de mat primas',
      link: '/rechazo-mp',
      rol:'all'
    },
    {
      title: 'Verificación Balanzas',
      link: '/verificacion-balanza',
      rol:'all'
    },
    {
      title: 'Verificación Termómetros',
      link: '/verificacion-termometro',
      rol:'all'
    },
   
  ];

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

  useEffect(() => {
    if (myRol !== "1") {
     setSortedForms(() => [... forms.filter((item) => item.rol === "superior")])
    }
  }, [])
  

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.orderContainer}>
          <span className={styles.spanOrder}>Ordenar por:</span>
          <select name='' id={styles.select} onChange={handleSortChange}>
            <option value='Últimos utilizados'>Últimos utilizados</option>
            <option value='A-Z'>A - Z</option>
            <option value='Z-A'>Z - A</option>
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

export default FormulariosContainer;
