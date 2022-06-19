const initialState = {
    data: [],
    asistentes:[],
    pagina: 0,
    paginas: 0,
    total: 0,
    item:{
      id:'',
      fecha:'',
      r1:"00:00",
      d1:"0",      
      r2:"00:00",
      d2:"0",
      r3:"00:00",
      d3:"0",
      r4:"00:00",
      d4:"0",
      persona:{
          id:'',
          nombres:'',
          paterno:'',
          materno:'',
          ci:'',
          filename:'default.jpg'
      }

    },   
  };
  
export function registros(state = initialState, action) {
    switch (action.type) {
      case "REGISTROS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "REGISTROS_ADD":
        return {
          ...state,          
          item: action.response
        };
      case "REGISTROS_ITEM":
          return {
            ...state,
            item: action.response
          };

      case "REGISTROS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "REGISTROS_LISTA":
            return {
              ...state,
              data: action.response
            };
      case "ASISTENTES_LISTA":
          return {
            ...state,
            asistentes: action.response
      }; 
      case "ASISTENTES_RESET_DATA":
          return {
            ...state,
            asistentes: []
      };                      
      case "REGISTROS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "REGISTROS_RESET_DATA":
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
  