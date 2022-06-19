import React,{useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input,  ButtonGroup, FormGroup, Label, Table, Row, Col, Button, Card, CardBody, CardFooter  } from "reactstrap";
import { crudActions } from '../../../actions'
import { api } from "../../../helpers";
import SubMenu from '../../../components/subRRHH.jsx';
import { AsistenciaRouter } from '../../../routes'
import ListaDepartamentos from '../../RRHH/Departamentos/components/ListaDepartamentos'

const AsistenciasView = () => {      
  const dispatch = useDispatch() 
  const { item, asistentes }= useSelector(state => state.registros)

  const makeHttpRequestWithPage =(depto) =>{
    /*dispatch(crudActions.GET_DATA('DEPARTAMENTOS_DATA','departamentos',page, num,'nombre','asc'))      */
    dispatch(crudActions.GET_ITEM('ASISTENTES_LISTA','registros',depto)) 
  }
    
  useEffect(() => {
    makeHttpRequestWithPage(1)
    return () => {
      dispatch({type:'ASISTENTES_RESET_DATA'})   
    };
}, []);
  return(
    <>    
    <div className="content">     
      <div className="main-contenido">     
      <SubMenu items={AsistenciaRouter} prop='Asistentes'/>            
         <div className="card-contenidos"> 
         <Row>
            <Col md={2}>
              <ListaDepartamentos/>
            </Col>
            <Col md={10} className="card-contenido-productos">             
            {asistentes.map((item,index) => (              
                <Card key={index} className="articulo">                          
                <div className="nombre"><b>{item.departamento}</b></div>
                    <img
                    alt="artículo"
                    className="img-articulo"
                    src={api + "/static/images/personas/md/" + item.filename}
                    />                          
                <div className="nombre">{item.nombre}</div>                                                        
            </Card>
            ))} 
            </Col>            
         </Row>         
        </div>
      </div>   
    </div>    
    </>
  )

};
export default AsistenciasView;
