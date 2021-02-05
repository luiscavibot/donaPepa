import React, { useState, useEffect } from "react";
// import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import '../css/adicional.css';
// import es from 'date-fns/locale/es';
// import {db} from '../firebase';
// import moment from 'moment'
import 'moment/locale/es'
import axios from 'axios';


const VendedoraLiquidacion = () => {

    const [metodoPago, setMetodoPago] = useState('todos');

    const [tipoCliente, setTipoCliente] = useState('todos')

    const [buscador, setBuscador] = useState(false)

    const [contador, setContador] = useState(1)

    const [desactivar, setDesactivar] = useState(false)

    const [fechaReporte, setFechaReporte] = useState(new Date());
    // const [dateFin, setDateFin] = useState(new Date());
    //********************************************************* */
    //State's Hooks fundamentales:
    const [totalLiquidacion, setTotalLiquidacion] = useState([0,0,0,0])
    //********************************************************** */
     //State's Hooks de apoyo:
     const [listaLiquidacion, setListaLiquidacion] = useState([])
     //********************************************************** */
    //UseEffects 
    useEffect(() => {
        const getBorradores = async () =>{
            try {
                console.log("activaremos el axios para obtener todos los objetos de borrador");
                let res = await axios.get('http://46.183.113.134:3000/api/ventas');
                console.log("Lista obtenida por consulta a BORRADOR",res.data);
                setListaLiquidacion(res.data);
                let suma = sumaTotalLiquidacion(res.data);
                console.log("El objeto que tiene todas las sumas es: ",suma);
                setTotalLiquidacion(suma);
            } catch (error) {
                console.error(error);
            }
        }
        getBorradores();

        const sumaTotalLiquidacion = (row)=>{
            let sumaTotal = {
                total: 0,
                total_igv: 0,
                total_gravada: 0,
                total_impuestos_bolsas: 0
            };
            row.forEach(value =>{
                sumaTotal.total = sumaTotal.total + value.total;
                sumaTotal.total_igv = sumaTotal.total_igv + value.total_igv;
                sumaTotal.total_gravada = sumaTotal.total_gravada + value.total_gravada;
                sumaTotal.total_impuestos_bolsas = sumaTotal.total_impuestos_bolsas + value.total_impuestos_bolsas*1.0;
            })
            return [sumaTotal.total.toFixed(2),sumaTotal.total_igv.toFixed(2),sumaTotal.total_gravada.toFixed(2),sumaTotal.total_impuestos_bolsas.toFixed(2)]
        }

    }, [])

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
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3 mb-3 border-bottom">
                <h1 className="fw-bold h5">Vendedora / Liquidación</h1>
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
                                        <label className="col-form-label">Métodos de pago:</label>
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
                        <div className="d-flex align-items-end justify-content-between">
                            <p className="mb-0">*Se liquida automáticamente todo a las 12 pm. Cualquier ajuste solicitelo con el _____</p>
                            <div className="d-flex">
                                <div>
                                    <button type="button" class="btn btn-danger">Liquidar</button>
                                </div>
                                <div className="d-flex align-items-center ms-3">
                                    <div>Total:</div>
                                    <div>S/. <span>{totalLiquidacion[0]}</span></div>
                                    {/* <div>Total IGV:</div>
                                    <div>S/. <span>{totalLiquidacion[1]}</span></div>
                                    <div>Total Gravada:</div>
                                    <div>S/. <span>{totalLiquidacion[2]}</span></div>
                                    <div>Tota ICBPER:</div>
                                    <div>S/. <span>{totalLiquidacion[3]}</span></div> */}
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
                            <th scope="col">Fecha</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Serie</th>
                            <th scope="col">Nro Comp.</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Tot. Grav.</th>
                            <th scope="col">Tot. IGV</th>
                            <th scope="col">ICBPER</th>
                            <th scope="col">Total</th>                                                    
                        </tr>
                    </thead>
                    <tbody>
                        {
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
            
        </div>
    )
}

export default VendedoraLiquidacion
