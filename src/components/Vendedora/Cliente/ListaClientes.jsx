import React, { useState, useEffect } from "react";
import axios from 'axios';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'moment/locale/es'

import {
    // BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Link,
    // useParams,
    useRouteMatch,
    withRouter
  } from "react-router-dom";

const ListaClientes = () => {

    const [listaClientes, setListaClientes] = useState([])
    
    const [dateInicio, setDateInicio] = useState(new Date());
    const [dateFin, setDateFin] = useState(new Date());

    const [buscador, setBuscador] = useState(false)

    const [Producto, setProducto] = useState('todos')
    const [tipoCliente, setTipoCliente] = useState('todos')
    const [regalo, setRegalo] = useState('todos')
    const [genero, setGenero] = useState('todos')
    const [mes, setMes] = useState('todos')

    const [contador, setContador] = useState(1)

    const [desactivar, setDesactivar] = useState(false)

    const ExampleCustomInput = ({ value, onClick }) => (
        <div className="d-flex align-items-center justify-content-between form-control" onClick={onClick}>
          <div>{value}</div>
          <div>
              <i className="far fa-calendar p-1 rounded-3 text-center"></i>
          </div>
        </div>
    );

    const buscadorGeneral = (event) => {
        // console.log(event.target.value);
        // setBuscador(event.target.value);
        if (event.target.value==="") {
            setBuscador(true);
        }else{
            consultaBuscador(event.target.value);
        }
    }

    const consultaBuscador = () => {

    }

    const anterior = () => {

    }

    const siguiente = () => {
        
    }

    useEffect(() => {
        const getClientes = async () =>{
            try {
                console.log("activaremos el axios para obtener todos los objetos de clientes");
                let res = await axios.get('http://localhost:3000/api/clientes');
                console.log("Lista obtenida por consulta a CLIENTES",res.data);
                setListaClientes(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        getClientes();
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3 mb-3 border-bottom">
                <h1 className="fw-bold h5 text-black-header">Lista de Clientes</h1>
                <NavLink 
                    className="btn btn-danger" 
                    to="/panelcontrol/crear-cliente"
                    exact
                >
                    Crear Cliente
                </NavLink>
                {/* <button type="button" class="btn btn-danger">Crear Cliente</button> */}
            </div>
            <div>
                <div className="row">
                    <div className="col">
                        <div className="row justify-content-between">
                            <div className="col-7 d-flex justify-content-between">
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col-auto">
                                            <label className="col-form-label">Fecha inicio:</label>
                                        </div>
                                        <div className="col-auto">
                                            <DatePicker 
                                                selected={dateInicio} 
                                                onChange={date => setDateInicio(date)} 
                                                locale="es"
                                                customInput={<ExampleCustomInput />} 
                                                dateFormat="dd/MM/yyyy"
                                                wrapperClassName="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col-auto">
                                            <label className="col-form-label">Fin:</label>
                                        </div>
                                        <div className="col-auto">
                                            <DatePicker 
                                                selected={dateFin} 
                                                onChange={date => setDateFin(date)} 
                                                locale="es"
                                                customInput={<ExampleCustomInput />} 
                                                dateFormat="dd/MM/yyyy"
                                                wrapperClassName="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col-auto">
                                            <label className="col-form-label">Mes:</label>
                                        </div>
                                        <div className="col-auto">
                                            <select name="mes" className="form-select" value={mes} onChange={e => setMes(e.target.value)}>
                                                <option value="todos" selected>--</option>
                                                <option value="0">Enero</option>
                                                <option value="1">Febrero</option>
                                                <option value="2">Marzo</option>
                                                <option value="3">Abril</option>
                                                <option value="4">Mayo</option>
                                                <option value="5">Junio</option>
                                                <option value="6">Julio</option>
                                                <option value="7">Agosto</option>
                                                <option value="8">Septiembre</option>
                                                <option value="9">Octubre</option>
                                                <option value="10">Noviembre</option>
                                                <option value="11">Diciembre</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            

                            <div className="col-3 mb-3">
                                <div className="">
                                    <input className="form-control" type="text" placeholder="Búsqueda general" onChange={buscadorGeneral}/>
                                </div>
                            </div>
                            
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-auto">
                                        <label className="col-form-label">Producto:</label>
                                    </div>
                                    <div className="col-auto">
                                        <select name="producto" className="form-select" value={Producto} onChange={e => setProducto(e.target.value)}>
                                            <option value="todos" selected>--</option>
                                            <option value="producto1">producto1</option>
                                            <option value="producto2">producto2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-auto">
                                        <label className="col-form-label">Regalo:</label>
                                    </div>
                                    <div className="col-auto">
                                        <select name="regalo" className="form-select" value={regalo} onChange={e => setRegalo(e.target.value)}>
                                            <option value="todos" selected>--</option>
                                            <option value="si">Sí</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-auto">
                                        <label className="col-form-label">Tipo de Cliente:</label>
                                    </div>
                                    <div className="col-auto">
                                        <select name="tipoCliente" className="form-select" onChange={e => setTipoCliente(e.target.value)}>
                                            <option value="todos" selected>--</option>
                                            <option value="tipo-1">tipo 1</option>
                                            <option value="tipo-2">tipo 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-auto">
                                        <label className="col-form-label">Género:</label>
                                    </div>
                                    <div className="col-auto">
                                        <select name="genero" className="form-select" onChange={e => setGenero(e.target.value)}>
                                            <option value="todos" selected>--</option>
                                            <option value="M">M</option>
                                            <option value="F">F</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table" id="tblData">
                    <thead className="table-ligth">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Total en compras</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaClientes.map((row,index) => {
                                let birthday = new Date(row.fechaCumple)
                                let yyyy = birthday.getFullYear()
                                let mm = birthday.getMonth() + 1
                                let dd = birthday.getDate()
                                let BDayformat = yyyy + "-" + mm + "-" + dd
                                return(
                                <tr>
                                    <td >{index + 1}</td>
                                    <td >{row.nombre}</td>
                                    <td >{BDayformat}</td>
                                    <td >total</td>
                                    <td>
                                    <Link 
                                        className="btn btn-link" 
                                        // to="/panelcontrol/cliente"
                                        to = {{
                                            pathname: `/panelcontrol/cliente/${row.id}`,
                                        }}
                                        exact
                                    >
                                        Ver más
                                    </Link>
                                    {/* <button type="button" class="btn btn-primary">Ver más</button> */}
                                </td>
                                </tr>
                                )
                            })
                        }

                            
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <button className="page-link" onClick={() => anterior()}>Anterior</button>
                            </li>
                            <li className="page-item"><input type="text" className="page-link btnPagina" value={contador}/></li>
                            <li className="page-item">
                                <button className="page-link" onClick={() => siguiente()} disabled={desactivar}>Siguiente</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )

}

export default ListaClientes
