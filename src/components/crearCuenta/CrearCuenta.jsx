import React, { useState } from 'react';
import styles from './CrearCuenta.module.css';
import RoundImage from '../roundImage/RoundImage';

function CrearCuenta() {
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [inputValue, setInputValue] = useState({
    nombre: '',
    email: '',
    legajo: '',
    celular: '',
    nivel: 'Nivel 1',
    puesto: '',
    localidad: '',
    provincia: '',
    contrato: '',
    imagen: null,
  });

  const handleImageChange = (imageFile) => {
    setInputValue({ ...inputValue, imagen: imageFile });
  };

  const validate = (values) => {
    let errors = {};
    if (!values.nombre) errors.nombre = 'El nombre es requerido';
    if (!values.email) {
      errors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'El correo electrónico es inválido';
    }
    if (!values.legajo) errors.legajo = 'El número de legajo o DNI es requerido';
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
    if (!values.contrato) errors.contrato = 'El coontrato o comedor es requerido';

    return errors;
  };

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
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
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {showToast && (
          <div className={styles.toastContainer}>
            <span className={styles.toast}>¡Cambios guardados exitosamente!</span>
          </div>
        )}

        <div className={styles.imgContainer}>
          <RoundImage onImageChange={handleImageChange} />
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} action='' className={styles.formulario}>
            <div className={styles.inputContainer}>
              <label htmlFor=''>Nombre*</label>
              <input
                type='text'
                className={`${errors.nombre && 'danger'} ${styles.input}`}
                value={inputValue.nombre}
                onChange={handleChange}
                name='nombre'
                placeholder='Nombre y apellido'
              />
              {errors.nombre && <p className='danger'>{errors.nombre}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor=''>Email*</label>
              <input
                // type='email'
                className={`${errors.email && 'danger'} ${styles.input}`}
                value={inputValue.email}
                onChange={handleChange}
                name='email'
                placeholder='Ejemplo@gmail.com'
              />
              {errors.email && <p className='danger'>{errors.email}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor=''>Número de legajo o DNI*</label>
              <input
                type='number'
                className={`${errors.legajo && 'danger'} ${styles.input}`}
                value={inputValue.legajo}
                onChange={handleChange}
                name='legajo'
                placeholder='Número de legajo o DNI'
              />
              {errors.legajo && <p className='danger'>{errors.legajo}</p>}
            </div>
            <div id={styles.celInputContainer} className={styles.inputContainer}>
              <label htmlFor=''>Número de contacto*</label>
              <input
                type='number'
                className={`${errors.celular && 'danger'} ${styles.input}`}
                value={inputValue.celular}
                onChange={handleChange}
                name='celular'
                placeholder='Número de contacto'
              />
              {errors.celular && <p className='danger'>{errors.celular}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor=''>Nivel</label>
              <input
                type='text'
                className={`${errors.nivel && 'danger'} ${styles.input}`}
                value={inputValue.nivel}
                onChange={handleChange}
                name='nivel'
                disabled
              />
              {errors.nivel && <p className='danger'>{errors.nivel}</p>}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor=''>Puesto*</label>
              <select
                className={`${errors.puesto && 'danger'} ${styles.input} ${styles.select}`}
                value={inputValue.puesto}
                onChange={handleChange}
                name='puesto'
                placeholder='Puesto'
              >
                <option value='' disabled selected>
                  - Selecciona Puesto -
                </option>
                <option value='supervisor'>Supervisor</option>
                <option value='gerente'>Gerente</option>
                <option value='vendedor'>Vendedor</option>
              </select>
              {errors.puesto && <p className='danger'>{errors.puesto}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor=''>Provincia*</label>
              <select
                className={`${errors.provincia && 'danger'} ${styles.input} ${styles.select}`}
                value={inputValue.provincia}
                onChange={handleChange}
                name='provincia'
              >
                <option value='' disabled selected>
                  - Selecciona Provincia -
                </option>
                <option value='Buenos Aires'>Buenos Aires</option>
                <option value='Córdoba'>Córdoba</option>
                <option value='Río Negro'>Río Negro</option>
              </select>
              {errors.provincia && <p className='danger'>{errors.provincia}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor=''>Localidad*</label>
              <select
                className={`${errors.localidad && 'danger'} ${styles.input} ${styles.select}`}
                value={inputValue.localidad}
                onChange={handleChange}
                name='localidad'
              >
                <option value='' disabled selected>
                  - Selecciona Localidad -
                </option>
                <option value='Río Cuarto'>Río Cuarto</option>
                <option value='Córdoba'>Córdoba</option>
                <option value='Las Jarillas'>Las Jarillas</option>
              </select>
              {errors.localidad && <p className='danger'>{errors.localidad}</p>}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor=''>Contrato/Comedor*</label>
              <input
                type='text'
                className={`${errors.contrato && 'danger'} ${styles.input}`}
                value={inputValue.contrato}
                onChange={handleChange}
                name='contrato'
                placeholder='Contrato/Comedor'
              />
              {errors.contrato && <p className='danger'>{errors.contrato}</p>}
            </div>

            <div className={styles.btnContainer}>
              <button type='submit' className={styles.btn} id={styles.btnDos}>
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
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

export default CrearCuenta;
