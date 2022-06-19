import React,{useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input,  ButtonGroup, FormGroup, Label, Table, Row, Col, Button, Card, CardBody, CardFooter  } from "reactstrap";
import { crudActions } from '../../../actions'
import { api } from "../../../helpers";
import SubMenu from '../../../components/subRRHH.jsx';
import { AsistenciaRouter } from '../../../routes'

const RegistrosView = () => {      
  const dispatch = useDispatch() 
  const { item }= useSelector(state => state.registros)
  const [ci, setci] = useState(0)
  
  const submitHandle = event => {       
    event.preventDefault()        
    let itt={
      ci: ci
    }
    dispatch(crudActions.SET_ADD('REGISTROS_ADD','registros',itt,'unit'))    
    setci(0)
 } 
 useEffect(() => {  
  return () => {
    dispatch({type:'REGISTROS_RESET_ITEM'})   
  };
}, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">     
      <SubMenu items={AsistenciaRouter} prop='Registro'/>            
         <div className="card-contenidos"> 
         <Row>
            <Col md={4} className="marco">
              <Row>
                <Col className="img-persona">
                  <img className="img-personas" src={api + "/static/images/personas/lg/" + item.persona.filename} />
                </Col>
              </Row>              
              <Row>
                <Col md={2} className="marcas">
                  <Label for="enombre"><b>C.I.</b> </Label>
                </Col>
                <Col md={9} className="marcas">
                  <Form onSubmit={ submitHandle} className="mb-3">                  
                  <Input
                    id="ci"
                    name="ci"                    
                    type="text"
                    value={ci || ''}
                    onChange={ (e) => setci(e.target.value)}                                                                       
                  />
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col md={8} className="marco">
              <Row>
                <Col className="table-personas">
                  <Table className="table-persona">         
                    <tbody>              
                      <tr>                      
                        <td width="30%">Nombres: </td>
                        <td width="70%">{item.persona.nombres || ''} </td>
                      </tr>
                      <tr>                       
                        <td width="30%">Apellido Paterno: </td>
                        <td width="70%">{item.persona.paterno || ''} </td>
                      </tr>
                      <tr>                      
                        <td width="30%">Apellido Materno: </td>
                        <td width="70%">{item.persona.materno || ''} </td>
                      </tr>
                      <tr>                      
                        <td width="30%">C.I: </td>
                        <td width="70%">{item.persona.ci || ''} </td>
                      </tr>
                      <tr>                      
                        <td width="30%">Departamento </td>
                        <td width="70%">{item.persona.ci || ''} </td>
                      </tr>                                      
                    </tbody>          
                  </Table>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md="3" className="registroL"> Ingreso </Col>
                <Col md="3" className="registroL"> Salida </Col>
                <Col md="3" className="registroL"> Ingreso </Col>
                <Col md="3" className="registroL"> Salida </Col>
              </Row>
              <Row>
                <Col md="3" className="registroM"> {item.r1} </Col>
                <Col md="3" className="registroM"> {item.r2} </Col>
                <Col md="3" className="registroM"> {item.r3} </Col>
                <Col md="3" className="registroM"> {item.r4} </Col>
              </Row>
            </Col>            
         </Row>         
        </div>
      </div>   
    </div>    
    </>
  )

};
export default RegistrosView;
