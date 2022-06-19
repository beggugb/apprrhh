import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Form, FormGroup, Input, Label,Card, CardBody, Button  } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const EditDepartamento = () => {
    const dispatch = useDispatch()  
    const item = useSelector(state => state.departamentos.item)   

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('DEPARTAMENTOS_CHANGE',name,value))  
    }
      
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('DEPARTAMENTOS_ADD','departamentos',item,'lista'))            
        }else{
          dispatch(crudActions.SET_ADD('DEPARTAMENTOS_ADD','departamentos',item,'lista'))           
        }   
       
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'DEPARTAMENTOS_RESET_ITEM'})        
      };
    }, []); 
     
    return (              
      <Row>
      <Col>
        <Card>        
            <CardBody>            
            <Form onSubmit={ submitHandle}>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="enombre">Nombre</Label>
                        <Input type="text" name="nombre" id="enombre" 
                          value={item.nombre || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>                                    
                
                  <Col md={3}>
                    <FormGroup>
                      <Label for="enombre">Abreviación</Label>
                        <Input type="text" name="abreviacion" id="abreviacion" 
                          value={item.abreviacion || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo abreviación es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>                                    
                
                  <Col md={3}>
                    <FormGroup>
                      <Label for="enombre">Encargado</Label>
                        <Input type="text" name="encargado" id="encargado" 
                          value={item.encargado || ''}                          
                          onChange={ (e) => changeHandler(e)} 
                          onInvalid={(e) => e.target.setCustomValidity('El campo encargado es obligatorio !')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          required
                          />    
                    </FormGroup>    
                  </Col>                                    
                               
                  <Col md={2}>
                    <Button 
                    type="submit"
                    className={item.id ?"btn-xs btn-warning mt-4" : "btn-xs btn-info mt-4"}>
                    <FontAwesomeIcon icon={faSave} />  
                    {' '} {item.id ? " Actualizar" : " Registrar"}
                    </Button> 
                  </Col>
                </Row>                 
            </Form> 
            </CardBody>                      
          </Card> 
      </Col>    
    </Row>                                             
    );
};
export default EditDepartamento;
