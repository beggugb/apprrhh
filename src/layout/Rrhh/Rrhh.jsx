import React,{ useEffect, useCallback, useState } from "react";
import { css } from "@emotion/react";
import { Route, Switch, NavLink } from "react-router-dom";
import { Row, Col, Button, Nav, Modal, ModalBody, NavItem } from "reactstrap";
import {  useSelector, useDispatch } from "react-redux";
import { usuarioActions, crudActions} from "../../actions"
import { modulos } from "../../route.js";
import MoonLoader from "react-spinners/MoonLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faBell, faEnvelope, faHome, faUsers, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";

import Departamentos from "../../pages/RRHH/Departamentos/DepartamentosView"
import Salarios from "../../pages/RRHH/Salarios/SalariosView"
import Cargos from "../../pages/RRHH/Cargos/CargosView"
import Horarios from "../../pages/RRHH/Horarios/HorariosView"
import Asistentes from "../../pages/RRHH/Registros/AsistenciasView"
import Estructura from "../../pages/SECURITY/Empresa/Estructura"


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const fechaHoy = new Date()
function Rrhh(){
  const dispatch = useDispatch() 
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))        
    const { loading }= useSelector(state => state.usuarios)

    const logoutt = () => {    
      dispatch(usuarioActions.logout())  
    };        
    const getRoutes = (routes) =>{
        return routes.map((prop, key) =>{
            if(prop.layout === '/rrhh'){
                return(
                    <Route
                       path={prop.layout + prop.path}
                       component={prop.component}
                       key={key} 
                    />
                );
            }else{
                return null;
            }
        })
    };
    

    useEffect(() => {        
      let ii ={"pr":"0"}
        dispatch(crudActions.GET_SEARCH('TDCS_TITEM','tdcs',ii))  
        return () => {         
        };
    }, []);

return(
  <div className="wrapper">  
  <div className="main-panel" > 
     <Modal isOpen={loading} className="cargas">          
      <ModalBody className="carga">
        <MoonLoader color="#1fa2f2" loading={loading} css={override} size={30} />                
      </ModalBody>
    </Modal>
    <div className="nav-unity" expand="lg">        
    <div className="sub-unity">
        <div className="left-unity">
        <Row > 
           <Col md="3" className="tico">
            <NavLink                
                to={`/`} className="btn-barra"> 
               <FontAwesomeIcon icon={ faHome } />
            </NavLink>
           </Col> 
        </Row>
        </div> 
        <div className="center-unity">
        <h6>RRHH</h6>  
        </div> 
        <div className="conta-unity">
        <Row className="barraUser">                                                                  
            <Col md={3}>                    
                <p>Usuario: {usuario.username}</p>
            </Col> 
            <Col md={3}>                    
                <p>Fecha: <Moment format="DD/MM/YYYY">{fechaHoy}</Moment></p>
            </Col>                               
          </Row>
        </div>
        <div className="right-unity">
        <Row className="barraUser">                                  
                <Col md={3}> 
                <div className="circulu">
                    <FontAwesomeIcon icon={faEnvelope} />  
                </div>                    
                </Col>
                <Col md={3}> 
                <div className="circulu">
                    <FontAwesomeIcon icon={faBell} />  
                </div>                    
                </Col>
                <Col md={3}> 
                <div className="circulu">
                    <FontAwesomeIcon icon={faQuestion} />  
                </div>                    
                </Col>
                                                         
                <Col md={3} className="text-right"> 
                  <div className="circulu">
                  <Button className="btn-barra" onClick={() => {logoutt()}} >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </Button>                            
                  </div>
                </Col>   
              </Row>   
        </div>  
    </div>
    <Nav> 
          {modulos.map((prop, key) => (  
            prop.layout === '/rrhh' ?
            <NavItem key={key}>  
              <NavLink                
                to={prop.layout + prop.path}
                className="nav-link"
                activeClassName="active">               
                <p> {prop.name}</p>  
                <FontAwesomeIcon icon={prop.icon} className="icon-layout"/>
              </NavLink>
            </NavItem>: null ))
          }      
          </Nav>        
        </div>         

        <Switch>   
          {getRoutes(modulos)}  
          <Route path="/rrhh/departamentos" component={Departamentos} />
          <Route path="/rrhh/salarios" component={Salarios} />          
          <Route path="/rrhh/cargos" component={Cargos} />
          <Route path="/rrhh/horarios" component={Horarios} />                                     
          <Route path="/rrhh/asistentes" component={Asistentes} />
          <Route path="/rrhh/estructuras" component={Estructura} />
        </Switch>             
      </div>        
    </div>    
)    

}
export default Rrhh;

