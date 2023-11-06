import React, { useEffect, useState } from 'react';
import styles from './ListadoRecordatorios.module.css';
import ItemRecordatorio from './ItemRecordatorio';
import { RECORDATORIOS_INFO } from '../../../../components/shared/constants/recordatoriosInfo';

function ListadoRecordatorios({ recordatorios, updateInfo }) {
  const [reminders, setReminders] = useState(recordatorios);
  const [filteredReminders, setFilteredReminders] = useState(recordatorios);
  const [status, setStatus] = useState('En curso');
  const [tarea, setTarea] = useState('Todas');

  const handleChangeFilter = (value) => {
    setStatus(value);
  };

  const handleSearch = (indexTarea) => {
    setTarea(indexTarea)
  }

  useEffect(() => {
    const filterReminders = (reminder) => {
      return (status === 'Todos' || reminder.status === status) && (tarea === 'Todas' || reminder.tarea === tarea);
    };
  
    setFilteredReminders(() => [...reminders.filter(filterReminders)]);
  }, [status, tarea, reminders]);

  useEffect(() => {
    if (recordatorios.length !== 0) {
      setReminders(() => [...recordatorios]);
    }
  }, [recordatorios]);

  return (
    <div className={styles.eventos}>
      <div className={styles.titleRdos}>
        <h4 className={styles.title}>Eventos</h4>

        <div className={styles.filters}>
          <div className={styles.selectContainer}>
            <label htmlFor=''>Filtrar por Tarea</label>
            <select
              name='Tearea'
              id='Tearea'
              onChange={(e) => handleSearch(e.target.value)}
              value={tarea}
            >
              {
              RECORDATORIOS_INFO.map((item, index) => (
                <option key={index} value={index}>{item}</option>
              ))
            }
              <option value='Todas'>Todas</option>
            </select>
          </div>

          <div className={styles.selectContainer}>
            <label htmlFor=''>Filtrar por Status</label>
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
              <option value='Archivar tarea completa'>Archivar tarea completa</option>
              <option value='Resuelto'>Resuelto</option>
              <option value='Todos'>Todos</option>
            </select>
          </div>
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
