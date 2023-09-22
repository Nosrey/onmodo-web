const initialState = {
    formulario: null,
  };
  
  const formularioReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FORMULARIO':
        return { ...state, formulario: action.payload };
      default:
        return state;
    }
  };
  
  export default formularioReducer;