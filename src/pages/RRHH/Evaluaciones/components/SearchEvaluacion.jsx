import React,{useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ButtonGroup, Row,Col,Button, Form, Modal, Table, ModalBody, FormGroup, Input, Label, Card, CardBody  } from "reactstrap"
import { crudActions, mailActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCheck, faEnvelope, faEdit, faSearch, faPlus, faTrash, faFilePdf, faCoins, faTimes } from "@fortawesome/free-solid-svg-icons";
import { customs } from '../../../../helpers/customStyles'
import Select from 'react-select'  
import Switch from 'react-switch'
import { defaultVal } from "../../../../helpers/funciones";
import EvaluacionResumen from "./EvaluacionResumen"


const SearchEvaluaciones = ({getComponent}) => {
    const dispatch = useDispatch()    
    const { total, indicador, indicadorTotal, indicadorCantidad, estado}= useSelector(state => state.evaluaciones)
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))
    const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
    const [prop, setProp] = useState('nombre');
    const [value, setValue] = useState("");
    const [view, setview] = useState(false);
    const [viewx, setviewx] = useState(false);
    const [viewz, setviewz] = useState(false);
    const [viewy, setviewy] = useState(false);
    const [cuota, setcuota] = useState(1);
    const [plan, setplan] = useState([]);

    const [contado, setContado] = useState(true);
    const [banco, setBanco] = useState(false);
    const [inicial, setInicial] = useState(false);
    const [pinicial, setPinicial] = useState(0);
    const [nombres, setnombres] = useState("");
    const [email, setemail] = useState("");
    const [observaciones, setobservaciones] = useState("");

    

   const changeSelect = (pky) => {        
      const { value } = pky
      setProp(value)
    };
    
    const submitHandle = event => {       
      event.preventDefault()  
      let iok = {}               
      iok.value = value
      iok.prop  = prop       
      dispatch(crudActions.GET_SEARCH('EVALUACIONES_DATA','evaluaciones',iok))                    
   }  
  
   const onBorrar = () => {            
    dispatch(crudActions.GET_DELETE('EVALUACIONES_DATA','evaluaciones',indicador,'lista'))      
    dispatch({type:'EVALUACIONES_INDICADOR',value:0,estado:'pendiente',indicadorTotal:0})
    setview(false)

  };

  const toggleModalView = () => {        
    setview(!view)                  
  };
  const toggleModalViewx = () => {        
    setviewx(!viewx)      
             
  };

  const toggleModalViewz = () => {        
    setviewz(!viewz)      
             
  };
  const toggleModalViewy = () => {        
    setviewy(!viewy)                   
  };

  const viewArticulo = () => {                    
    dispatch(crudActions.GET_ITEM('EVALUACIONES_ITEM','evaluaciones',indicador))
    setviewz(!viewz)
  }; 



  const aprobarCompra = () => {   
    let dato ={
      "id": indicador,
      "tipo": "compra",      
      "almacenId": 1,
      "estado": "cerrado",      
      "usuarioId" : usuario.id,
      "rolId": usuario.rolId,
      "nroPagos": cuota,
      "total": indicadorTotal,    
      "cantidad" :indicadorCantidad       
    }
           
    let xcode = {
      item: dato,
      items:plan,
      contado:contado,
      banco:banco,
      inicial:inicial,
      cuota:pinicial,
      total:indicadorTotal
    }
    dispatch(crudActions.SET_APROBAR('EVALUACIONES_DATA','evaluaciones/aprobar',xcode,'lista'))     
    dispatch({type:'EVALUACIONES_INDICADOR',value:0,estado:'pendiente',indicadorTotal:0})
    setviewx(false)
  };

  const calcular = () => {         
    let newArray = []
    let diok = false
    let dd = new Date()
    for (let index = 0; index < cuota; index++) {
      if(index === 0 && inicial){
        setPinicial(parseFloat(indicadorTotal)/cuota)
        diok = true
      }
      let iok = {}
      iok.cuota     = index+1
      iok.monto     = parseFloat(indicadorTotal)/cuota
      iok.estado    =  diok
      iok.fechaPago = dd
      iok.mes       = dd.getMonth() + 1
      newArray.push(iok)
      diok = false
    }
    
    setplan(newArray)
}

