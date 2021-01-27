import React, { useState, useEffect } from "react";
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import '../css/adicional.css';
import es from 'date-fns/locale/es';
import {db} from '../firebase';
import moment from 'moment'
import 'moment/locale/es'

const VendedoraAnulacion = () => {

    const [vendedor, setVendedor] = useState('Todos');
    const handleChangeVendedor = (event) => {
        setVendedor(event.target.value);
    };

    const [ventasMensual, setVentasMensual] = useState('Todos');
    const handleChangeVentasMensual = (event) => {
        setVentasMensual(event.target.value);
    };

    const [metodoPago, setMetodoPago] = useState('Todos');
    const handleChangeMetodoPago = (event) => {
        setMetodoPago(event.target.value);
    };

    const [delivery, setDelivery] = useState()
    const handleChangeDelivery = (event) => {
        setDelivery(event.target.value);
    }

    const [tipoCliente, setTipoCliente] = useState()
    const handleChangeTipoCliente = (event) => {
        setTipoCliente(event.target.value);
    }

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
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h5">Vendedora / Anulación</h1>
                {/* <div>
                    <button type="button" className="btn btn-secondary btn-sm me-1">Copiar</button>
                    <button type="button" className="btn btn-secondary btn-sm me-1" >Imprimir</button>
                    <button type="button" className="btn btn-secondary btn-sm">Excel</button>
                </div> */}
            </div>

            <div>
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
                            
                            {/* <div className="mb-3">
                                <div className="row">
                                    <div className="col-auto">
                                        <label className="col-form-label">Delivery</label>
                                    </div>
                                    <div className="col-auto">
                                        <select onChange={handleChangeDelivery} name="delivery" className="form-select">
                                            <option selected>--</option>
                                            <option value="sin delivery">Sin delivery</option>
                                            <option value="con delivery">Con delivery</option>
                                        </select>
                                    </div>
                                </div>
                            </div> */}
                            
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-auto">
                                        <label className="col-form-label">Métodos de pago:</label>
                                    </div>
                                    <div className="col-auto">
                                        <select className="form-select" value={metodoPago} onChange={handleChangeMetodoPago}>
                                            <option selected>--</option>
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
                                        <select name="tipoCliente" className="form-select" onChange={handleChangeTipoCliente}>
                                            <option selected>--</option>
                                            <option value="tipo-1">tipo 1</option>
                                            <option value="tipo-2">tipo 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="mb-3">
                                <div className="row">
                                    <div className="col-auto">
                                        <label className="col-form-label">Producto:</label>
                                    </div>
                                    <div className="col-auto">
                                        <select name="tipoCliente" className="form-select" onChange={handleChangeTipoCliente}>
                                            <option selected>--</option>
                                            <option value="tipo-1">tipo 1</option>
                                            <option value="tipo-2">tipo 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div> */}
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-auto">
                                        <label className="col-form-label">Delivery</label>
                                    </div>
                                    <div className="col-auto">
                                        <select onChange={handleChangeDelivery} name="delivery" className="form-select">
                                            <option selected>--</option>
                                            <option value="sin delivery">Sin delivery</option>
                                            <option value="con delivery">Con delivery</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-4">
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
                    </div> */}
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
                            <th scope="col">Acciones</th>
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
                                <td>
                                    <button type="button" class="btn btn-primary"><i class="fas fa-search"></i></button>
                                    <button type="button" class="btn btn-danger"><i class="fas fa-times"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>10772</td>
                                <td>10</td>
                                <td>NV10</td>
                                <td>6797</td>
                                <td>225.00</td>
                                <td>265.50</td>
                                <td>
                                    <button type="button" class="btn btn-primary"><i class="fas fa-search"></i></button>
                                    <button type="button" class="btn btn-danger"><i class="fas fa-times"></i></button>
                                </td>
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
            
        </div>
    )
}

export default VendedoraAnulacion
