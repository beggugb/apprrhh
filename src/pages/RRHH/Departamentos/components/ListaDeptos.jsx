import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import {Table, Card, ListGroup, ListGroupItem, Badge  } from "reactstrap";


const ListaDeptos = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.departamentos)   
    

    const makeHttpRequestWithPage = () =>{
        dispatch(crudActions.GET_LIST('DEPARTAMENTOS_LISTA','departamentos','nombre','asc'))                  
      }
    
    const getAsistentes =(depto) =>{        
        dispatch(crudActions.GET_ITEM('ASISTENTES_LISTA','registros',depto)) 
      }     
    
    useEffect(() => {
        makeHttpRequestWithPage()
        return () => {            
        };
    }, []);
    
    return (   
      <>          
        <Card>
        <h6>Departamentos</h6>
            <Table className="table-simple">          
            {data && (
                <tbody>
                    {data.map((item,index) => (
                        <tr key={index} onClick={()=> { getAsistentes(item.id)}} >
                            <td>{item.nombre}</td>                                
                        </tr>  
                        ))}
                </tbody>
            )}
            </Table>
        </Card>        
    </>
    );
};
export default ListaDeptos;
