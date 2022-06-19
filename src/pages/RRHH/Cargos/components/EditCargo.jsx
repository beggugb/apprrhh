import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row,Col,Form, FormGroup, Input, Label,Card, CardBody, Button  } from "reactstrap"
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import SelectDepartamento from "../../Departamentos/components/SelectDepartamento";

const EditCargo = () => {
    const dispatch = useDispatch()  
    const item = useSelector(state => state.cargos.item)   

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('CARGOS_CHANGE',name,value))  
    }
      
    const submitHandle = event => {       
        /*event.preventDefault()        */
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('CARGOS_ADD','cargos',item,'lista'))            
        }else{
          dispatch(crudActions.SET_ADD('CARGOS_ADD','cargos',item,'lista'))           
        }   
       
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'CARGOS_RESET_ITEM'})        
      };
    }, []); 
     
    return (                    
      <Card>        
        <CardBody>            
          <Row form>
            <Col md={5}>
              <SelectDepartamento/>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="enombre">Nombre</Label>
                <Input type="text" name="nombre" id="enombre" 
                  value={item.nombre || ''}                          
                  onChange={ (e) => changeHandler(e)}                 
                  required/>    
              </FormGroup> 
            </Col>
            <Col md={2}>
              <Button 
                type="button"
                onClick={() => {submitHandle()}}
                className={item.id ?"btn-xs btn-warning mt-4" : "btn-xs btn-info mt-4"}>
                <FontAwesomeIcon icon={faSave} />  
                {' '} {item.id ? " Actualizar" : " Registrar"}
              </Button>
            </Col>  
          </Row>  
        </CardBody>                      
      </Card> 
                                   
    );
};
export default EditCargo;
