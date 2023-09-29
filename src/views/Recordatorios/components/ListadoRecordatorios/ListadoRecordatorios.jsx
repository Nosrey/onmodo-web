import React, { useState } from 'react';
import styles from './ListadoRecordatorios.module.css';
import ItemRecordatorio from './ItemRecordatorio';



function ListadoRecordatorios({recordatorios}) {
  const [reminders, setReminders] = useState(recordatorios)

  return (
    <div className={styles.eventos}>
      <h4 className={styles.title}>Próximos eventos</h4>

      {reminders && reminders.length !== 0 ?
      <div className={styles.containerItems}>

        {reminders.map((item, index) => (
          <ItemRecordatorio data={item} key={index} />
        ))}
      </div>

      : 
        <div className={styles.contPlaceholder}>
          <p className={styles.textPlaceholder}>No hay eventos.</p>
        </div>
      
    }
    </div>
  );
}

export default ListadoRecordatorios;
