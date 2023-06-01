import React from 'react';
import Card from '../card/Card';
import { useState } from 'react';
import styles from './FormulariosCargados.module.css';

function FormulariosCargados() {
  const [sortedForms, setSortedForms] = useState([]);

  let forms = [
    {
      title: 'Registros de decomisos de materias primas',
      link: '',
    },
    {
      title: 'Reporte de Rechazo/Devolución de Materias Primas',
      link: '',
    },
    {
      title: 'Verificación de balanzas',
      link: '',
    },
    {
      title: 'Verificación de termómetros',
      link: '',
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
