import { faFileArchive, faBuilding, faIndustry,  faCoins, faCopy, faFileAlt, faChartLine, faCashRegister, faMoneyCheckAlt, faBoxes, faCompressAlt , faBoxOpen, faStore, faUserTag, faPeopleArrows, faMoneyBill,  faUsers, faTachometerAlt, faMoneyCheck, faHandHoldingUsd, faHeadphones, faCogs } from "@fortawesome/free-solid-svg-icons";

import Usuarios from "./pages/SECURITY/Usuarios/UsuariosView"
import Sucursales from "./pages/SECURITY/Sucursales/SucursalesView"
import Empresa from "./pages/SECURITY/Empresa/EditEmpresa"

import RRHHInicio from "./pages/RRHH/InicioView"
import Personas from "./pages/RRHH/Personas/PersonasView"
import Contratos from "./pages/RRHH/Contratos/ContratosView"
import Departamentos from "./pages/RRHH/Departamentos/DepartamentosView"
import Registros from "./pages/RRHH/Registros/RegistrosView"
import Evaluaciones from "./pages/RRHH/Evaluaciones/EvaluacionesView"





export const modulos = [   
   
    /**Tools Router */     
    {        
        key        : 70,
        path       : "/empresa",
        name       : "Empresa",
        component  : Empresa,
        layout     : "/tools",
        enabled    : true,
        icon       : faIndustry,
    },
    {        
        key        : 71,
        path       : "/sucursales",
        name       : "Sucursales",
        component  : Sucursales,
        layout     : "/tools",
        enabled    : true,
        icon       : faBuilding,
    },
    {        
        key        : 72,
        path       : "/usuarios",
        name       : "Usuarios",
        component  : Usuarios,
        layout     : "/tools",
        enabled    : true,
        icon       : faUsers,
    },
  
    /**RRHH Router */     
    {        
        key        : 80,
        path       : "/inicio",
        name       : "Dashboard",
        component  : RRHHInicio,
        layout     : "/rrhh",
        enabled    : true,
        icon       : faIndustry,
    },
    {        
        key        : 81,
        path       : "/personas",
        name       : "Personas",
        component  : Personas,
        layout     : "/rrhh",
        enabled    : true,
        icon       : faUsers,
    },
    {        
        key        : 82,
        path       : "/contratos",
        name       : "Contratos",
        component  : Contratos,
        layout     : "/rrhh",
        enabled    : true,
        icon       : faFileArchive,
    },    
    {        
        key        : 83,
        path       : "/registros",
        name       : "Asistencia",
        component  : Registros,
        layout     : "/rrhh",
        enabled    : true,
        icon       : faFileArchive,
    },
    {        
        key        : 84,
        path       : "/datos",
        name       : "Datos",
        component  : Departamentos,
        layout     : "/rrhh",
        enabled    : true,
        icon       : faCogs,
    },
    {        
        key        : 85,
        path       : "/evaluaciones",
        name       : "Evaluaciones",
        component  : Evaluaciones,
        layout     : "/rrhh",
        enabled    : true,
        icon       : faCogs,
    }

]   