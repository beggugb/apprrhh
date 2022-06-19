import React, { useRef, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from "../../../../helpers";
import { Table,Col,Row,Button } from "reactstrap";
import ReactToPrint from "react-to-print";
import Moment from 'react-moment'
import QRCode from "qrcode.react";
import GoogleMapReact from 'google-map-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const fechaHoy = new Date()
const LocationPin = ({ text }) => (
  <>      
  <FontAwesomeIcon icon={faMapMarkerAlt} className="pini"/>
  
  </>
  
)

export class ComponentToPrint extends React.PureComponent {     
  render() {    
    console.log(this.props.data.latitude)
    console.log(this.props.data.longitude)
    return (
      <>
    <div className="reporte">     
      <div className="report-header">        
          <Row className="crl">
            <Col md={12}>
             <h6 className="text-center pio"> <b>Evaluación # <b>{this.props.data.id}</b></b></h6>
             <h5 className="text-center pio"> {this.props.data.nombre}</h5>
             <h5 className="text-center pio"> TIPO : {this.props.data.tipo}</h5>             
            </Col>            
          </Row>
      </div>
      <div className="report-body mt-2">        
        <Row>
          <Col md={9} className="report-card">
            <Table className="table-reporteh mt-2">
              <tbody>
                  <tr><td width="40%"><b>Fecha Inicio :</b></td>
                      <td><Moment format="DD-MM-YYYY">{this.props.data.fechaInicio}</Moment></td></tr>
                  <tr><td width="40%"><b>Fecha Vencimiento :</b></td>
                      <td><Moment format="DD-MM-YYYY">{this.props.data.fechaVencimiento}</Moment></td></tr>
                  <tr><td><b>Estado :</b></td>
                      <td >{this.props.data.estado}</td></tr>
                  <tr><td><b>Cargo :</b></td>
                      <td>{this.props.data.cargo.nombre || ''}</td></tr>
                  <tr><td><b>Departamento :</b></td>
                      <td >{this.props.data.departamento.nombre || ''}</td>
                  </tr>          
        </tbody>
        </Table>
        </Col>
        
        <Col md={3} className="report-card">          
          <Row>
            <Col className="text-center report-qr">
                <QRCode value={'http://localhost:3000/clientes'+this.props.data.codigo} style={{  backgroundColor:'#fff', padding:5, border: 'solid 1px #eaeaea', marginRight: 5 }}/>
            </Col>
        </Row>                    
      </Col>
    </Row>

    <Row>
      <Col>
        <Table className="table-reportesh">
          <thead>
            <tr>
              <th width="10%">Fecha</th>
              <th width="30%">Nombre</th>
              <th width="30%">Materno</th>
              <th width="30%">Paterno</th>                            
            </tr>
          </thead>
          {this.props.datas &&(
            <tbody>
              {this.props.datas.map((item,index)=>(
                <tr key={index}>
                  <td><Moment format="DD-MM-YYYY">{item.fechaEvaluacion}</Moment></td>
                  <td>{item.persona.nombres || ''}</td>
                  <td>{item.persona.paterno || ''}</td>
                  <td>{item.persona.materno || ''}</td>
                </tr>
              ))}  
            </tbody>          
          )}
        </Table>
      </Col>
    </Row>
  </div>
      <div className="report-footer">        
          <Row>
            <Col md="5">           
              <p>Usuario: {this.props.user.nombres}</p>
            </Col>
            <Col md="7">           
              <p>Fecha y hora de emisión: {'  '}
              <Moment format="DD/MM/YYYY">{fechaHoy}</Moment> {'  '}
              <Moment format="HH:mm:ss">{fechaHoy}</Moment></p>
            </Col>            
          </Row>  
                  
      </div>
    </div>  
    </> 
    );
  }
}


function EvaluacionResumen () {    
const dispatch = useDispatch()
const { item, items } = useSelector(state => state.evaluaciones)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
      dispatch({type:'EVALUACIONES_RESET_ITEM'})
    };
  }, []);
return(
    <div className="creporte">
        <ReactToPrint
            trigger={() => <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>}
            content={() => componentRef.current}        
        />
        <ComponentToPrint
            ref={componentRef}                      
            data={item}
            datas={items}            
            user={usuario}
        />
    </div>
     )
}


export default EvaluacionResumen