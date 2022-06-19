import React from "react";
import { Card, Row, Col  } from "reactstrap";
import Calendar from "../CRM/Tareas/components/Calendar"
const InicioView = () => {  
  return(
    <>    
    <div className="content">        
      <div className="main-contenido">             
      <Row>
        <Col md="12">          
           <Calendar/>   
        </Col>              
      </Row>
      </div>
    </div>    
    </>
  )

};
export default InicioView;
