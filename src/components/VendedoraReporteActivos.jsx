import React, { useState, useEffect, useRef } from "react";
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
// import '../css/adicional.css';
import es from 'date-fns/locale/es';
import {db} from '../firebase';
import moment from 'moment'
import 'moment/locale/es'
import { } from 'react-bootstrap';

function VendedoraReporteActivos() {
    let IGV=0.18

    const [listaProductos, setListaProductos] = useState([])

    const [listaVentas, setListaVentas] = useState([])

    const [metodoPago, setMetodoPago] = useState('');

    const [delivery, setDelivery] = useState('')

    const [tipoCliente, setTipoCliente] = useState('todos')

    const [tipoProducto, setTipoProducto] = useState('')

    const [buscador, setBuscador] = useState(false)

    const [busqueda, setBusqueda] = useState('')  

    const [contador, setContador] = useState(1)

    const [desactivar, setDesactivar] = useState(false)

    const [fechaReporte, setFechaReporte] = useState(new Date());
    // const [dateFin, setDateFin] = useState(new Date());
    const firstRender = useRef(true);

    //UseEfects:
    useEffect(() => {
        const getVentas = async () =>{
            try {
                let res = await axios.get('http://localhost:3030/api/ventas');
                setListaVentas(res.data);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        getVentas();
    }, [])

    useEffect(() => {
        const getProducts = async () =>{
            try {
                console.log("activaremos el axios");
                let res = await axios.get('http://46.183.113.134:3000/api/productos/listaProductosPorDescripcion');
                console.log(res.data);
                setListaProductos(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        getProducts();
    }, [])

    const ExampleCustomInput = ({ value, onClick }) => (
        <div className="d-flex border align-items-center justify-content-between form-control" onClick={onClick}>
          <div>{value}</div>
          <div>
              <i className="far fa-calendar p-1 rounded-3 text-center"></i>
          </div>
        </div>
    );
    
    const manejadorEntradas= (event)=>{
        let name =event.target.name;
        console.log(event.target.dataset.item);
    }
    

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
            // consultaBuscador(event.target.value);
        }
    }

    // const consultaBuscador = () => {

    // }

    useEffect(() => {

        const consultaBuscador = async () => {
            try {
                await axios.get('http://localhost:3030/api/ventas/filtro', {params: {
                    pago: metodoPago,
                    general: busqueda,
                    delivery: delivery,
                    fecha_inicial:'',
                    fecha_final: '',
                    producto: tipoProducto
                }}).
                then(res => {
                    setListaVentas(res.data);
                    
                    console.log(res.data);
                })
            } catch (error) {
                console.error(error);
            }
            
        }   
        consultaBuscador(); 
    }, [metodoPago,delivery,busqueda,tipoProducto,setListaVentas])

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
                                <input className="form-control" type="text" placeholder="Búsqueda general" onChange={e => setBusqueda(e.target.value)}/>
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
                                        <option value="2">Sin delivery</option>
                                        <option value="1">Con delivery</option>
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
                                        <option value="">--</option>
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
                                        <option value="">--</option>
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
                                    <select name="tipoProducto" className="form-select" onChange={e => setTipoProducto(e.target.value)}>
                                        <option value="">--</option>
                                        <option value="tipo-1">tipo 1</option>
                                        <option value="tipo-2">tipo 2</option>
                                    </select>
                                </div>
                            </div>
                        </div> */}
                        <td>
                            <input className="form-control" name = "descripcion" type="search"  
                                placeholder="Ingrese un producto" list="listaproductos"  onChange={e => setTipoProducto(e.target.value)} />
                            <datalist id="listaproductos">
                                {
                                    listaProductos.map((item) =>
                                        (<option value={item} />)
                                    )
                                }
                            </datalist>
                        </td>
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
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                        {/* {listaVentas.map((row) => (
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

                        {listaVentas.map((row,index) => (
                            <tr>
                                <td >{row.fecha_de_emision}</td>
                                <td >{row.serie}</td>
                                <td >{row.cliente_denominacion}</td>
                                <td >{row.total_gravada}</td>
                                <td >{row.total_igv}</td>
                                <td >{row.total}</td>
                                <td>
                                        <button type="button" data-item={index} name="mostrarContenido" className="btn btn-primary me-2" onClick={manejadorEntradas} data-bs-toggle="modal" data-bs-target={`#previewModals${index}`}  >
                                            <i class="fas fa-search"></i>
                                        </button>

                                        <div className="modal fade" id={`previewModals${index}`} tabIndex="-1" aria-labelledby="previewModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <div className="">
                                                        <div className="bg-gray p-4">
                                                            <div className="d-flex justify-content-between mb-3">
                                                                <div className="text-uppercase sub-title text-black-header">Jaramillo Torero de Paez Manuela Maria</div>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="row mb-3">
                                                                <div className="col">
                                                                    <div>Av. Tacna Nro. 488</div>
                                                                    <div>Lima - Lima - Lima</div>
                                                                    <div>RUC 10095588986</div>
                                                                    <div className="text-uppercase">{row.tipo_de_comprobante===1?"Factura":row.tipo_de_comprobante===2?"Boleta":row.tipo_de_comprobante==="nv"?"Nota de Venta":null} 
                                                                    &nbsp;electrónica</div>
                                                                </div>
                                                                <div className="col"></div>
                                                            </div>
                                                            <div className="h5">Serie: {row.serie}</div>
                                                        </div>
                                                        <div className="p-4">
                                                            <div className="mb-3 text-black">CLIENTE: {row.cliente_denominacion}</div>
                                                            <div>
                                                                <div className="text-uppercase">{row.nombreCliente}</div>
                                                                <div>Fecha de emisión: {row.fecha_de_emision}</div>
                                                                <div>Moneda: {row.moneda===1?"Soles":null}</div>
                                                                <div>IGV: {IGV*100}%</div>
                                                            </div>
                                                        </div>
                                                        <div className="p-4">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">#</th>
                                                                        <th scope="col">Descripción</th>
                                                                        <th scope="col">Cód.</th>
                                                                        <th scope="col">Cant.</th>
                                                                        <th scope="col">Precio U.</th>
                                                                        <th scope="col">Subtotal</th>
                                                                        <th scope="col">IGV</th>
                                                                        <th scope="col">Total</th>
                                                                        <th scope="col">ICBPER</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        row.items.map((item) =>
                                                                            (
                                                                                <tr>
                                                                                    <td>{index}</td>
                                                                                    <td>{item.descripcion}</td>
                                                                                    <td>{item.codigo}</td>
                                                                                    <td>{item.cantidad}</td>
                                                                                    <td>{item.precio_unitario}</td>
                                                                                    <td>{item.subtotal}</td>
                                                                                    <td>{item.igv}</td>
                                                                                    <td>{item.total}</td>
                                                                                    <td>{item.impuesto_bolsas}</td>
                                                                                </tr>
                                                                            )
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="border-bottom"></div>
                                                        <div className="p-4 text-end text-black">
                                                            {/* <div className="row">
                                                                <div className="col-8">Sub Total productos:</div>
                                                                <div className="col-1">S/</div>
                                                                <div className="col-3">{(totalPagar*(1/(1+IGV))).toFixed(2)}</div>
                                                            </div> */}
                                                            {/* <div className="row">
                                                                <div className="col-8">Delivery:</div>
                                                                <div className="col-1">S/</div>
                                                                <div className="col-3">{(totalDelivery*(1/(1+IGV))).toFixed(2)}</div>
                                                            </div> */}
                                                            <div className="row">
                                                                <div className="col-8">Total gravada:</div>
                                                                <div className="col-1">S/</div>
                                                                <div className="col-3">{row.total_gravada}</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-8">Total IGV({IGV}%):</div>
                                                                <div className="col-1">S/</div>
                                                                <div className="col-3">{row.total_igv}</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-8">ICBPER:</div>
                                                                <div className="col-1">S/</div>
                                                                <div className="col-3">{row.total_impuestos_bolsas}</div>
                                                            </div>
                                                        </div>
                                                        <div className="border-bottom"></div>
                                                        <div className="p-4 text-end text-black-header">
                                                            <div className="row">
                                                                <div className="col-8">TOTAL:</div>
                                                                <div className="col-1">S/</div>
                                                                <div className="col-3">{(row.total.toFixed(2))}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <div className="w-100 text-center">
                                                            <div>
                                                                Representación previa de la
                                                            </div>
                                                            <div>
                                                            {row.tipo_de_comprobante===1?"Factura":row.tipo_de_comprobante===2?"Boleta":row.tipo_de_comprobante==="nv"?"Nota de Venta":null} 
                                                            &nbsp;electrónica
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </td>
                            </tr>
                        ))}

                        {/* <tr>
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
                        </tr> */}
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