const onChange = (event,item) => {       

  const {name, value } = event.target    
  let xarray = [...plan]
  for (let index = 0; index < cuota; index++) {
    xarray[item]['fechaPago']= value
    
  }
  setplan(xarray)
};


const enviar = event => {    
  event.preventDefault()             
  let dato ={
    compraId: indicador,
    proveedorId:2,
    email: email,
    nombres : nombres,
    observaciones: observaciones
  }
  dispatch(mailActions.SEND_MAIL('mails/getcotizacion',dato))
  dispatch({type:'EVALUACIONES_INDICADOR',value:0,estado:'pendiente',indicadorTotal:0})
  setnombres('')
  setobservaciones('')
  setemail('')
  setviewy(false)
  
};

    return (                                      
      <>       
      <Card>    
      <Row>
        <Col md={1} >
          <div className="circule">
          <FontAwesomeIcon icon={faShoppingCart} />  
          </div>        
        </Col>    
        <Col md={4} className="cards">
          <ButtonGroup>
                <Button className={indicador !== 0 ? "btl bg-defaults text-white disabled": "btl bg-defaults text-white"}  
                onClick={()=> getComponent('new',1)}><FontAwesomeIcon icon={faPlus}/> </Button>                 
                 <Button className={indicador === 0  || estado === 'cerrado'  ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> getComponent('edit',indicador)}>
                   <FontAwesomeIcon icon={faEdit} /></Button>            
                 <Button className={indicador === 0  || estado === 'cerrado' ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> toggleModalView()}>
                   <FontAwesomeIcon icon={faTrash} /> </Button>                                
                 <Button className={indicador === 0 || estado === "pendiente" ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> viewArticulo()}>
                   <FontAwesomeIcon icon={faFilePdf} /> </Button> 
                 <Button className={indicador === 0  || estado === 'cerrado' ? "btr bg-default text-white disabled": "btr bg-default text-white"} onClick={()=> toggleModalViewx()} >
                   <FontAwesomeIcon icon={faCoins} /></Button>      
               
          </ButtonGroup>
        </Col>        

        <Col md={4} className="cards">
          <Form onSubmit={ submitHandle}> 
            <FormGroup row>                                                          
              <Col md={11}>
                <Input 
                    type="text" 
                    name="value"                                 
                    id="value"  
                    value={ value || '' }  
                    onChange={ (e) => {setValue(e.target.value)}} />   
                    {
                      value ? 
                      <Button className="volatil" onClick={(e) => {setValue('')}}>
                        <FontAwesomeIcon icon={faTimes}   />
                      </Button>
                      : null
                    } 
              </Col>
              <Col md={1}>
                <Button className="btn-primary btn-search">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>  
              </Col>              
          </FormGroup>       
          </Form>               
        </Col>
        <Col md={2}> 
        <p className="mt-3 ml-3" >{ total || 0 } EVALUACIONES</p>          
        </Col>

      </Row>   
      </Card>  
      <Modal isOpen={view} toggle={toggleModalView} className="deleteBody">  
          <ModalBody className="deleteConte">
          <Row>
              <Col md="12" >
              <p className="deletePe">desea borra el registro ?</p>  
              </Col>              
            </Row>
            <Row className="mt-3">
              <Col md="6" className="text-center">
              <Button className="btn-danger deleteCol"  onClick={() => toggleModalView()} >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              </Col>
              <Col md="6" className="text-center">
              <Button className="btn-success deleteCol"  onClick={() => onBorrar()} >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
              </Col>
            </Row>
          </ModalBody>
      </Modal>
     

      <Modal isOpen={viewz} toggle={toggleModalViewz}>  
      <Button className="btn-view btn-danger"  onClick={() => toggleModalViewz()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <EvaluacionResumen/>
          </ModalBody>
      </Modal>


    </>                    
    );
};
export default SearchEvaluaciones;
