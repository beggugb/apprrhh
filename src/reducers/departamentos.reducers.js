const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    item:{
      id:'',
      nombre:'',
      abreviacion:'',
      encargado:''    
    },   
  };
  
export function departamentos(state = initialState, action) {
    switch (action.type) {
      case "DEPARTAMENTOS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "DEPARTAMENTOS_ADD":
        return {
          ...state,
          data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            item: initialState.item
        };
      case "DEPARTAMENTOS_ITEM":
          return {
            ...state,
            item: action.response
          };  
      case "DEPARTAMENTOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "DEPARTAMENTOS_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "DEPARTAMENTOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "DEPARTAMENTOS_RESET_DATA":
          return {
            ...state,
            data: [],
            pagina: 0,
            paginas: 0,
            total: 0
        };  
      default:
        return state;
    }
  }
  