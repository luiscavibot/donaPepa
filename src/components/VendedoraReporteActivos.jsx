import React, { useState, useEffect } from "react";
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import '../css/adicional.css';
import es from 'date-fns/locale/es';
import {db} from '../firebase';
import moment from 'moment'
import 'moment/locale/es'

function VendedoraReporteActivos() {

    const [metodoPago, setMetodoPago] = useState('todos');

    const [delivery, setDelivery] = useState('todos')

    const [tipoCliente, setTipoCliente] = useState('todos')

    const [tipoProducto, setTipoProducto] = useState('todos')

    const [buscador, setBuscador] = useState(false)

    const [contador, setContador] = useState(1)

    const [desactivar, setDesactivar] = useState(false)

    const [fechaReporte, setFechaReporte] = useState(new Date());
    // const [dateFin, setDateFin] = useState(new Date());

    const ExampleCustomInput = ({ value, onClick }) => (
        <div className="d-flex border align-items-center justify-content-between form-control" onClick={onClick}>
          <div>{value}</div>
          <div>
              <i className="far fa-calendar p-1 rounded-3 text-center"></i>
          </div>
        </div>
    );

    // const deliveryChecked = (e) => {
    //     console.log("entro a delivery checked")
    //     console.log(e.target.value)
    //     if (e.target.value === "true") {
    //         setDelivery(true)
    //         return
    //     }
    //     setDelivery(false)
    //     return
    // }

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
            <div className="row">
                <div className="col-8">
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-auto">
                                    <label className="col-form-label">Fecha:</label>
                                </div>
                                <div className="col-auto">
                                    <DatePicker 
                                        selected={fechaReporte} 
                                        onChange={date => setFechaReporte(date)} 
                                        locale="es"
                                        customInput={<ExampleCustomInput />} 
                                        dateFormat="dd/MM/yyyy"
                                        wrapperClassName="form-control"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="">
                                <input className="form-control" type="text" placeholder="Búsqueda general" onChange={buscadorGeneral}/>
                            </div>
                        </div>
                        
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-auto">
                                    <label className="col-form-label">Delivery</label>
                                </div>
                                <div className="col-auto">
                                    <select onChange={e => setDelivery(e.target.value)} name="delivery" className="form-select">
                                        <option value="todos">--</option>
                                        <option value="sin_delivery">Sin delivery</option>
                                        <option value="con_delivery">Con delivery</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-auto">
                                    <label className="col-form-label">Métodos de pago:</label>
                                </div>
                                <div className="col-auto">
                                    <select className="form-select" onChange={e => setMetodoPago(e.target.value)}>
                                        <option value="todos">--</option>
                                        <option value="tarjeta">tarjeta</option>
                                        <option value="contado">contado</option>
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
                                        <option value="todos">--</option>
                                        <option value="tipo-1">tipo 1</option>
                                        <option value="tipo-2">tipo 2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-auto">
                                    <label className="col-form-label">Producto:</label>
                                </div>
                                <div className="col-auto">
                                    <select name="tipoProducto" className="form-select" onChange={e => setTipoProducto(e.target.value)}>
                                        <option value="todos">--</option>
                                        <option value="tipo-1">tipo 1</option>
                                        <option value="tipo-2">tipo 2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <p className="mb-0">Objetivo del día</p>
                    <div className="border-bottom my-3"></div>
                    <div className="d-flex">
                        <div className="me-4">
                            <div>Tra:</div>
                            <div>20/40</div>
                        </div>
                        <div className="me-4">
                            <div>Exportación:</div>
                            <div>25/30</div>
                        </div>
                        <div className="me-4">
                            <div>Total</div>
                            <div>S/. <span>3500</span></div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <table className="table" id="tblData">
                <thead className="table-ligth">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Serie</th>
                        <th scope="col">Número</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Monto</th>
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
                            <td>6797</td>
                            <td>225.00</td>
                            <td>265.50</td>
                        </tr>
                        <tr>
                            <td>10772</td>
                            <td>10</td>
                            <td>NV10</td>
                            <td>6797</td>
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
        </>
    )
}

export default VendedoraReporteActivos
