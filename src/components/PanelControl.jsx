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
import VendedoraReporte from './Vendedora/VendedoraReporte';
import NuevaVenta from './NuevaVenta';
import VendedoraAnulacion from './Vendedora/VendedoraAnulacion';
import VendedoraLiquidacion from './Vendedora/VendedoraLiquidacion';
import VendedoraBorrador from './Vendedora/VendedoraBorrador';
import CrearCliente from './Vendedora/Cliente/CrearCliente';
import EditarCliente from './Vendedora/Cliente/EditarCliente';
import ListaClientes from './Vendedora/Cliente/ListaClientes';
import Cliente from './Vendedora/Cliente/Cliente';
import Categoria from './Mantenimiento/Categoria';
import Producto from './Mantenimiento/Producto';
import Local from './Mantenimiento/Local';
import Empleado from './Mantenimiento/Empleado';
import Asignacion from './Mantenimiento/Asignacion';
import Dashboard from './Dashboard';
import Campaña from './Campañas/Campaña';

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
                                    <NavLink 
                                        className="text-white accordion-button collapsed"
                                        to="/panelcontrol/dashboard"
                                        exact
                                    >
                                        DASHBOARD
                                    </NavLink>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="text-white accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            REPORTES
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
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/categoria"
                                                exact
                                            >
                                                CATEGORÍA
                                            </NavLink>
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/producto"
                                                exact
                                            >
                                                PRODUCTO
                                            </NavLink>
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/local"
                                                exact
                                            >
                                                LOCAL
                                            </NavLink>
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/clientes"
                                                exact
                                            >
                                                CLIENTE
                                            </NavLink>
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/empleado"
                                                exact
                                            >
                                                EMPLEADO
                                            </NavLink>
                                            <NavLink 
                                                className="list-group-item text-start" 
                                                to="/panelcontrol/asignacion"
                                                exact
                                            >
                                                ASIGNACIÓN
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <NavLink 
                                        className="text-white accordion-button collapsed"
                                        to="/panelcontrol/campañas"
                                        exact
                                    >
                                        CAMPAÑAS
                                    </NavLink>
                                </div>

                            </div>
                        </div>
                    </nav>
                
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Switch>
                            <Route path={`${path}/dashboard`}>
                                <Dashboard />
                            </Route>
                            <Route path={`${path}/reportes-ventas`}>
                                <ReportesVentas />
                            </Route>
                            <Route path={`${path}/reportes-liquidacionmaestro`}>
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h1 className="h5">Reportes de Liquidación Maestro</h1>
                                </div>
                            </Route>
                            <Route path={`${path}/clientes`}>
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
                            <Route path={`${path}/editar-cliente/:id`}>
                                <EditarCliente />
                            </Route>
                            <Route path={`${path}/cliente/:id`}>
                                <Cliente />
                            </Route>
                            <Route path={`${path}/categoria`}>
                                <Categoria />
                            </Route>
                            <Route path={`${path}/local`}>
                                <Local />
                            </Route>
                            <Route path={`${path}/producto`}>
                                <Producto />
                            </Route>
                            <Route path={`${path}/empleado`}>
                                <Empleado />
                            </Route>
                            <Route path={`${path}/asignacion`}>
                                <Asignacion />
                            </Route>
                            <Route path={`${path}/campañas`}>
                                <Campaña />
                            </Route>
                        </Switch>
                    </main>
                </div>
            </div>
        </>
    )
}

export default withRouter(PanelControl)
