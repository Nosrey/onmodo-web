const initialState = {
    inputsValues: null
  }
  
  const armadoFraccionamientoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'POST_FORM':
        return {
          ...state,
          inputsValues: action.payload
        }
      default:
        return state
    }
  }
  
  export default armadoFraccionamientoReducer