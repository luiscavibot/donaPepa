import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'

const Empleado = () => {

    const [buscador, setBuscador] = useState(false)
    const [metodoPago, setMetodoPago] = useState('todos')
    const [tipoCliente, setTipoCliente] = useState('todos')
    const [totalLiquidacion, setTotalLiquidacion] = useState([0,0,0,0])
    const [listaLiquidacion, setListaLiquidacion] = useState([])
    const [contador, setContador] = useState(1)
    const [desactivar, setDesactivar] = useState(false)



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
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3 mb-3 border-bottom">
                    <h1 className="fw-bold h5">Mantenimiento / Empleado</h1>
                    {/* <div>
                        <button type="button" className="btn btn-secondary btn-sm me-1">Copiar</button>
                        <button type="button" className="btn btn-secondary btn-sm me-1" >Imprimir</button>
                        <button type="button" className="btn btn-secondary btn-sm">Excel</button>
                    </div> */}
                </div>

                <div>
                    <div className="row">
                        {/* <div className="col-8">
                            <div className="d-flex justify-content-between"> */}

                                <div className="col-7 mb-3">
                                    <div className="row">
                                        <div className="col-auto">
                                            <label className="col-form-label">Buscar:</label>
                                        </div>
                                        <div className="col">
                                            <input className="form-control fa" type="text" placeholder="&#xF002;" onChange={buscadorGeneral}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <label className="col-form-label">Cargo:</label>
                                                </div>
                                                <div className="col">
                                                    <select className="form-select" value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                                                        <option value="todos" selected>--</option>
                                                        <option value="tarjeta">Vendedor</option>
                                                        <option value="contado">Pepa Chica</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <label className="col-form-label">Distrito:</label>
                                                </div>
                                                <div className="col">
                                                    <select className="form-select" value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                                                        <option value="todos" selected>--</option>
                                                        <option value="tarjeta">Lima</option>
                                                        <option value="contado">Pepa Chica</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <label className="col-form-label">Hijo:</label>
                                                </div>
                                                <div className="col">
                                                    <select className="form-select" value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                                                        <option value="todos" selected>--</option>
                                                        <option value="tarjeta">0</option>
                                                        <option value="contado">Pepa Chica</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <label className="col-form-label">Estado civil:</label>
                                                </div>
                                                <div className="col">
                                                    <select className="form-select" value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                                                        <option value="todos" selected>--</option>
                                                        <option value="tarjeta">soltero</option>
                                                        <option value="contado">Pepa Chica</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="col mb-3">
                                    <div className="row">
                                        <div className="col-auto">
                                            <label className="col-form-label">Local:</label>
                                        </div>
                                        <div className="col-auto">
                                            <select className="form-select" value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                                                <option value="todos" selected>--</option>
                                                <option value="tarjeta">Pepa Grande</option>
                                                <option value="contado">Pepa Chica</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="col-3 mb-3 d-flex align-items-end justify-content-center">
                                    <button className="btn btn-primary">+ AGREGAR EMPLEADO</button>
                                </div>
                                
                            {/* </div>
                        </div> */}
                    </div>
                    
                    
                    <table className="table" id="tblData">
                        <thead className="table-ligth">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido paterno</th>
                                <th scope="col">Apellido materno</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Celular</th>
                                <th scope="col">Acciones</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                listaLiquidacion.map((row) => (
                                    <tr>
                                        <td>{row.fecha_de_emision}</td>
                                        <td >{row.tipo_de_comprobante===1?"Factura":
                                        row.tipo_de_comprobante===2?"Boleta":
                                        row.tipo_de_comprobante==="nv"?"Nota de Venta":null
                                        }</td>
                                        <td >{row.serie}</td>
                                        <td >{row.numero}</td>
                                        <td >{row.cliente_denominacion}</td>
                                        <td >{row.total_gravada}</td>
                                        <td >{row.total_igv}</td>
                                        <td >{row.total_impuestos_bolsas}</td>
                                        <td >{row.total}</td>
                                    </tr>        
                                ))
                            }       */}
                            <tr data-toggle="collapse" data-target="#demo1" className="accordion-toggle">
                                <td>1</td>
                                <td>Chris Alexander</td>
                                <td>Moscoso</td>
                                <td>Lopez</td>
                                <td>chrisml</td>
                                <td>hjsgdjkhask</td>
                                <td>991570333</td>
                                <td>
                                    <div>
                                        <button className="btn btn-sm btn-primary mx-1">EDITAR</button>
                                        <button className="btn btn-sm btn-danger mx-1">ELIMINAR</button>
                                        <button className="btn btn-sm btn-secondary mx-1">ELIMINAR</button>
                                    </div>
                                </td>
                                <td><button className="btn">{'>'}</button></td>
                            </tr>
                            <tr>
                                <td colspan="12" className="hiddenRow">
                                    <div className="collapse" id="demo1">
                                        HANHU
                                    </div>
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
        </>
    )
}

export default Empleado
