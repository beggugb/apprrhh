import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { custom } from '../../../../helpers/customStyles'
import Select from "react-select";
import { Label, FormGroup } from "reactstrap"
import { defaultVal } from "../../../../helpers/funciones"

const SelectCargos = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.cargos)
    const { item } = useSelector(state => state.evaluaciones)

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.GET_LIST('CARGOS_LISTA','cargos','nombre','asc'))          
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0    
        dispatch(crudActions.SET_CHANGE('EVALUACIONES_CHANGE','cargoId',io))        
    }     
    
    useEffect(() => {
       makeHttpRequestWithPage()
        return () => {
            
        };
    }, []);


    return (              
        <FormGroup> 
        <Label for="cargos">Cargos</Label>
        <Select
            defaultValue={data[0]}
            name="cargoId"    
            id="cargoId"                    
            options={data}      
            styles={custom}
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,item.cargoId)} 
        />    
        </FormGroup>                                             
    );
};
export default SelectCargos;
