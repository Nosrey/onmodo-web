import React from 'react';
import styles from './Formularios.module.css';
import Card from '../card/Card';
import { useState } from 'react';

function FormulariosContainer() {
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
    // {
    //   title: 'Control de comensales con dietas especiales',
    //   link: '',
    // },
    // {
    //   title: 'Constancia de Entrega de Ropa de Trabajo y de E.P.P',
    //   link: '',
    // },
    // {
    //   title: 'Circuito de Aceite Usado',
    //   link: '',
    // },
    // {
    //   title: 'Flash Reporte de Incidente',
    //   link: '',
    // },
    // {
    //   title: 'Informe Interno de Accidente',
    //   link: '',
    // },
    // {
    //   title: 'Registro de Capacitación',
    //   link: '',
    // },

    // {
    //   title: 'Registro de Simulacro',
    //   link: '',
    // },
    // {
    //   title: 'Control de cloro activo residual',
    //   link: '',
    // },
    // {
    //   title: 'Control de Vidrios',
    //   link: '',
    // },
    // {
    //   title: 'Despacho a Producción',
    //   link: '',
    // },
    // {
    //   title: 'Recuperación de Producto',
    //   link: '',
    // },
    // {
    //   title: 'Armado/Fraccionamiento',
    //   link: '',
    // },
    // {
    //   title: 'Control de Equipos de Frío',
    //   link: '',
    // },
    // {
    //   title: 'Servicio en Línea',
    //   link: '',
    // },
    // {
    //   title: 'Distribución/Expedición',
    //   link: '',
    // },

    // {
    //   title: 'Recepción',
    //   link: '',
    // },
    // {
    //   title: 'Descongelamiento',
    //   link: '',
    // },

    // {
    //   title: 'Control de Procesos',
    //   link: '',
    // },
    // {
    //   title: 'Carga/ Recepción',
    //   link: '',
    // },
    // {
    //   title: 'Sanitización',
    //   link: '',
    // },
    // {
    //   title: 'Uso y Cambio de Aceite de Freidora',
    //   link: '',
    // },
    // {
    //   title: 'Chequeo de uso E.P.P',
    //   link: '',
    // },
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
