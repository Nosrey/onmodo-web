import styles from './Cuenta.module.css';
import React, { useEffect, useState } from 'react';
import perfil from '../../../assets/image/perfil.png';
import placeholder from '../../../assets/image/download.png';
import { getUserInfo } from '../../../services/Request';
import { useLocation } from 'react-router-dom';
import { PUESTOS_N1 } from '../../../components/shared/constants/Puestos';

function Cuenta() {
  var idUser = localStorage.getItem("idUser");
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [editInput, setEditInput] = useState(true);
  const [btnEdit, setBtnEdit] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [srcImage, setSrcImage] = useState();
  const [puestoOptions, setPuestoOptions] = useState(PUESTOS_N1)
  const [isANewProfile, setIsANewProfile] = useState(true);

  const validate = (values) => {
    let errors = {};
    if (!values.nombre) errors.nombre = 'El nombre es requerido';
    if (!values.legajo) errors.legajo = 'El número de legajo o DNI es requerido';
    if (!values.email) errors.email = 'El correo es requerido';
    if (!values.celular) {
      errors.celular = 'El número de contacto es requerido';
    } else if (
      !/^(\d{1,4}[-. ]?)?(\d{4}[-. ]?\d{4})$/.test(values.celular.replace(/[.-\s]/g, ''))
    ) {
      errors.celular = 'El formato de número no es válido para Argentina';
    }
    if (!values.nivel) errors.nivel = 'El nivel es requerido';
    if (!values.puesto) errors.puesto = 'El puesto es requerido';
    if (!values.localidad) errors.localidad = 'La localidad es requerida';
    if (!values.provincia) errors.provincia = 'La provincia es requerida';
    if (!values.contrato) errors.contrato = 'Esta información es requerida';

    return errors;
  };

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const disabledInputs = () => {
    setEditInput(false);
    setBtnEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(inputValue);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      setBtnEdit(!btnEdit);
      setEditInput(true);
    }
  };

  useEffect(() => {
    console.log(location.pathname)
    if (location.pathname === "/cuenta") {
      getUserInfo(idUser).then((resp) => {
        console.log(resp)
        setInputValue({
          nombre: resp[0].fullName,
          legajo: resp[0].legajo,
          email: resp[0].email,
          celular:resp[0].number,
          nivel: resp[0].rol,
          puesto: resp[0].puesto,
          localidad: resp[0].localidad,
          provincia: resp[0].provincia,
          contrato:resp[0].contratoComedor,
        })
        setSrcImage(perfil);
        setIsANewProfile(false);
      })
    } else {
      setInputValue({
        nombre: '',
        legajo: '',
        email: '',
        celular: '',
        nivel: '',
        puesto: '',
        localidad: '',
        provincia: '',
        contrato:'',
      })
      setSrcImage(placeholder)
      setIsANewProfile(true);

    }
  }, [])
  

  return (
    
      <div className={styles.container}>
        {inputValue && 
        <div className={styles.wrapper}>
          {showToast && (
            <div className={styles.toastContainer}>
              <span className={styles.toast}>¡Cambios guardados exitosamente!</span>
            </div>
          )}

          <div className={styles.imgContainer}>
            <img src={srcImage} className={styles.image} alt='' />
          </div>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} action='' className={styles.formulario}>
              <div className={styles.inputContainer}>
                <label htmlFor=''>Nombre</label>
                <input
                  type='text'
                  className={`${errors.nombre && 'danger'} ${styles.input}`}
                  value={inputValue.nombre}
                  onChange={handleChange}
                  name='nombre'
                  disabled={!isANewProfile}
                />
                {errors.nombre && <p className='danger'>{errors.nombre}</p>}
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor=''>Número de legajo o DNI</label>
                <input
                  type='number'
                  className={`${errors.legajo && 'danger'} ${styles.input}`}
                  value={inputValue.legajo}
                  onChange={handleChange}
                  name='legajo'
                  disabled={!isANewProfile}
                />
                {errors.legajo && <p className='danger'>{errors.legajo}</p>}
              </div>
              <div id={styles.celInputContainer} className={styles.inputContainer}>
                <label htmlFor=''>Número de contacto</label>
                <input
                  type='number'
                  className={`${errors.celular && 'danger'} ${styles.input}`}
                  value={inputValue.celular}
                  onChange={handleChange}
                  name='celular'
                  disabled={editInput && !isANewProfile}
                />
                {errors.celular && <p className='danger'>{errors.celular}</p>}
                {/* <i id={styles.close} class='ri-close-circle-fill'></i> */}
                {/* <i id={styles.check} class='ri-checkbox-circle-fill'></i> */}
              </div>
              <div id={styles.celInputContainer} className={styles.inputContainer}>
                <label htmlFor=''>Correo electrónico</label>
                <input
                  type='email'
                  className={`${errors.email && 'danger'} ${styles.input}`}
                  value={inputValue.email}
                  onChange={handleChange}
                  name='email'
                  disabled={editInput && !isANewProfile}
                />
                {errors.email && <p className='danger'>{errors.email}</p>}
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor=''>Nivel</label>
                <input
                  type='text'
                  className={`${errors.nivel && 'danger'} ${styles.input}`}
                  value={inputValue.nivel}
                  onChange={handleChange}
                  name='nivel'
                  disabled={!isANewProfile}
                />
                {errors.nivel && <p className='danger'>{errors.nivel}</p>}
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor=''>Puesto</label>
                <select
                  className={`${errors.puesto && 'danger'} ${styles.input} ${styles.select}`}
                  value={inputValue.puesto}
                  onChange={handleChange}
                  name='puesto'
                  disabled={!isANewProfile}
                >
                  <option value='' selected hidden>- Seleccione -</option>
                  {puestoOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.puesto && <p className='danger'>{errors.puesto}</p>}
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor=''>Provincia</label>
                <select
                  className={`${errors.provincia && 'danger'} ${styles.input} ${styles.select}`}
                  value={inputValue.provincia}
                  onChange={handleChange}
                  name='provincia'
                  disabled={!isANewProfile}
                >
                  <option value='Buenos Aires'>Buenos Aires</option>
                  <option value='Córdoba'>Córdoba</option>
                  <option value='Río Negro'>Río Negro</option>
                </select>
                {errors.provincia && <p className='danger'>{errors.provincia}</p>}
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor=''>Localidad</label>
                <select
                  className={`${errors.localidad && 'danger'} ${styles.input} ${styles.select}`}
                  value={inputValue.localidad}
                  onChange={handleChange}
                  name='localidad'
                  disabled={!isANewProfile}
                >
                  <option value='Río Cuarto'>Río Cuarto</option>
                  <option value='Córdoba'>Córdoba</option>
                  <option value='Las Jarillas'>Las Jarillas</option>
                </select>
                {errors.localidad && <p className='danger'>{errors.localidad}</p>}
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor=''>Contrato / Comedor</label>
                <input
                  type='text'
                  className={`${errors.contrato && 'danger'} ${styles.input}`}
                  value={inputValue.contrato}
                  onChange={handleChange}
                  name='contrato'
                  disabled={!isANewProfile}
                />
                {errors.contrato && <p className='danger'>{errors.contrato}</p>}
              </div>
            {
              isANewProfile ? 
              <div className={styles.btnContainer}>
                <button
                  type='submit'
                  className={styles.btn}
                  style={{ backgroundColor: `${!btnEdit ? '#a0b875' : '#7bc100'}` }}
                  id={styles.btnDos}
                >
                  Crear Cuenta
                </button>
              </div>
              : 
              <div className={styles.btnContainer}>
                <button
                  disabled={btnEdit}
                  type='button'
                  onClick={disabledInputs}
                  id={styles.btnUno}
                  className={styles.btn}
                >
                  Editar
                </button>
                <button
                  disabled={!btnEdit}
                  type='submit'
                  className={styles.btn}
                  style={{ backgroundColor: `${!btnEdit ? '#a0b875' : '#7bc100'}` }}
                  id={styles.btnDos}
                >
                  Guardar cambios
                </button>
              </div>
            }
              
            </form>
          </div>
        </div>
        }
      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <i class='ri-home-5-fill' style={{ color: 'white', fontSize: '24px' }}></i>
          <span style={{ color: 'white' }}>Inicio</span>
        </div>
        <div>
          <span style={{ color: 'white', fontSize: '24px' }}>|</span>
        </div>
        <div className={styles.footerWrapper}>
          <i class='ri-user-fill' style={{ color: 'white', fontSize: '24px' }}></i>
          <span style={{ color: 'white', fontWeight: '600' }}>Mi perfil</span>
        </div>
      </footer>
    </div>
   
  );
}

export default Cuenta;
