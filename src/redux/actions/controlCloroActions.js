import axios from 'axios';

const controlCloroActions = {
  logIn: (inputsValues) => {
    return async (dispatch, getState) => {
      try {
        console.log("action",inputsValues)
        const response = await axios.post('http://localhost:4000/api/controlcloro', inputsValues)
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
export default controlCloroActions