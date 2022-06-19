const initialState = {
  data: [],
  pagina: 0,
  paginas: 0,
  total: 0,  
  modalView: false,
  indicador:0,
  estado: 'pendiente',
  indicadorTotal:0.00,
  indicadorCantidad:0,  
  items:[],  
  item:{
    id:'',      
    fechaInicio: new Date(),
    fechaVencimiento: new Date(),
    nombres:'',
    tipo:'',
    estado:'transcripcion',
    cargoId:0,    
    departamentoId:1,
    cargo:{
      id:'',
      nombre:''
    },
    departamento:{
      id:'',
      nombre:''
    }
  }   
};

export function evaluaciones(state = initialState, action) {
  switch (action.type) {  
    case "EVALUACIONES_DATA":
        return {
          ...state,
          data: action.response.data,
          pagina: action.response.pagina,
          paginas: action.response.paginas,
          total: action.response.total
    };
    case "EVALUACIONES_ITEMS_DATA":
        return {
          ...state,
          items: action.response
    };

    case "EVALUACIONES_INDICADOR":
        return {
          ...state,
          indicador: action.value,
          estado: action.estado,
          indicadorTotal: action.indicadorTotal,
          indicadorCantidad: action.cantidad
        }; 
    case "EVALUACIONES_PLAN_RESET":
      return {
        ...state,
        plan: []
    };
    case "EVALUACIONES_PLAN":
      return {
        ...state,
        plan: action.values
      };
     case "EVALUACIONES_VIEW":
      return {
        ...state,
        modalView: action.view
      }; 
      case "EVALUACIONES_ITEM":
        return {
          ...state,
          item: action.response.evaluacion,            
          items: action.response.personas      

      };  
      case "EVALUACIONES_RESET_RESUMEN":
        return {
          ...state,
          item: initialState.item,
          items: [],
          nota: initialState.nota,
          plan: []
      }; 
             
      case "EVALUACIONES_RESET_DATA":
        return {
          ...state,            
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0,
          indicador: 0,
          estado:false,
          indicadorTotal: 0
        }; 
      case "EVALUACIONES_CHANGE":
        return {          
        ...state,
        item:
        {...state.item,
          [action.props]: action.value
        }
      };
    case "EVALUACIONES_ADD":
      return {
        ...state,
        item: action.response        
      };       
    case "EVALUACIONES_RESET_ITEM":
      return {
        ...state,
        item: initialState.item,
        indicador: 0,
        estado:false,
        indicadorTotal: 0,
        pitems: []
      };
    case "EVALUACIONES_RESET_ITEMS":
        return {
          ...state,
          items: [],
          nota: initialState.nota,
          plan: []
          
    };  
    case "EVALUACIONES_RESET":
      return {
        ...state,
        item: initialState.item,
        data: [],
        pagina: 0,
        paginas: 0,
        total: 0,
        indicador: 0,
        estado:false,
        indicadorTotal: 0
      };
      case "EVALUACIONES_ITEM_VIEWS":
          return {
            ...state,
            item: initialState.item,
            modalView: false
          };
      case "EVALUACIONES_ITEM_VIEW":
          return {
            ...state,
            item: action.response,
            modalView: true
          };          
      case "EVALUACIONES_LISTA":
            return {
              ...state,
              data: action.response
            };     

    
    case "EVALUACIONES_SET_ITEMS":
          return {
            ...state,
            items: action.values            
      };
    case "EVALUACIONES_SET_PROVEEDORES":
        return {
          ...state,
          pitems: action.values,
      }; 
      
    default:
      return state;
  }
}
