import React from 'react'

// import {Link, NavLink, withRouter} from 'react-router-dom'
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
import {auth} from '../firebase'
import ReportesVentas from './ReportesVentas';
import ContenidoCliente from './ContenidoCliente';
import VendedoraReporte from './VendedoraReporte';
import NuevaVenta from './NuevaVenta';
import VendedoraAnulacion from './VendedoraAnulacion';
import VendedoraLiquidacion from './VendedoraLiquidacion';
import VendedoraBorrador from './VendedoraBorrador';
import CrearCliente from './CrearCliente';
import ListaClientes from './ListaClientes';

const PanelControl = (props) => {

    const [user, setUser] = React.useState(null)
    React.useEffect(() => {
        if(auth.currentUser){
            setUser(auth.currentUser)
        }else{
            props.history.push('/')
        }
    }, [props.history])

    let { path } = useRouteMatch();
    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/')
            })
    }
    return (
        <>
            <header className="navbar navbar-dark sticky-top  flex-md-nowrap p-0 border" style={{background:'white'}}>
                <div className="navbar-brand col-md-3 col-lg-2 me-0 px-3" >Doña Pepa-G. Jaramillo</div>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars text-dark"></i>
                </button>
                <div className="w-100"></div>
                <ul className="navbar-nav px-3"  >
                    <li className="nav-item text-nowrap">
                        <button className="btn btn-ligth border my-1" onClick={() => cerrarSesion()}>Cerrar Sesión</button>
                    </li>
                </ul>
            </header>
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="px-0 col-md-3 col-lg-2 d-md-block sidebar collapse">
                        <div className="position-sticky pt-3">
                            <div className="accordion" id="accordionExample">

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="text-white accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            DASHBOARD
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <ul>
                                                <li>sdasd</li>
                                                <li>sdasd</li>
                                                <li>sdasd</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="text-white accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            REPORTES ADMIN
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/reportes-ventas"
                                                exact
                                            >
                                                VENTAS
                                            </NavLink>
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/reportes-liquidacionmaestro"
                                                exact
                                            >
                                                LIQUIDACIÓN MAESTRO
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="text-white accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            VENDEDORA
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/cliente"
                                                exact
                                            >
                                                CLIENTE
                                            </NavLink>
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/vendedora-reporte"
                                                exact
                                            >
                                                REPORTE
                                            </NavLink>
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/nueva-venta"
                                                exact
                                            >
                                                NUEVA VENTA
                                            </NavLink>
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/vendedora-anulacion"
                                                exact
                                            >
                                                ANULACIÓN
                                            </NavLink>
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/vendedora-liquidacion"
                                                exact
                                            >
                                                LIQUIDACIÓN
                                            </NavLink>
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/vendedora-borrador"
                                                exact
                                            >
                                                BORRADOR
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFor">
                                        <button className="text-white accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFor" aria-expanded="false" aria-controls="collapseFor">
                                            MANTENIMIENTO
                                        </button>
                                    </h2>
                                    <div id="collapseFor" className="accordion-collapse collapse" aria-labelledby="headingFor" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <ul>
                                                <li>sdasd</li>
                                                <li>sdasd</li>
                                                <li>sdasd</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFive">
                                        <button className="text-white accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                            CONFIGURACIÓN
                                        </button>
                                    </h2>
                                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <ul>
                                                <li>sdasd</li>
                                                <li>sdasd</li>
                                                <li>sdasd</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </nav>
                
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Switch>
                            <Route path={`${path}/reportes-ventas`}>
                                <ReportesVentas />
                            </Route>
                            <Route path={`${path}/reportes-liquidacionmaestro`}>
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h1 className="h5">Reportes de Liquidación Maestro</h1>
                                </div>
                            </Route>
                            <Route path={`${path}/cliente`}>
                                <ListaClientes />
                            </Route>
                            <Route path={`${path}/vendedora-reporte`}>
                                <VendedoraReporte />
                            </Route>
                            <Route path={`${path}/nueva-venta`}>
                                <NuevaVenta />
                            </Route>
                            <Route path={`${path}/vendedora-anulacion`}>
                                <VendedoraAnulacion />
                            </Route>
                            <Route path={`${path}/vendedora-liquidacion`}>
                                <VendedoraLiquidacion />
                            </Route>
                            <Route path={`${path}/vendedora-borrador`}>
                                <VendedoraBorrador />
                            </Route>
                            <Route path={`${path}/crear-cliente`}>
                                <CrearCliente />
                            </Route>
                        </Switch>
                    </main>
                </div>
            </div>
        </>
    )
}

export default withRouter(PanelControl)
