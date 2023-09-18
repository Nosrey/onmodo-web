import axios from 'axios';

const cargaRecepcionActions = {
  logIn: (inputsValues) => {
    return async (dispatch, getState) => {
      try {
        console.log("action",inputsValues)
        const response = await axios.post('https://api.onmodoapp.com/api/carga', inputsValues)
        console.log("response", response.data)
        if (response.data.success === false) {
          alert("Usuario incorrecto")
        }
        /* if (!response.data.success) {
          return response.data
        } */
        dispatch({ type: 'POST_FORM', payload: response.data })

      } catch (err) {
        alert("Hubo un error, reintenta mas tarde.")
      }
    }
  }}
export default cargaRecepcionActions