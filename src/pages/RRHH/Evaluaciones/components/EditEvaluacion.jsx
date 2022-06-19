import React,{useState}  from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Input, Form, Label, Modal, ModalBody, ButtonGroup, Row, Col, Card, CardBody, Button, Table, FormGroup } from "reactstrap"
import { crudActions } from '../../../../actions'
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faArrowLeft, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../../../helpers";
import SelectCargos from "../../Cargos/components/SelectCargos";
import SelectDepartamentos from "../../Departamentos/components/SelectDepartamentos"
import { defaultVal } from "../../../../helpers/funciones"
import { custom } from '../../../../helpers/customStyles'
import Select from "react-select";
import EvaluacionPersona from "../../Personas/components/EvaluacionPersona"

const tipos     = [{"value":"personal","label":"personal"},
                   {"value":"empresa","label":"empresa"},];

const EditEvaluacion = ({getComponent}) => {
  const dispatch = useDispatch() 
  const { item, items } = useSelector(state => state.evaluaciones)  
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
  const almacen = JSON.parse(localStorage.getItem('@userAlmacen'))
  const [view, setview] = useState(false);
  const [puser, setpuser] = useState({
    id:0,
    label:"",
    observaciones:"",
    pExamen:0,
    pExperiencia:0,
    pGeneral:0,
    pPsicologica:0,
  });

  const deleteItem = (pky) => {                
    dispatch(crudActions.GET_DELETE('EVALUACIONES_ITEMS_DATA','evaluacionesp',pky,'lista'))
  };

  const toggleModalView = () => {        
    setview(!view)                  
  };

  const getResumen = (date) => {        
    setpuser(date)
    setview(!view)                  
  };

  const changeHandler = (e) =>{
    const {name, value  } = e.target
    setpuser({
      ...puser,
      [name]: value
    })
  }
  
  const changeHandlers = (prop,value) =>{      
    dispatch(crudActions.SET_CHANGE('EVALUACIONES_CHANGE',prop,value)) 
  }

  const changeHand = (e) =>{          
    const { value } = e
    dispatch(crudActions.SET_CHANGE('EVALUACIONES_CHANGE','tipo',value)) 
  }

  const submitHandle = event => {       
    event.preventDefault()        
    if(item.id)
    {
      dispatch(crudActions.SET_UPDATE('EVALUACIONES_ADD','evaluaciones',item,'unit'))            
    }else{
      dispatch(crudActions.SET_ADD('EVALUACIONES_ADD','evaluaciones',item,'unit'))           
    }            
 }
  

  return (      
      <>
      <Row>        
        <Col md="3" className="btnBack">  
          <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> LISTA EVALUACIONS
          </Button>              
        </Col>  
      </Row>      
      <Row>
        <Col md="3" className="cardCo">
            <Card>        
              <CardBody>
              <h6>Datos Evaluacion</h6> 
              <p><b>EVALUACION Nº : </b> {item.id} </p>               
              <Form onSubmit={submitHandle} >                
                <FormGroup>
                  <Label for="fechaInicio">Fecha Inicio</Label>   
                    <Input
                      id="fechaInicio"
                      name="fechaInicio"                    
                      type="date"
                      value={item.fechaInicio || ''}
                      onChange={ (e) => changeHandlers('fechaInicio',e.target.value)}
                      onInvalid={(e) => e.target.setCustomValidity('El campo fechaInicio es obligatorio !')}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required/>                                        
                </FormGroup>
                <FormGroup>
                  <Label for="fechaVencimiento">Fecha Vencimiento</Label>   
                    <Input
                      id="fechaVencimiento"
                      name="fechaVencimiento"                    
                      type="date"
                      value={item.fechaVencimiento || ''}
                      onChange={ (e) => changeHandlers('fechaVencimiento',e.target.value)}
                      onInvalid={(e) => e.target.setCustomValidity('El campo fechaInicio es obligatorio !')}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required/>                                        
                </FormGroup>  
                <FormGroup>
                  <SelectDepartamentos/>
                </FormGroup>
                <FormGroup>
                  <SelectCargos/>
                </FormGroup>

                <FormGroup>
                <Label for="tipo">Tipo</Label> 
                  <Select
                    defaultValue={tipos[0]}
                    name="tipoId"    
                    id="tipoId"                    
                    options={tipos}      
                    styles={custom}
                    onChange={ (e) => changeHand(e) }                         
                    value={defaultVal(tipos,item.tipo)} 
                  />
                </FormGroup>  
                <FormGroup>
                  <Label for="nombre">Nombre Evaluación</Label>   
                    <Input
                      id="nombre"
                      name="nombre"                    
                      type="text"
                      value={item.nombre || ''}
                      onChange={ (e) => changeHandlers('nombre',e.target.value)}
                      onInvalid={(e) => e.target.setCustomValidity('El campo nombre es obligatorio !')}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required/>                                        
                </FormGroup>              

                <ButtonGroup>
                  <Button 
                    type="submit"
                    className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
                    <FontAwesomeIcon icon={faSave} />  
                    {' '} {item.id ? " Actualizar" : " Guardar"}
                  </Button>
                </ButtonGroup>                      
                </Form>               
              </CardBody>   
            </Card>
        </Col>          
        <Col md="9" className="cardCo">
          <Card>
            <CardBody>
              <EvaluacionPersona/>
            </CardBody>  
          </Card>  
          <Card>
            <CardBody>
              <h6>Personas</h6> 

              <Table className="table-simple">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>                    
                    <th>Fecha</th>
                    <th></th>
                  </tr>
                </thead>  
                { items &&(
                <tbody>
                    {items.map((itt,index)=>(
                      <tr key={index}>
                        <td>{itt.id}</td>
                        <td>{itt.persona || ''}</td>                        
                        <td><Moment format="DD-MM-YYYY">{itt.fechaEvaluacion}</Moment></td>
                        <td>
                        <ButtonGroup>
                          <Button className="btn-tb bg-default text-white"
                            onClick={()=>{ getResumen(itt)}}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button className="btn-tb bg-defaults text-white"
                            onClick={() => { deleteItem(itt.id)}}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>   
                        </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </Table>
            </CardBody>
          </Card>           
        </Col>       
      </Row>


      <Modal isOpen={view} toggle={toggleModalView}>  
        <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <ModalBody>
          <Card>
            <CardBody>
            
          <Row>
            <Col md="8" className="cardCo">
            <Form>
              <FormGroup>
                <Label for="fid">Código</Label>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  value={puser.id}
                  onChange={(e) => changeHandler(e)}
                />
              </FormGroup>              
              <FormGroup>
                <Label for="fnota">Nota</Label>
                <Input
                  id="label"
                  name="label"
                  type="text"
                  value={puser.label || ''}
                  onChange={(e) => changeHandler(e)}
                />
              </FormGroup>              
              <FormGroup>
                <Label for="fid">Puntuación Examen</Label>
                <Input
                  id="pExamen"
                  name="pExamen"
                  type="number"
                  value={puser.pExamen || 0}
                  onChange={(e) => changeHandler(e)}
                />
              </FormGroup>
              <FormGroup>
              <Label for="fexp">Puntuación Experiencia</Label>
                <Input
                  id="pExperiencia"
                  name="pExperiencia"
                  type="number"
                  value={puser.pExperiencia || 0}
                  onChange={(e) => changeHandler(e)}
                />
              </FormGroup>
              <FormGroup>
              <Label for="fpsi">Puntuación Psicológica</Label>
                <Input
                  id="pPsicologica"
                  name="pPsicologica"
                  type="number"
                  value={puser.pPsicologica ||  0}
                  onChange={(e) => changeHandler(e)}
                />
              </FormGroup> 
              <FormGroup>
              <Label for="fid">Puntuación General</Label>
                <Input
                  id="pGeneral"
                  name="pGeneral"
                  type="number"
                  value={puser.pGeneral || 0}
                  onChange={(e) => changeHandler(e)}
                />
              </FormGroup> 
            </Form>              
            </Col>
            <Col md="4" className="cardCo text-center">
              <img          
                className="img-perfil"
                src={api + "/static/images/personas/md/" + puser.foto}
              />
              <h5>{puser.persona}</h5>
            </Col>
          </Row>      
          </CardBody>
          </Card>                     
        </ModalBody>
      </Modal>

      </>
    );
};
export default EditEvaluacion;
