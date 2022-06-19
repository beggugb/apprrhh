import React from "react";
import { Row, Col  } from "reactstrap";

import TableDepartamentos from "./components/TableDepartamentos";
import EditDepartamento from "./components/EditDepartamento"
import SubMenu from '../../../components/subRRHH.jsx';
import { RecursosRouter } from '../../../routes'

const DepartamentosView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">              
      <SubMenu items={RecursosRouter} prop='Deptos'/>
         <div className="card-contenidos"> 
         
          <Row>
            <Col md={12} className="marco">
              <EditDepartamento/>
            </Col>            
          </Row>
          <Row>            
            <Col md={12} className="marco">
              <TableDepartamentos/>
            </Col>            
          </Row>

         </div>
      </div>
    </div>    
    </>
  )

};
export default DepartamentosView;
