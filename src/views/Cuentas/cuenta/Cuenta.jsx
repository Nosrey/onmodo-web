import styles from './Cuenta.module.css';
import React, { useEffect, useState } from 'react';
import perfil from '../../../assets/image/perfil.png';
import placeholder from '../../../assets/image/download.png';
import {
  createNewUSer,
  editUser,
  getLocalidades,
  getProvincias,
  getUserInfo,
} from '../../../services/Request';
import { useLocation } from 'react-router-dom';
import { PUESTOS_N1, PUESTOS_N2 } from '../../../components/shared/constants/Puestos';
import ImageUploader from '../../../components/ImgUploader/ImgUploader';
import Alert from '../../../components/shared/components/Alert/Alert';
import { useParams } from 'react-router-dom';

function Cuenta() {
  const idUser = localStorage.getItem('idUser');
  const myRol = localStorage.getItem('rol');
  const location = useLocation();
  const { legajo } = useParams();

  const [errors, setErrors] = useState({});
  const [editInput, setEditInput] = useState(true);
  const [btnEdit, setBtnEdit] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [srcImage, setSrcImage] = useState();
  const [puestoOptions, setPuestoOptions] = useState(PUESTOS_N1);
  const [provinciasOptions, setProvinciasOptions] = useState([]);
  const [localidadesOptions, setLocalidadesOptions] = useState([]);
  const [isANewProfile, setIsANewProfile] = useState(true);
  const [hidePuestos, setHidePuestos] = useState(false);
  const [nivelOptions, setNivelOptions] = useState();
  const [cleanImageInput, setCleanImageInput] = useState(false);
  const [hideOptions, setHideOptions] = useState(false);

  //** ALERTA */
  const [textAlert, setTextAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [showAlert, setShowlert] = useState(false);

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
    if (e.target.name === 'nivel' && myRol === "4") {
      setInputValue({ ...inputValue, [e.target.name]: e.target.value , puesto: 'sin asignar'} );
    } else {
      setInputValue({ ...inputValue, [e.target.name]: e.target.value });

    }
    if (e.target.name === 'provincia') {
      const idProvSeleccionada = provinciasOptions.find(
        (item) => item.nombre === e.target.value
      ).id;
      getLocalidades(idProvSeleccionada).then((resp) => setLocalidadesOptions(resp));
    }
  };

  const disabledInputs = () => {
    setEditInput(false);
    setBtnEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === '/cuenta') {
      const dataEdited = {
        number: inputValue.celular,
        email: inputValue.email
      };
      if (inputValue.imgProfile) {
        dataEdited['imgProfile'] = inputValue.imgProfile;
      }
      editUser(dataEdited)
      .then((resp) => {
        if (!resp.message.includes('successfully')) {
          setTextAlert('Ocurrió un problema');
          setTypeAlert('error');
        } else {
          setTextAlert('Cuenta actualizada con éxito');
          setTypeAlert('success');
          setBtnEdit(!btnEdit);
          setInputValue({
            nombre: resp.updatedForm.fullName,
            legajo: resp.updatedForm.legajo,
            email: resp.updatedForm.email,
            celular: resp.updatedForm.number,
            nivel: resp.updatedForm.rol,
            puesto: resp.updatedForm.puesto,
            localidad: resp.updatedForm.localidad,
            provincia: resp.updatedForm.provincia,
            contrato: resp.updatedForm.contratoComedor,
            imgProfile: resp.updatedForm.imgProfile,
          });
          setEditInput(true);
        }
        })
        .catch((error) => {
          setTextAlert('Ocurrió un problema');
          setTypeAlert('error');
        })
        .finally(() => {
          showAlertAnimation();
        });
    } else {
      const validationErrors = validate(inputValue);
      console.log(inputValue.imgProfile);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        setErrors({});
        const data = {
          email: inputValue.email,
          fullName: inputValue.nombre,
          legajo: inputValue.legajo,
          number: inputValue.celular,
          puesto: inputValue.puesto,
          contratoComedor: inputValue.contrato,
          rol: inputValue.nivel,
          business: localStorage.getItem('business'),
          provincia: inputValue.provincia,
          localidad: inputValue.localidad,
          // idChief,
          // imgProfile: inputValue.imgProfile
        };
        if (inputValue.imgProfile !== undefined) {
          data['imgProfile'] = inputValue.imgProfile;
        }

        createNewUSer(data)
          .then((resp) => {
            if (!resp.success) {
              setTextAlert('Ocurrió un problema');
              setTypeAlert('error');
            } else {
              setTextAlert('Cuenta creada con éxito');
              setTypeAlert('success');
              setBtnEdit(!btnEdit);
              setEditInput(true);
            }
          })
          .catch((error) => {
            setTextAlert('Ocurrió un problema');
            setTypeAlert('error');
          })
          .finally(() => {
            showAlertAnimation();
          });
        setCleanImageInput(true);
        setInputValue({
          nombre: '',
          legajo: '',
          email: '',
          celular: '',
          nivel: myRol === '2' ? '1' : '',
          puesto: '',
          localidad: '',
          provincia: '',
          contrato: '',
        });
        setLocalidadesOptions([]);
      }
    }
  };

  const showAlertAnimation = () => {
    setShowlert(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setTimeout(() => {
      setShowlert(false);
    }, 7000);
  };

  const getInfo = (idUser) => {
    getUserInfo(idUser).then((resp) => {
      setInputValue({
        nombre: resp[0].fullName,
        legajo: resp[0].legajo,
        email: resp[0].email,
        celular: resp[0].number,
        nivel: resp[0].rol,
        puesto: resp[0].puesto,
        localidad: resp[0].localidad,
        provincia: resp[0].provincia,
        contrato: resp[0].contratoComedor,
        imgProfile: resp[0].imgProfile,
      });
      getProvincias().then((provs) => {
        setProvinciasOptions(provs);
        const idProvSeleccionada = provs.find((item) => item.nombre === resp[0].provincia).id;
        getLocalidades(idProvSeleccionada).then((resp) => setLocalidadesOptions(resp));
      });
      setSrcImage(perfil);
      setIsANewProfile(false);
    });
  }

  useEffect(() => {
    if (location.pathname === '/crear-cuenta')
      getProvincias().then((resp) => setProvinciasOptions(resp));
    if(location.pathname.includes('perfil-legajo') && legajo) {
      getInfo(legajo);
      setHideOptions(true);
    }
    if (location.pathname === '/cuenta') {
      getInfo(idUser)
    } else {
      setInputValue({
        nombre: '',
        legajo: '',
        email: '',
        celular: '',
        nivel: myRol === '2' ? '1' : '',
        puesto: '',
        localidad: '',
        provincia: '',
        contrato: '',
      });
      setSrcImage(placeholder);
      setIsANewProfile(true);
      setNivelOptions(myRol === '3' ? ['1', '2'] : ['1', '2', '3']);
      setPuestoOptions(myRol === '2' ? PUESTOS_N1 : PUESTOS_N2);
    }
  }, []);

  useEffect(() => {
    if (inputValue && inputValue.nivel === '1') {
      setPuestoOptions(PUESTOS_N1);
      setHidePuestos(false);
    } else if (inputValue && inputValue.nivel === '2') {
      setPuestoOptions(PUESTOS_N2);
      setHidePuestos(false);
    } else if (inputValue && inputValue.nivel === '3') {
      setHidePuestos(true);
    }
  }, [inputValue]);

  return (
    <div className={styles.container}>
      {showAlert && <Alert type={typeAlert} text={textAlert}></Alert>}
      {inputValue && (
        <div className={styles.wrapper}>
          <ImageUploader
            uploadPhoto={handleChange}
            photo={inputValue.imgProfile}
            cleanImageInput={cleanImageInput}
            setCleanImageInput={setCleanImageInput}
            disabled={editInput}
          />
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
              {(isANewProfile && myRol === '2') || !isANewProfile ? (
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
              ) : (
                <div className={styles.inputContainer}>
                  <label htmlFor=''>Nivel</label>
                  <select
                    className={`${errors.nivel && 'danger'} ${styles.input} ${styles.select}`}
                    value={inputValue.nivel}
                    onChange={handleChange}
                    name='nivel'
                    disabled={!isANewProfile}
                  >
                    <option value='' selected hidden>
                      - Seleccione -
                    </option>
                    {nivelOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.nivel && <p className='danger'>{errors.nivel}</p>}
                </div>
              )}

              {!hidePuestos && (
                <div className={styles.inputContainer}>
                  <label htmlFor=''>Puesto</label>
                  <select
                    className={`${errors.puesto && 'danger'} ${styles.input} ${styles.select}`}
                    value={inputValue.puesto}
                    onChange={handleChange}
                    name='puesto'
                    disabled={!isANewProfile}
                  >
                    <option value='' selected hidden>
                      - Seleccione -
                    </option>
                    {puestoOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.puesto && <p className='danger'>{errors.puesto}</p>}
                </div>
              )}

              <div className={styles.inputContainer}>
                <label htmlFor=''>Provincia</label>
                <select
                  className={`${errors.provincia && 'danger'} ${styles.input} ${styles.select}`}
                  value={inputValue.provincia}
                  onChange={handleChange}
                  name='provincia'
                  disabled={!isANewProfile}
                >
                  <option value='' selected hidden>
                    - Seleccione -
                  </option>
                  {provinciasOptions.map((option, index) => (
                    <option key={index} value={option.nombre}>
                      {option.nombre}
                    </option>
                  ))}
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
                  <option value='' selected hidden>
                    - Seleccione -
                  </option>
                  {localidadesOptions.map((option, index) => (
                    <option key={index} value={option.nombre}>
                      {option.nombre}
                    </option>
                  ))}
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
              {isANewProfile ? (
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
              ) : (
                !hideOptions && <div className={styles.btnContainer}>
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
              )}
            </form>
          </div>
        </div>
      )}
      {/* <footer className={styles.footer}>
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
      </footer> */}
    </div>
  );
}

export default Cuenta;
