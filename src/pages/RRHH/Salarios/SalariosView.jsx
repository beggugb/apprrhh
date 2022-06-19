import React from "react";
import { Row, Col  } from "reactstrap";

import TableSalarios from "./components/TableSalarios";
import EditSalario from "./components/EditSalario"
import SubMenu from '../../../components/subRRHH.jsx';
import { RecursosRouter } from '../../../routes'
const SalariosView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">          
      <SubMenu items={RecursosRouter} prop='Salarios'/>
         <div className="card-contenidos"> 
         <Row>
          <Col md={12} className="marco">
              <EditSalario/>
          </Col>                     
         </Row>
         <Row>            
          <Col md={12} className="marco">
            <TableSalarios/>
          </Col>            
         </Row>
         </div>
      </div>
    </div>    
    </>
  )

};
export default SalariosView;
