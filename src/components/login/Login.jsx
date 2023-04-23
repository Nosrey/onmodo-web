import * as React from 'react';
import { useState } from 'react';
import styles from './Login.module.css';
import logo from '../../assets/image/on-modo-grande.png';
import { Link } from 'react-router-dom';

function Login(props) {
  const [iconPassword, setIconPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [buttonColor, setButtonColor] = useState('#a0b875');
  const [inputValue, setInputValue] = useState({
    legajo: '',
    contraseña: '',
  });

  // const checkFields = () => {
  //   const values = Object.values(inputValue);
  //   if (values.every((val) => val !== null && val !== undefined && val !== '')) {
  //     setButtonColor('#7bc100');
  //   } else {
  //     setButtonColor('#a0b875');
  //   }
  // };

  const checkFields = () => {
    if (inputValue.legajo && inputValue.contraseña) {
      setButtonColor('#7bc100');
    } else {
      setButtonColor('#a0b875');
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: '' });
  };

  const changeIconPassword = () => {
    setIconPassword(!iconPassword);
  };

  const resetForm = (inputValue) => {
    setInputValue({ ...inputValue, legajo: '', contraseña: '' });
  };

  const validate = (inputValue) => {
    let errors = {};
    if (!inputValue.legajo) errors.legajo = 'Este campo no puede estar vacío';
    if (!inputValue.contraseña) errors.contraseña = 'Este campo no puede estar vacío';
    return errors;
  };

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    checkFields();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValues = { ...inputValue, [e.target.name]: e.target.value };
    setErrors(validate(formValues));
    if (Object.keys(validate(formValues)).length === 0) {
      alert('se envio correctamente');
      resetForm();
    }
  };
  const [btnPassword, setBtnPassword] = useState(false);
  const recoverPassword = () => {
    setBtnPassword(!btnPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          <span className={styles.nivel}>Nivel 1</span>
          <h1 className={styles.titleLogin}>Ingresá a tu cuenta</h1>
          <form className={styles.formLogin} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <label htmlFor=''>Legajo o DNI</label>
              <input
                className={`${errors.contraseña && 'danger'} ${styles.inputLogin}`}
                type='number'
                placeholder='Legajo o DNI'
                onChange={handleChange}
                name='legajo'
                value={inputValue.legajo}
                onBlur={handleBlur}
              />
              {errors.legajo && <p className='danger'>{errors.legajo}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor=''>Contraseña</label>
              <div className={styles.inputContraseñaCont}>
                <input
                  className={`${errors.contraseña && 'danger'} ${styles.inputLogin}`}
                  type={iconPassword ? 'text' : 'password'}
                  placeholder='Contraseña'
                  onChange={handleChange}
                  name='contraseña'
                  value={inputValue.contraseña}
                  onBlur={handleBlur}
                />
                {iconPassword ? (
                  <i
                    style={{ position: 'absolute', right: '20px', bottom: '5px' }}
                    class='ri-eye-line'
                    onClick={changeIconPassword}
                  ></i>
                ) : (
                  <i
                    style={{ position: 'absolute', right: '20px', bottom: '5px' }}
                    class='ri-eye-off-line'
                    onClick={changeIconPassword}
                  ></i>
                )}
              </div>
              {errors.contraseña && <p className='danger'>{errors.contraseña}</p>}
            </div>
            <div className={styles.buttonContainer}>
              <button type='submit' style={{ backgroundColor: buttonColor }}>
                Ingresar
              </button>
              <label htmlFor='' onClick={recoverPassword}>
                <Link to={`/restablecer-contrasena`}>Olvidé mi contraseña</Link>
              </label>
            </div>
          </form>
        </div>
        <div className={styles.rightWrapper}>
          <img className={styles.logo} src={logo} alt='Logo On Modo' />
        </div>
      </div>
    </div>
  );
}

export default Login;
