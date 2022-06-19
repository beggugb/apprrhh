import React,{useState, useEffect, useCallback} from "react";
import { ButtonGroup, FormGroup, Label, Table, Row, Col, Button, Card, CardBody, CardFooter  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../../components/Pagination'
import { customStyles } from '../../../../helpers/customStyles'
import Select from 'react-select' 
const page =[{"value":15,"label":"15"},
             {"value":30,"label":"30"},
             {"value":50,"label":"50"}             
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            }      


const TableDepartamentos = () => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(15);
   const {data,pagina,paginas}= useSelector(state => state.departamentos)

   const makeHttpRequestWithPage =(page, num) =>{
    dispatch(crudActions.GET_DATA('DEPARTAMENTOS_DATA','departamentos',page, num,'nombre','asc'))      
  }

  const deleteItem = (pky) => {                
    dispatch(crudActions.GET_DELETE('DEPARTAMENTOS_ADD','departamentos',pky,'lista'))
  };
  const getItem = (pky) => {                
    dispatch(crudActions.GET_ITEM('DEPARTAMENTOS_ITEM','departamentos',pky))
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
        dispatch({type:'DEPARTAMENTOS_RESET_DATA'})   
      };
  }, []);

  const changeSelect = (pky) => {        
    const {value, label} = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
  };
  
  return(
    <>    
    <Row>
      <Col>
        <Card>
          <CardBody>    
        <Table className="table-simple">
          <thead>
              <tr>  
                  <th width="10%">Código</th>
                  <th width="45%">Nombre</th>                                           
                  <th width="10%">Abreviación</th>
                  <th width="25%">Encargado</th>
                  <th width="10%"></th>                
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item,index) => (
                      <tr key={index}>                      
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>                        
                        <td>{item.abreviacion}</td>
                        <td>{item.encargado}</td>
                        <td>
                        <ButtonGroup>
                          <Button className="btn-tb bg-default text-white"
                            onClick={() => { getItem(item.id)}}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button className="btn-tb bg-defaults text-white"
                            onClick={() => { deleteItem(item.id)}}>
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
        <CardFooter>
        <Row>                                            
              <Col md={6} >
                  <Pagination
                    makeHttpRequestWithPage={ makeHttpRequestWithPage }              
                    paginas={paginas}
                    current= {pagina} 
                    pagina= {pag}
                  />
              </Col>          
              <Col md={4}>                  
              </Col>
              <Col md={2}>   
                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>Mostrar</Label>
                  <Col sm={7}>
                      <Select                 
                        styles={customStyles}                                              
                        defaultValue={page[0]}
                        name="pag"    
                        id="pag"                    
                        options={page}      
                        isClearable={false}                          
                        value={defaultVal(page,pag)}    
                        onChange={ (e) => changeSelect(e)}                                             
                      />
                  </Col>
                  </FormGroup>
              </Col>    
          </Row>
          </CardFooter> 
        </Card>  
      </Col>
    </Row>       
</>      
  )

};
export default TableDepartamentos;
