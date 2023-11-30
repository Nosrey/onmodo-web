import React from 'react';
import { useState } from 'react';
import styles from './RecoverPassword.module.css';
import logo from '../../assets/image/on-modo-grande.png';
import { restablecerPassword } from '../../services/Request';

function RecoverPassword() {
  const [errors, setErrors] = useState({});
  const [buttonColor, setButtonColor] = useState('#a0b875');
  const [emailValue, setEmailValue] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const resetForm = () => {
    setEmailValue('');
  };

  const validate = () => {
    let errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      errors.email = 'Este campo no puede estar vacío';
    } else if (!emailRegex.test(emailValue)) {
      errors.email = 'Ingresa un correo electrónico válido';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBlur = () => {
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const handleChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (isValid) {
      restablecerPassword(emailValue).then((resp) => {
        setShowMessage(true)
        resetForm();
      })
    } else {
      alert('Ingrese un email válido.')
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {
          showMessage ? 
        <div className={styles.leftWrapper}>
          <h1 className={styles.title}>Revisá tu correo</h1>
          <div className={styles.parrafoContainer}>
            <p>
              Te hemos enviado un correo para restablecer la contraseña de tu cuenta.
            </p>
          </div>
        </div>
          :
          <div className={styles.leftWrapper}>
              <h1 className={styles.title}>Restablecer contraseña</h1>
              <div className={styles.parrafoContainer}>
                <p>
                  Ingresá tu correo para restablecer la contraseña de tu cuenta. Te enviaremos un mail
                  con los nuevos datos.
                </p>
              </div>
              <form className={styles.formulario} onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                  <label htmlFor=''>Correo electrónico</label>
                  <input
                    className={`${errors.email && 'danger'} ${styles.inputRecovery}`}
                    type='email'
                    placeholder='Correo electrónico'
                    onChange={handleChange}
                    name='email'
                    value={emailValue}
                    onBlur={handleBlur}
                  />
                  {errors.email && <p className='danger'>{errors.email}</p>}
                </div>

                <div className={styles.buttonContainer}>
                  <button className={styles.btn} type='submit' style={{ backgroundColor: buttonColor }}>
                    Restablecer
                  </button>
                </div>
              </form>
            </div>
        }
        
        <div className={styles.rightWrapper}>
          <img className={styles.logo} src={logo} alt='Logo On Modo' />
        </div>
      </div>
    </div>
  );
}

export default RecoverPassword;
