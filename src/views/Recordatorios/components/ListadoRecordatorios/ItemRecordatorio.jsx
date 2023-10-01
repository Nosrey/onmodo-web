import React from 'react';
import styles from './ItemRecordatorio.module.css';


function ItemRecordatorio({data}) {

  return (
    <>
      <div className={styles.item}>
        <div className={styles.header}>
          <span className={styles.title}>{data.titulo}</span>
          <span className={styles.frecuencia}>{data.frecuencia !== "Fecha específica" ? data.frecuencia : data.fechaEspecifica}</span>

        </div>
        <p className={styles.description}>{data.descripcion.trim()  !== ""  ? data.descripcion  : "Sin descripción"}</p>
        <a  className={styles.link} href={data.link} target='_blank' rel="noreferrer">{data.linkTitle ? data.linkTitle : data.link}</a>

      </div>
    </>
  );
}

export default ItemRecordatorio;
