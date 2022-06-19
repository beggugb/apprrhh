import React,{useState, useEffect} from 'react';
import { Row, Col, Button  } from "reactstrap";
import { crudActions } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserCircle, faMoneyCheck, faBoxOpen, faPeopleCarry, faHeadset, faCashRegister, faChartLine, faSignOutAlt, faCogs, faChartBar } from "@fortawesome/free-solid-svg-icons";  
import { usuarioActions} from "../../actions"
import Moment from 'react-moment';

export default function InicioView({setToken}) {
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
  const almacen = JSON.parse(localStorage.getItem('@userAlmacen'))
  const {licencia, estado, message }= useSelector(state => state.empresa)

  const [component, setComponent] = useState();  
  const dispatch = useDispatch()   
  const logoutt = () => {    
    dispatch(usuarioActions.logout())      
  };
  


useEffect(() => {
  
  return () => {
    /*dispatch({type:'LICENCIAS_RESET'})*/
  };
}, []);  
   
  return(
    <div className="pos">
      <div className="contenedor">
        <div className="contenidoCentral">
          <div className="colTop">        
            <Row>
              <Col md="5" >
                { empresa.nombre }
              </Col>                                          
              <Col md="4">
                Licencia : { empresa.licencia }
              </Col>
              <Col md="3">
                Vencimiento : <Moment format="DD/MM/YYYY" >{ empresa.fechaVencimiento }</Moment> 
              </Col>                                         
            </Row>
          </div>  
            <div className="contenidoLeft">
            <Row>
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                  
                </div>                
              </Col>
              <Col md="4" className="colCentral">
              <div className="btnMenus">
                  
              </div>  
              </Col>
              <Col md="4" className="colCentral">
              <div className="btnMenus">
              
              </div>
              </Col>
            </Row>
            <Row>
              <Col md="4" className="colCentral">              
                <div className="btnMenus">
              
                </div>              
              </Col>

              <Col md="4" className="colCentral">
              <div className="btnMenus">
                    <Link to="/rrhh/inicio" className="btnMenu">
                      <FontAwesomeIcon icon={faUsers} className="btnIa"/>                     
                    </Link>
                    <p>RRHH</p> 
                </div>              
              </Col>

              <Col md="4" className="colCentral">
                <div className="btnMenus">
                 
                </div>
              </Col>
            </Row>
            <Row>              
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                 
                </div>
              </Col>
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                 
                </div>
              </Col>
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                 
                </div>
              </Col>
            </Row>
            </div>
            <div className="contenidoRight">
              <Row>
                <Col className="cRimagen">
                <FontAwesomeIcon icon={faUserCircle} className="btnCr"/> 
                </Col>
              </Row>
              <Row>
                <Col className="cRtext">
                 <b>Nombre :</b>
                </Col>
              </Row>  
              <Row>
                <Col className="cRtext">
                { usuario.nombres} 
                </Col>
              </Row>
              <Row>
                <Col className="cRtext">
                <b> Rol:</b>
                </Col>                
              </Row>  
              <Row>
                <Col className="cRtext">
                 { usuario.rol.nombre} 
                </Col>
              </Row>
              <Row>
                <Col className="cRtext">
                <b> Sucursal :</b>
                </Col>
              </Row>  
              <Row>
                <Col className="cRtext">
                 { almacen.nombre} 
                </Col>
              </Row>
              <Row>
                <Col className="cRtext">
                <b> Dirección :</b>
                </Col>
              </Row>  
              <Row>
                <Col className="cRtext">
                 { almacen.ubicacion} 
                </Col>
              </Row>
              <Row>
                <Col className="mt-4">
                  <Button className="btn-sm btn-danger" onClick={() => {logoutt()}} >
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-white"  />
                  </Button> 
                </Col>
              </Row>
            </div>
        </div>              
      </div>
    </div>    
  )
}
