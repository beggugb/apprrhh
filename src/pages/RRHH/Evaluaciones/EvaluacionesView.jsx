import React,{useState, useCallback, useEffect} from "react";
import { useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import TableEvaluaciones from "./components/TableEvaluaciones";
import SearchEvaluacion from "./components/SearchEvaluacion";
import EditEvaluacion from "./components/EditEvaluacion";


const Evaluaciones = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  
 


  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':       
          setComponent(<><SearchEvaluacion getComponent={getComponent}/><TableEvaluaciones getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'EVALUACIONES_RESET_RESUMEN'})          
          setComponent(<EditEvaluacion getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('EVALUACIONES_ITEM','evaluaciones',key)) 
          setComponent(<EditEvaluacion getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);



  useEffect(() => {
    getComponent('data',1)

    return () => {
     /* console.log('descarga evaluaciones')*/
    };
  }, []); 

  return(
    <div className="content">     
      <div className="main-contenido">                   
        {component}      
      </div>
    </div>    
  )

};
export default Evaluaciones;
