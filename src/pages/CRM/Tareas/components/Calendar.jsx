import React, { useEffect, useState, useRef } from "react";
import { FormGroup, Label, Input, Row, Col, Modal, ModalBody, Button  } from "reactstrap";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, {DateClickArg, Draggable} from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { getMes, getMeses, defaultVal } from '../../../../helpers/funciones'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSave, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

const Calendar = () => {  
  const dispatch = useDispatch()
  const {data}  = useSelector(state => state.tareas)   
  const [modalView, setmodalView] = useState(false);
  const [modalViews, setmodalViews] = useState(false);  
  const [tareaId, settareaId] = useState(0);
  const [fecha, setfecha] = useState('');
  const [titulo, settitulo] = useState('');
  const [count, setcount] = useState(1);  
  const user = JSON.parse(localStorage.getItem('@userUnity'))
  const calendarRef = useRef()

  const makeHttpRequestWithPage = (xredux) =>{
    const {desde, hasta } = getMes()        
    let dato = {}
    dato.usuarioId = user.id
    dato.start = desde
    dato.end = hasta
    dato.inicio = desde
    dato.fin = hasta    
    dispatch(crudActions.SET_ADD_LOAD(xredux,'tareas',dato,'lista'))  
  }
  
  const handleView = (it) => {         
      settareaId(it.event.id)        
      settitulo(it.event.title)          
      setmodalViews(true)            
  }

useEffect(() =>{            
  makeHttpRequestWithPage('TAREAS_DATA','tareas');          
  return () =>{            
    dispatch({type:'TAREAS_RESET'})
};
}, []);

const handleClick = (e) =>{  
  /*console.log(e.dateStr);*/
  setmodalView(true)
  setfecha(e.dateStr)
  console.log(e.dateStr)

}

const submitHandle = () =>{
  let iFecha = new Date() 
  const {desde, hasta } = getMeses(((iFecha.getMonth()+count)-1),iFecha.getFullYear())  
  let iok ={
      usuarioId: user.id,
      start: fecha,
      end: fecha,
      inicio: desde,
      fin: hasta,
      title: titulo,
      backgroundColor: "#1fa2f2"
    }
  dispatch(crudActions.SET_ADD_SINGLE('TAREAS_ADD','tareas',iok))   
  iok = {}
  handleClear()
}
const submitUpdate = () =>{
  let iFecha = new Date() 
  const {desde, hasta } = getMeses(((iFecha.getMonth()+count)-1),iFecha.getFullYear())  
  let iok ={
    id: tareaId,
    usuarioId: user.id,      
    inicio: desde,
    fin: hasta,
    backgroundColor: "#1cb84a"
  }
  /*dispatch(crudActions.SET_UPDATE('TAREAS_ADD','tareas',iok))   */
  dispatch(crudActions.SET_UPDATE('TAREAS_ADD','tareas',iok,'unit')) 
  iok = {} 
  handleClear()
}

const deleteHandle = () =>{  
  /*const {desde, hasta } = getMes()  */
  let iFecha = new Date() 
  const {desde, hasta } = getMeses(((iFecha.getMonth()+count)-1),iFecha.getFullYear())  
  let iok ={
      tareaId: tareaId,
      usuarioId: user.id,      
      inicio: desde,
      fin: hasta
    }
  dispatch(crudActions.GET_SEARCH('TAREAS_ADD','tareas',iok))   
  iok = {} 
  handleClear()
}

const handleClear = () =>{
    settitulo('')
    setfecha('')
    settareaId(0)
    setmodalView(false)
    setmodalViews(false)
}

const toggleModalView = () => {    
  handleClear()
};
const toggleModalViews = () => {    
  handleClear()
};

const nexData = () =>{  
  let iFecha = new Date()  
  setcount(count+1)  
  const {desde, hasta } = getMeses((iFecha.getMonth()+count),iFecha.getFullYear())      
  //
  let dato = {}
  dato.usuarioId = user.id
  dato.start = desde
  dato.end = hasta
  dato.inicio = desde
  dato.fin = hasta    
  dispatch(crudActions.SET_ADD_LOAD('TAREAS_DATA','tareas',dato,'lista'))  
}
const prevData = () =>{  
  let iFecha = new Date()  
  const {desde, hasta } = getMeses((iFecha.getMonth() + count)-2,iFecha.getFullYear())  
  setcount(count-1)    
  //
  let dato = {}
  dato.usuarioId = user.id
  dato.start = desde
  dato.end = hasta
  dato.inicio = desde
  dato.fin = hasta    
  dispatch(crudActions.SET_ADD_LOAD('TAREAS_DATA','tareas',dato,'lista'))  
}

const handleNext = () =>{
  nexData()
  let calendarApi = calendarRef.current.getApi()  
  calendarApi.next()
  
}
const handlePrev = () =>{
  prevData()
  let calendarApi = calendarRef.current.getApi()    
  calendarApi.prev()
}
return(
  <div className="registroCalendario">  
  <FullCalendar     
        ref={calendarRef} 
     		locales={[ esLocale]}  
     		locale= {'es'}            
        timeZone={'America/La_Paz'}
        navLinks={true}
        height={540}        
     		plugins={[  dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        defaultView="dayGridMonth"                        
        header={{
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridDay'
            }}
     		events= { data }                                   
        eventClick={handleView}        
        dateClick={handleClick}           
        customButtons={{
          prev:{              
              click: function(){                              
                handlePrev()
             }
          },
          next:{              
            click: function(){                              
              handleNext()
           }
          }
        }}     
  />

  <Modal isOpen={modalView} toggle={toggleModalView} className="deletuBody">
    <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
      <FontAwesomeIcon icon={faTimes} />
      </Button>
      <ModalBody className="deletuConte">        
        <Row form>
          <Col md={12} className="det">   
            <FormGroup>
              <Label for="titulo">Detalle</Label>
                <Input
                    id="title"
                    name="title"                    
                    type="textarea"
                    value={titulo || ''}
                    onChange={ (e) => settitulo(e.target.value)}                                 
                    />
            </FormGroup>
          </Col>
        </Row>  
        <Row>
          <Col md={12} className="det">
            <Button             
              className={titulo === '' ? "btn-md disabled btn-info mt-2":"btn-md btn-info mt-2"}
              onClick={submitHandle}>
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </Col>
        </Row> 
      </ModalBody>
  </Modal>
  <Modal isOpen={modalViews} toggle={toggleModalViews} className="deletuBody">
    <Button className="btn-view btn-danger"  onClick={() => toggleModalViews()} >
      <FontAwesomeIcon icon={faTimes} />
      </Button>
      <ModalBody className="deletuConte">         
        <h6>Detalle</h6>   
        <Row form>
          <Col md={12} className="det">               
            {titulo}
          </Col>          
        </Row> 
        <Row form>
          <Col md={6} className="det mt-2">               
            <Button             
              className="btn-md btn-success mt-2"
              onClick={submitUpdate}>
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </Col>
          <Col md={6} className="det">               
            <Button             
              className="btn-md btn-danger mt-2"
              onClick={deleteHandle}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Col>          
        </Row> 
      </ModalBody>
  </Modal>
  </div>
)
}


export default Calendar