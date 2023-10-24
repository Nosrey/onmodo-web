import React, { useEffect, useState } from 'react';
import styles from './ListadoRecordatorios.module.css';
import ItemRecordatorio from './ItemRecordatorio';

function ListadoRecordatorios({ recordatorios, updateInfo }) {
  const [reminders, setReminders] = useState(recordatorios);
  const [filteredReminders, setFilteredReminders] = useState(recordatorios);
  const [status, setStatus] = useState('En curso');

  const handleChangeFilter = (value) => {
    setStatus(value);
  };
  useEffect(() => {
    if (status === 'Todos') {
      setFilteredReminders(() => [...reminders]);
    } else {
      setFilteredReminders(() => [...reminders.filter((item) => item.status === status)]);
    }
  }, [status, reminders]);

  useEffect(() => {
    if (recordatorios.length !== 0) {
      setReminders(() => [...recordatorios]);
    }
  }, [recordatorios]);

  return (
    <div className={styles.eventos}>
      <div className={styles.titleRdos}>
        <h4 className={styles.title}>Eventos</h4>

        <div className={styles.selectContainer}>
          <label htmlFor=''>Filtrar por</label>
          <select
            name='Status'
            id='Status'
            onChange={(e) => handleChangeFilter(e.target.value)}
            value={status}
          >
            <option value='Aún no desarrollado'>Aún no desarrollado</option>
            <option value='En proceso de desarrollo'>En proceso de desarrollo</option>
            <option value='En curso'>En curso</option>
            <option value='Desestimado Transitoriamente'>Desestimado Transitoriamente</option>
            <option value='Resuelto'>Resuelto</option>
            <option value='Todos'>Todos</option>
          </select>
        </div>
      </div>

      {filteredReminders && filteredReminders.length !== 0 ? (
        <div className={styles.containerItems}>
          {filteredReminders.map((item, index) => (
            <ItemRecordatorio data={item} key={index} updateInfo={updateInfo} />
          ))}
        </div>
      ) : (
        <div className={styles.contPlaceholder}>
          <p className={styles.textPlaceholder}>No hay eventos.</p>
        </div>
      )}
    </div>
  );
}

export default ListadoRecordatorios;
