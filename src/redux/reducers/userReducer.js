const initialState = {
  userLogged: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_USER':
      localStorage.setItem('token', action.payload.response.token)
      localStorage.setItem('business', action.payload.response.business)
      return {
        ...state,
        userLogged: action.payload
      }
    case 'LOG_OUT':
      localStorage.clear()
      return {
        ...state,
        userLogged: null
      }
    case 'FORGOT_PASS':
      localStorage.clear()
      return {
        ...state,
      }
    default:
      return state
  }
}

export default userReducer