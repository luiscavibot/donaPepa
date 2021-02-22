import React, { useState, useEffect } from 'react'

const Producto = () => {

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
                    <h1 className="fw-bold h5">Mantenimiento / Producto</h1>
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

                                <div className="col-4 mb-3">
                                    <div className="row">
                                        <div className="col-auto">
                                            <label className="col-form-label">Buscar:</label>
                                        </div>
                                        <div className="col">
                                            <input className="form-control fa" type="text" placeholder="&#xF002;" onChange={buscadorGeneral}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col mb-3">
                                    <div className="row">
                                        <div className="col-auto">
                                            <label className="col-form-label">Categorías:</label>
                                        </div>
                                        <div className="col-auto">
                                            <select className="form-select" value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                                                <option value="todos" selected>--</option>
                                                <option value="tarjeta">tarjeta</option>
                                                <option value="contado">contado</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col mb-3">
                                    <div className="row">
                                        <div className="col-auto">
                                            <label className="col-form-label">Marcas:</label>
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

                                <div className="col mb-3">
                                    <button className="btn btn-primary">+ AGREGAR PRODUCTO</button>
                                </div>
                                
                            {/* </div>
                        </div> */}
                    </div>
                    
                    
                    <table className="table" id="tblData">
                        <thead className="table-ligth">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Código</th>
                                <th scope="col">Marcas</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Presentación</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Acciones</th>                                                 
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
                            <tr>
                                <td>1</td>
                                <td>1000002</td>
                                <td>Doña Pepa</td>
                                <td>DP Tradicional</td>
                                <td>1/2 Kg</td>
                                <td>S/. 50</td>
                                <td>
                                    <div>
                                        <button className="btn btn-sm btn-primary mx-1">EDITAR</button>
                                        <button className="btn btn-sm btn-danger mx-1">ELIMINAR</button>
                                        <button className="btn btn-sm btn-secondary mx-1">ELIMINAR</button>
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

export default Producto
