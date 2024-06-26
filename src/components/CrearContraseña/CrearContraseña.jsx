import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './CrearContraseña.module.css';
import logo from '../../assets/image/on-modo-grande.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios, { Axios } from 'axios';
import { createPassword } from '../../services/Request';

function CrearContraseña() {
  const [iconPassword, setIconPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [buttonColor, setButtonColor] = useState('#a0b875');
  const [validateBtn, setValidateBtn] = useState(true);
  const [btnPassword, setBtnPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const [inputValue, setInputValue] = useState({
    contraseña: '',
    contraseñarep: '',
  });
  const password = inputValue.contraseña

  // Datos para crear cuenta
  // {
  //   "email":"mayef31829@tiuas.com",
  //   "business":"asdaaaaaasdasdsadas",
  //   "puesto":"teasdst",
  //   "rol":1,
  //   "fullName":"joaquin giorgis",
  //   "number":"11322321211234209497",
  //   "legajo":"1231222123123",
  //   "provincia":"cordoba",
  //   "localidad":"cordoba",
  //   "contratoComedor":"test"
  // }
  

  const handleBlur = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: '' });
  };

  const changeIconPassword = () => {
    setIconPassword(!iconPassword);
  };

  const resetForm = (inputValue) => {
    setInputValue({ ...inputValue, contraseña: '', contraseñarep: '' });
  };

 const validate = (inputValue) => {
  let errors = {};
  if (!inputValue.contraseña) errors.contraseña = 'Este campo no puede estar vacío';
  if (!inputValue.contraseñarep) errors.contraseñarep = 'Las contraseñas deben coincidir';
  if (inputValue.contraseña !== inputValue.contraseñarep) 
    errors.contraseña = 'Las contraseñas deben coincidir';
  console.log(errors)
  return errors;
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setInputValue((prevState) => ({ ...prevState, [name]: value }));
};

  useEffect(() => {
    const validationErrors = validate(inputValue);
    if (Object.keys(validationErrors).length === 0) {
      setValidateBtn(false);
      setButtonColor('#7bc100');
    } else {
      setValidateBtn(true);
      setButtonColor('#a0b875');
    }
  }, [inputValue]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate(inputValue);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      createPassword(token, password)
      resetForm();
      navigate('/inicio-de-sesion');
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          <h1 className={styles.titleLogin}>Creá tu contraseña</h1>
          <form className={styles.formLogin} onSubmit={handleSubmit}>
           
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
            <div className={styles.inputContainer}>
              <label htmlFor=''>Repetir contraseña</label>
              <div className={styles.inputContraseñaCont}>
                <input
                  className={`${errors.contraseña && 'danger'} ${styles.inputLogin}`}
                  type={iconPassword ? 'text' : 'password'}
                  placeholder='Repetir Contraseña'
                  onChange={handleChange}
                  name='contraseñarep'
                  value={inputValue.contraseñarep}
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
              <button
                
                className={styles.btn}
                type='submit'
                style={{ backgroundColor: buttonColor }}
              >
                Crear
              </button>
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

export default CrearContraseña;
