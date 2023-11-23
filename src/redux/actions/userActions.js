// import { Alert } from '@mui/material'

import axios from 'axios';

export const validateUser = (values) => async (dispatch) => {
  try {
    const response = await axios.post('https://api.onmodoapp.com/api/login', values);
    console.log(response);
    if (response.data.success === true) {
      dispatch({ type: 'VALIDATE_USER_SUCCESS' });
      localStorage.setItem('token', response.data.response.token);
      localStorage.setItem('business', response.data.response.business);
      return true;
    } else {
      dispatch({ type: 'VALIDATE_USER_FAILURE' });
      return false;
    }
  } catch (error) {
    dispatch({ type: 'VALIDATE_USER_FAILURE' });
    return false;
  }
};

// const userActions = {

//   register: (newUser) => {
//     return async (dispatch, getState) => {
//       try {
//         const response = await axios.post('https://api.onmodoapp.com/api/register', newUser)
//         if (response.data.success === false) {
//           alert("Este usuario ya se encuentra registrado")
//         }
//         if (!response.data.success) {
//           return response.data
//         }
//         dispatch({ type: 'LOG_USER', payload: response.data })
//       } catch (err) {
//         alert("Hubo un error, reintenta mas tarde.")
//       }
//     }
//   },

//   logIn: (user) => {
//     return async (dispatch, getState) => {
//       try {
//         const response = await axios.post('https://api.onmodoapp.com/api/login', user)
//         if (response.data.success === false) {
//           alert("Usuario incorrecto")
//         }
//         if (!response.data.success) {
//           return response.data
//         }
//         dispatch({ type: 'LOG_USER', payload: response.data })

//       } catch (err) {
//         alert("Hubo un error, reintenta mas tarde.")
//       }
//     }
//   },

//   logInFromLS: (token) => {
//     return async (dispatch, getState) => {
//       try {
//         const response = await axios.post('https://api.onmodoapp.com/api/login/ls', { token }, { // Se agrega el token, porque no se puede poner un .post sin cuerpo (donde esta el token)!
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         })
//         dispatch({ type: 'LOG_USER', payload: { response: { ...response.data.response } } })
//       } catch (err) {
//         // Evalua el estado del error 401 (unauthorized)
//         alert("Unauthorized")
//         if (err.response.status === 401) {
//           alert("You are not allowed to access this page.")
//           localStorage.clear()
//           return true
//         }
//       }
//     }
//   },

// forgotPassword: (user) => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await axios.post('http://api.tienda.delivery/api/forgotpassword', user)
//       console.log(response)
//       if (response.data.success === false) {
//         toast.error('Ingresa un correo valido 📨', {
//           style: {
//             border: '1px solid #FF0000',
//             padding: '16px',
//             color: '#000000',
//           },
//           iconTheme: {
//             primary: '#FF0000',
//             secondary: '#FFFAEE',
//           },

//         })
//       } else if (response.data.success === true) {
//         toast.success('Revisa tu correo, el email fue enviado 📨', {
//           style: {
//             border: '1px solid #0CFF00',
//             padding: '16px',
//             color: '#000000',
//           },
//           iconTheme: {
//             primary: '#0CFF00',
//             secondary: '#FFFAEE',
//           },

//         });
//       }

//       if (!response.data.success) {
//         return response.data
//       }

//       dispatch({ type: 'FORGOT_PASS', payload: response.data })

//     } catch (err) {
//       console.log(err)
//       toast.error('Ocurrio un error, estamos solucionandolo!', {
//         style: {
//           border: '1px solid #FF0000',
//           padding: '16px',
//           color: '#000000',
//         },
//         iconTheme: {
//           primary: '#FF0000',
//           secondary: '#FFFAEE',
//         },
//       });
//     }
//   }
// },

// resetPassword: (user, token) => {

//   return async (dispatch, getState) => {
//     console.log(user, token)
//     try {
//       const response = await axios.post('http://api.tienda.delivery/api/forgotpassword/' + token, user)
//       console.log(response)
//       if (response.data.success === false) {
//         toast.error('El token es invalido, reenvie su mail.', {
//           style: {
//             border: '1px solid #FF0000',
//             padding: '16px',
//             color: '#000000',
//           },
//           iconTheme: {
//             primary: '#FF0000',
//             secondary: '#FFFAEE',
//           },

//         })
//       } else if (response.data.success === true) {
//         toast.success('La contraseña se cambio, exitosamente! 👍', {
//           style: {
//             border: '1px solid #0CFF00',
//             padding: '16px',
//             color: '#000000',
//           },
//           iconTheme: {
//             primary: '#0CFF00',
//             secondary: '#FFFAEE',
//           },

//         });
//       }

//       if (!response.data.success) {
//         return response.data
//       }

//       dispatch({ type: 'FORGOT_PASS', payload: response.data })

//     } catch (err) {
//       console.log(err)
//       toast.error('Ocurrio un error, estamos solucionandolo!', {
//         style: {
//           border: '1px solid #FF0000',
//           padding: '16px',
//           color: '#000000',
//         },
//         iconTheme: {
//           primary: '#FF0000',
//           secondary: '#FFFAEE',
//         },
//       });
//     }
//   }
// },

//   logOut: () => {
//     return (dispatch, getState) => {
//       dispatch({ type: 'LOG_OUT' })
//     }
//   },
// }
// export default userActions
