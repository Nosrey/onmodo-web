import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './Login.module.css';
import logo from '../../assets/image/on-modo-grande.png';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/Request';

function Login() {
  const [iconPassword, setIconPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [buttonColor, setButtonColor] = useState('#a0b875');
  const [validateBtn, setValidateBtn] = useState(true);
  const [btnPassword, setBtnPassword] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    legajo: '',
    contraseña: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(inputValue);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const data = {
        legajo: inputValue.legajo,
        password: inputValue.contraseña
      }
      login(data).then((resp) => {
        if (resp.success) {
          setErrors({});
          resetForm();
          localStorage.setItem("rol", resp.response.rol);
          localStorage.setItem("business", resp.response.business);
          localStorage.setItem("idChief", resp.response.idChief);
          localStorage.setItem("idUser", resp.response.id);
          navigate('/inicio');
        } else {
          setInvalidCredentials(true)   
        }
      })
  
    }
  };

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
                className={`${errors.legajo && 'danger'} ${styles.inputLogin}`}
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
              {invalidCredentials && <p className='danger'>Credenciales incorrectas</p>}
            </div>
            <div className={styles.buttonContainer}>
              <button
                disabled={validateBtn}
                className={styles.btn}
                type='submit'
                style={{ backgroundColor: buttonColor }}
              >
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
