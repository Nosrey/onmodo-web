const initialState = {
    userLogged: null
  }
  
  const controlComensalesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOG_USER':
        return {
          ...state,
          userLogged: action.payload
        }
      case 'LOG_OUT':
        return {
          ...state,
          userLogged: null
        }
      case 'FORGOT_PASS':
        return {
          ...state,
        }
      default:
        return state
    }
  }
  
  export default controlComensalesReducer