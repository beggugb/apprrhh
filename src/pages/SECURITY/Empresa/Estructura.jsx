import React,{useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalBody, Form, Input,  ButtonGroup, FormGroup, Label, Table, Row, Col, Button, Card, CardBody, CardFooter  } from "reactstrap";
import { crudActions } from '../../../actions'
import SubMenu from '../../../components/subRRHH.jsx';
import { RecursosRouter } from '../../../routes'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle, faTimesCircle, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import ContratoResumen from "../../RRHH/Contratos/components/ContratoResumen";

const Estructura = () => {      
  const dispatch = useDispatch() 
  const { estructura }= useSelector(state => state.empresa)  
  const [view, setview] = useState(false);

  const makeHttpRequestWithPage =(depto) =>{        
    dispatch(crudActions.GET_LIST('ESTRUCTURA_LISTA','empresas','nombre','asc'))
  }

  const onResumen = (pky) =>{   
    if(pky){
      setview(true)
      dispatch(crudActions.GET_ITEM('CONTRATOS_ITEM','contratos',pky))
    } 
    
  }

  const toggleModalView = () => {        
    setview(!view)                  
  };
    
  useEffect(() => {
    makeHttpRequestWithPage(1)
    return () => {
      dispatch({type:'ESTRUCTURA_LISTA_RESET'})   
    };
}, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">     
      <SubMenu items={RecursosRouter} prop='Estructura'/>          
         <div className="card-contenidd"> 
         <Row>                 
            <Col md={12} className="card-contenido-deptos">             
            {estructura.map((item,index) => (              
            <div key={index} className="raiz">     
              <h5>{item.nombre}</h5>
              <p className="text-center">
              <FontAwesomeIcon icon={faArrowDown} />
              </p>
              {item.cargos.map((ii,index)=>(                    
                <div className="nodo" key={index} onClick={(e) =>{onResumen(ii.contratoId)}}>                 
                 <h6>{ii.nombre}</h6>                 
                 <FontAwesomeIcon className={ ii.estado ? "farVerde":"farRojo" } icon={ ii.estado ? faCheckCircle : faTimesCircle  } />                                   
                </div>                   
              ))}
            </div>                
            ))} 
            </Col>            
         </Row>         
        </div>
        <Modal isOpen={view} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <ContratoResumen/>
          </ModalBody>
        </Modal>
      </div>   
    </div>    
    </>
  )

};
export default Estructura;
