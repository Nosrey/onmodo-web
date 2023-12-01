import React, { useState,  useEffect } from 'react';
import styles from './InfoBusiness.module.css';
import RoundImage from '../roundImage/RoundImage';
import { editBusinessInfo, getBusinessInfo } from '../../services/Request';

function InfoBusiness() {
  const [inputValue, setInputValue] = useState();
  const [idBusiness, setIdBusiness] = useState();
  const handleImageChange = (imageFile) => {
    setInputValue({ ...inputValue, logo: imageFile });
  };

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const clave in inputValue) { //elimino todo lo vacio
      if (inputValue[clave] === '' || inputValue[clave] === null) {
          delete inputValue[clave];
      }
    }
    editBusinessInfo(inputValue ,idBusiness ).then((resp)=> alert('edicion exitosa'))
 
  };

  
  useEffect(() => {
    getBusinessInfo(localStorage.getItem('business')).then((resp)=>{
      setIdBusiness(resp.response._id)
      if (resp.success) {
        setInputValue({
          name: resp.response.name,
          linkDocumentacion: resp.response.linkDocumentacion,
          logo: resp.response.logo,
        })
      } else {
        setInputValue({
          name: '',
          linkDocumentacion: '',
          logo: null,
        })
      }
    })
  }, []);
  return <>
    {
      inputValue &&
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <p>Editar info Business</p>
          <div className={styles.imgContainer}>
            <RoundImage onImageChange={handleImageChange} />
          </div>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} action='' className={styles.formulario}>
              <div className={styles.inputContainer}>
                <label htmlFor=''>Nombre</label>
                <input
                  type='text'
                  disabled
                  className={` ${styles.input}`}
                  value={inputValue?.name}
                  onChange={handleChange}
                  name='nombre'
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor=''>Link Documentacion</label>
                <input
                  className={` ${styles.input}`}
                  value={inputValue.linkDocumentacion}
                  onChange={handleChange}
                  name='linkDocumentacion'
                  placeholder=''
                />
              </div>

              <div className={styles.btnContainer}>
                <button type='submit' className={styles.btn} id={styles.btnDos}>
               Editar Info
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    }
   </>
  
}

export default InfoBusiness;
