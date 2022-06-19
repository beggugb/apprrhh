import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { custom } from '../../../../helpers/customStyles'
import { Label, FormGroup } from "reactstrap"
import Select from "react-select";
import { defaultVal } from "../../../../helpers/funciones"

const SelectDepartamentos = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.departamentos)
    const { item } = useSelector(state => state.evaluaciones)

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('DEPARTAMENTOS_LISTA','departamentos','nombre','asc'))          
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0    
        dispatch(crudActions.SET_CHANGE('EVALUACIONES_CHANGE','departamentoId',io))        
    }     
    
    useEffect(() => {
       makeHttpRequestWithPage()
        return () => {
            
        };
    }, []);

    return (              
        <FormGroup> 
        <Label for="departamentos">Departamentos</Label>
        <Select
            defaultValue={data[0]}
            name="departamentoId"    
            id="departamentoId"                    
            options={data} 
            styles={custom}
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,parseInt(item.departamentoId))} 
        />    
        </FormGroup>                                             
    );
};
export default SelectDepartamentos;
