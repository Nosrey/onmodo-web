import axios from 'axios';

const reporteRechazoActions = {
  logIn: (inputsValues) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post('http://localhost:4000/api/reporterechazo', inputsValues)
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