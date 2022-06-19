import React,{useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { crudActions } from '../../../../actions'  
import {  
    Row,
    Col,
    Card,
    CardBody,
    ListGroup, ListGroupItem,
    Form,
    Button, FormGroup, Input, Label, Modal, ModalBody, Table
  } from "reactstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faSearch, faTimes, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const EvaluacionPersona = () => {
    const dispatch = useDispatch()   
    const [modalView, setmodalView] = useState(false); 
    const { data  } = useSelector(state => state.personas) 
    const { item, items }  = useSelector(state => state.evaluaciones) 
    const [prop, setProp] = useState('nombres');
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false); 
    const [name, setName] = useState('');
   
    const toggleModalView = () => {    
        let est = modalView === true ? false : true;             
        setmodalView(est)                          
    };

   
    const search = event => {       
        event.preventDefault()  
        let iok = {}               
        iok.value = value
        iok.prop  = prop
        dispatch(crudActions.GET_SEARCH('PERSONAS_DATA','personas',iok))              
        setOpen(true)
     } 

    useEffect(() => {        
    
        return () => {
          dispatch({type:'PERSONAS_RESET'})   
        };
      }, []);

    const asignar = (itu) => {            
        let nn = itu.paterno +' '+ itu.materno +', '+ itu.nombres        
        let itemEvaluacion = {          
          evaluacionId : item.id,
          persona: nn,
          personaId: itu.id,
          fechaEvaluacion : new Date() 
        }          
        setName(nn)
        setOpen(false)
        dispatch(crudActions.SET_ADD('EVALUACIONES_ITEMS_DATA','evaluacionesp',itemEvaluacion,'unit'))    
        /*dispatch(crudActions.GET_DELETE('EVALUACIONES_ITEMS_DATA','evaluacionesp',pky,'lista'))        */
        clearInput()
    };
    const add = () => {    
        
    };  
    const clearInput = () => {
        setName('')
        setOpen(false)        
    } 
    const changeHandler = event => {    
        const { value } = event.target  
        setName(value)      
    } 
    console.log(data)
    return (                      
      <>
      <Row form>                      
        <Col md={6}>
            <FormGroup>   
            <Label for="eNombre">Nombres</Label>                 
              <Input 
                  type="text" 
                  name="name"                             
                  id="name"  
                  value={name || ''}  
                  onChange={changeHandler} />
                   {
                    name ? 
                    <Button className="volatil" onClick={(e) => {clearInput()}}>
                        <FontAwesomeIcon icon={faTimes}   />
                    </Button>
                    : null} 
            </FormGroup>
        </Col>
        <Col md={1}>
            <FormGroup>   
                <Button className="btn-primary btn-search mt-3"
                    onClick={search}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>  
            </FormGroup>
        </Col>
        <Col md={1}>
            <Button className="btn-rd btn-danger mt-3"
                onClick={() => add() }>
                <FontAwesomeIcon icon={faArrowDown} />                          
            </Button>
        </Col>
        </Row>  
       
       { open ?              
                <Card className="resultArt">           
                  <CardBody>
                    {data &&
                    <ListGroup>
                      {data.map(item =>(
                        <ListGroupItem
                          key={item.id}
                          onClick={() => asignar(item) }
                        >
                        <b>{item.ci}</b> - {item.paterno} {item.materno} , {item.nombres}  
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                    }
                  </CardBody>  
                </Card>           
              : null}   
       </>
    );
};
export default EvaluacionPersona;
