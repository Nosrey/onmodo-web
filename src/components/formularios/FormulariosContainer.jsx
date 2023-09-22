import React from 'react';
import styles from './Formularios.module.css';
import Card from '../card/Card';
import { useState , useEffect} from 'react';
import { FORMS_LIST } from '../shared/constants/formsList';

function FormulariosContainer() {
  const [sortedForms, setSortedForms] = useState([]);
  const myRol = localStorage.getItem("rol")

  let forms = FORMS_LIST;

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
