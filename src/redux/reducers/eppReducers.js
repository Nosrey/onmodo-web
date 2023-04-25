const initialState = {
    inputsValues: null
  }
  
  const eppReducer = (state = initialState, action) => {
    console.log(action.payload)
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
  
  export default eppReducer