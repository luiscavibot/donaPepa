import React, { useState, useEffect } from "react";
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'moment/locale/es'
import ListaClientes from "./ListaClientes";
import CrearCliente from "./CrearCliente";

import {
    // BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    // Link,
    // useParams,
    useRouteMatch,
    withRouter
  } from "react-router-dom";

function ContenidoCliente() {

    let { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={`${path}`}>
                    <ListaClientes />
                </Route>
                <Route path={`${path}/crear-cliente`}>
                    <CrearCliente />
                </Route>
            </Switch>
            
        </div>
    )

}

export default ContenidoCliente
