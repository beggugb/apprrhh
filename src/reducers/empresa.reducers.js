const initialState = {      
    item:{
      id:'',
      nombre:'',
      direccion:'',
      web:'',
      email:'',
      filename:'',
      nit:'',
      registro:'',
      smtpHost:'',
      smtpUser:'',
      smtpPassword:'',
      smtpSecure:'',
      smtpPort:'',
      licencia:'',
      labelCotizacion:'',
      garantiaCotizacion:'',
      politicaCotizacion:'',
      pais:'',
      moneda:'',
      labelMoneda:'',
    },
    licencia:{
      id:'',
      licencia:'',
      fechaVencimiento:'',
      nombres:''    
    },
    estado:false,
    message:''   ,
    estructura:[] 
  };
  
export function empresa(state = initialState, action) {
    switch (action.type) {
      case "ESTRUCTURA_LISTA":
            return {
              ...state,
              estructura: action.response
            };
            
      case "ESTRUCTURA_LISTA_RESET":
          return {
            ...state,
            estructura: []
        };      
      case "EMPRESA_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };    
            
      case "LICENCIAS_RESET":
          return {
            ...state,
            licencia: initialState.licencia,
            estado: false,
            message: ''
          };      
      case "EMPRESA_LICENCIA":
          return {
            ...state,
            licencia: action.response.result.cliente,
            estado: action.response.result.estado,
            message: action.response.message
          };    
      case "EMPRESA_ITEM":
          return {
              ...state,
              item: action.response
         };         
      case "EMPRESA_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };      
      default:
        return state;
    }
  }
  