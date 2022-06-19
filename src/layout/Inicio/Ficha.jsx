import React from "react";

import { Route, Switch } from "react-router-dom";
import FichaView from "../../pages/HOME/FichaView"
function Fich(){
return(
    <Switch>
        <Route path="/fichas/inicio/" component={FichaView}/>                        
    </Switch>
)    
}
export default Fich;
