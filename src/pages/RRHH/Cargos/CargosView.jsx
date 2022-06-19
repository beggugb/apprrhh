import React from "react";
import { Row, Col  } from "reactstrap";

import TableCargos from "./components/TableCargos";
import EditCargo from "./components/EditCargo"
import SubMenu from '../../../components/subRRHH.jsx';
import { RecursosRouter } from '../../../routes'
const CargosView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">    
      <SubMenu items={RecursosRouter} prop='Cargos'/>             
         <div className="card-contenidos"> 
         <Row>
            <Col md={12} className="marco">
            <EditCargo/>
            </Col>                   
         </Row>
         <Row>            
            <Col md={12} className="marco">
            <TableCargos/>
            </Col>            
         </Row>
         </div>
      </div>
    </div>    
    </>
  )

};
export default CargosView;
