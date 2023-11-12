import React from 'react';
import styles from './Formularios.module.css';
import Card from '../card/Card';
import { useState , useEffect} from 'react';
import { FORMS_LIST } from '../shared/constants/formsList';
import { Oval } from 'react-loader-spinner';

function FormulariosContainer({filterByKey}) {
  const [sortedForms, setSortedForms] = useState([]);
  const [noResultMsg, setNoResultMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const myRol = localStorage.getItem("rol")

  let forms = FORMS_LIST;

  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value === 'A-Z') {
      const sorted = [...sortedForms].sort((a, b) => a.title.localeCompare(b.title));
      setSortedForms(sorted);
      setIsLoading(false)
    } else if (value === 'Z-A') {
      const sorted = [...sortedForms].sort((a, b) => b.title.localeCompare(a.title));
      setSortedForms(sorted);
      setIsLoading(false)
    }    else if (value === 'Más utilizado') {
      // const sorted = [...sortedForms].sort((a, b) => b.title.localeCompare(a.title));
      // setSortedForms(sorted);
      // setIsLoading(false)
    }
  };

  const filterByRol =() => {
    if (myRol === "1") {
      setSortedForms(() => [...forms.filter((item) => item.rol === "all")])
     } else {
       setSortedForms(()=> [...forms])
     }
     setIsLoading(false)

  }

  useEffect(() => {
    filterByRol()
  }, [])

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
      filterByRol();
      setNoResultMsg(false);
      setIsLoading(false)

    }
  }, [filterByKey])
  

  return  (
    <>
    {isLoading ? (
      <Oval
        height={30}
        width={30}
        color='#4fa94d'
        wrapperStyle={{
          marginLeft: 'auto ',
          marginRight: 'auto ',
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
      <><h2 className={styles.tituloRecord}>Formularios</h2>
      <div className={styles.container}>
            <div className={styles.wrapper}>
              <div className={styles.orderContainer}>
                <span className={styles.spanOrder}>Ordenar por:</span>
                <select name='' id={styles.select} onChange={handleSortChange}>
                  {/* <option value='Más utilizado'>Más utilizado</option> */}
                  <option value='A-Z'>A - Z</option>
                  <option value='Z-A'>Z - A</option>
                </select>
              </div>
              {filterByKey && filterByKey.length !== 0 && !noResultMsg && <div><span>Resultados para:  "{filterByKey}"</span></div>}

              <div className={styles.cardContainer}>
                {noResultMsg ?
                  <span>No hay resultados para su búsqueda</span>
                  :
                  <>
                    {sortedForms.length > 0
                      ? sortedForms.map((form, index) => <Card text={form} key={index} />)
                      : forms.map((form, index) => <Card text={form} key={index} />)}
                  </>}
              </div>
            </div>
          </div></>
    )
  }
  </>
  )
}

export default FormulariosContainer;
