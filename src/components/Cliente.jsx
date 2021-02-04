import React, { useState, useEffect } from "react";
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'moment/locale/es'

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

function Cliente() {
    
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

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3 mb-3 border-bottom">
                <h1 className="fw-bold h5 text-black-header">Martín Perez</h1>
                <NavLink 
                    className="btn btn-danger" 
                    to="/panelcontrol/crear-cliente"
                    exact
                >
                    Editar
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

                            <p className="mb-0">
                                Es un cliente que compra al por mayor y seguido, ofrezcamosle 1 regalo de cortesía
                            </p>
                            
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-auto">
                                        <label className="col-form-label">Total:</label>
                                    </div>
                                    <div className="col-auto d-flex align-items-center">
                                        <div>
                                            S/. 3500
                                        </div>
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
                            <th scope="col">Tipo</th>
                            <th scope="col">Nro Docuemnto</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio Unitario</th>
                            <th scope="col">Precio Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            {/* {rows.map((row) => (
                                <tr>
                                    <td >{row.tipoDocumento}</td>
                                    <td >{row.serie}</td>
                                    <td >{row.numero}</td>
                                    <td >{row.cliente}</td>
                                    <td >{row.categoria}</td>
                                    <td >{row.producto}</td>
                                    <td >{row.cantidad}</td>
                                    <td >{row.descuento}</td>
                                    <td >{row.precioUnitario}</td>
                                    <td >{row.vendedor}</td>
                                    <td >{row.monto}</td>
                                    <td >{moment(row.fecha).format('L')}</td>
                                    <td >{row.local}</td>
                                    <td >{row.estado}</td>
                                </tr>
                            ))} */}

                            <tr>
                                <td>10772</td>
                                <td>10</td>
                                <td>NV10</td>
                                <td>17-12-2020</td>
                                <td>Turrón tradicional</td>
                                <td>25</td>
                                <td>225.00</td>
                                <td>265.50</td>
                            </tr>
                            <tr>
                                <td>10772</td>
                                <td>10</td>
                                <td>NV10</td>
                                <td>17-12-2020</td>
                                <td>Turrón tradicional</td>
                                <td>25</td>
                                <td>225.00</td>
                                <td>265.50</td>
                            </tr>
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

export default Cliente
