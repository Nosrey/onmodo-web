import axios from 'axios';

const reporteRechazoActions = {
  logIn: (inputsValues) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post('https://api.onmodoapp.com/api/reporterechazo', inputsValues)
        if (response.data.success === false) {
          alert("Usuario incorrecto")
        }
        dispatch({ type: 'POST_FORM', payload: response.data })

      } catch (err) {
        alert("Hubo un error, reintenta mas tarde.")
      }
    }
  }}
export default reporteRechazoActions