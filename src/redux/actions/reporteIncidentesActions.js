import axios from 'axios';

const reporteIncidentesActions = {
  logIn: (inputsValues) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post('http://localhost:8080/api//flashincidente', inputsValues)
        if (response.data.success === false) {
          alert("Usuario incorrecto")
        }
        if (!response.data.success) {
          return response.data
        }
        dispatch({ type: 'POST_FORM', payload: response.data })

      } catch (err) {
        alert("Hubo un error, reintenta mas tarde.")
      }
    }
  }}
export default reporteIncidentesActions