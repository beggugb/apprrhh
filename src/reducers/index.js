import { combineReducers } from "redux";
import { reducer as toastrReducer } from 'react-redux-toastr';
import { usuarios } from "./usuarios.reducers";
import { empresa } from "./empresa.reducers";
import { tareas } from "./tareas.reducers";
import { procesos } from "./procesos.reducers";
import { users } from "./users.reducers";
import { salarios } from "./salarios.reducers";
import { personas } from "./personas.reducers";
import { horarios } from "./horarios.reducers";
import { estudios } from "./estudios.reducers";
import { experiencias } from "./experiencias.reducers";
import { contratos } from "./contratos.reducers";
import { cargos } from "./cargos.reducers";
import { departamentos } from "./departamentos.reducers"
import { registros } from "./registros.reducers"
import { evaluaciones } from "./evaluaciones.reducers"

const rootReducer = combineReducers({
    usuarios,    
    evaluaciones,
    registros,
    departamentos,    
    cargos,
    contratos,
    experiencias,
    estudios,    
    horarios,
    personas,    
    salarios,    
    users,    
    procesos,    
    tareas,        
    empresa,        
    toastr: toastrReducer
});

export default rootReducer;