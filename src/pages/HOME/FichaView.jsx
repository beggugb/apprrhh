import React,{useState, useEffect} from 'react';
import { Row, Col, Button  } from "reactstrap";
import { crudActions } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair, faUsers } from "@fortawesome/free-solid-svg-icons";  
import { usuarioActions} from "../../actions"
import Moment from 'react-moment';

export default function FichaView({setToken}) {
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
  const almacen = JSON.parse(localStorage.getItem('@userAlmacen'))
  const {licencia, estado, message }= useSelector(state => state.empresa)

  const [component, setComponent] = useState();  
  const dispatch = useDispatch()   
  const logoutt = () => {    
    dispatch(usuarioActions.logout())      
  };

  const setFicha = () => {    
    console.log(usuario)
  };
  

useEffect(() => {
 
  return () => {
    dispatch({type:'LICENCIAS_RESET'})
  };
}, []);  
   
  return(
    <div className="pos">
      <div className="contenedor">
        <div className="contenidoCentral">
          <div className="colTop">        
            <Row>
              <Col md="4" >
                { empresa.nombre }
              </Col>                                                                               
            </Row>
          </div>  
            <div className="contenidoFicha">
              <Row>
                <Col md="6" className="fichas">
                    <Button className="ficha" onClick={(e) => { setFicha('normal') }} >
                    <FontAwesomeIcon icon={faUsers} className="btnIas"/>                     
                    </Button>
                </Col>
                <Col md="6" className="fichas">
                <Button className="ficha" onClick={(e) => { setFicha('especial') }} >
                <FontAwesomeIcon icon={faWheelchair} className="btnIas"/>                         
                </Button>
                </Col>
              </Row>           
            </div>           
        </div>              
      </div>
    </div>    
  )
}
