import styles from './Cuenta.module.css';
import React, { useState } from 'react';
import perfil from '../../assets/image/igacio.png';

function Cuenta() {
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [editInput, setEditInput] = useState(true);
  const [btnEdit, setBtnEdit] = useState(false);
  const [inputValue, setInputValue] = useState({
    nombre: 'Ignacio',
    legajo: '40675293',
    celular: '3517339345',
    nivel: '1',
    puesto: 'Supervisor',
    localidad: 'Córdoba',
    provincia: 'Córdoba',
  });

  const validate = (values) => {
    let errors = {};
    if (!values.nombre) errors.nombre = 'El nombre es requerido';
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

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {showToast && (
          <div className={styles.toastContainer}>
            <span className={styles.toast}>¡Cambios guardados exitosamente!</span>
          </div>
        )}

        <div className={styles.imgContainer}>
          <img src={perfil} className={styles.image} alt='' />
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
                disabled
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
                disabled
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
                disabled={editInput}
              />
              {errors.celular && <p className='danger'>{errors.celular}</p>}
              {/* <i id={styles.close} class='ri-close-circle-fill'></i> */}
              {/* <i id={styles.check} class='ri-checkbox-circle-fill'></i> */}
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
              <label htmlFor=''>Puesto</label>
              <select
                className={`${errors.puesto && 'danger'} ${styles.input} ${styles.select}`}
                value={inputValue.puesto}
                onChange={handleChange}
                name='puesto'
                disabled
              >
                <option value='supervisor'>Supervisor</option>
                <option value='gerente'>Gerente</option>
                <option value='vendedor'>Vendedor</option>
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
                disabled
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
                disabled
              >
                <option value='Río Cuarto'>Río Cuarto</option>
                <option value='Córdoba'>Córdoba</option>
                <option value='Las Jarillas'>Las Jarillas</option>
              </select>
              {errors.localidad && <p className='danger'>{errors.localidad}</p>}
            </div>

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

export default Cuenta;
