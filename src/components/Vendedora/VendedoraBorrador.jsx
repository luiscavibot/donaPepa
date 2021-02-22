import React, { useState, useEffect } from "react";
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
// import '../css/adicional.css';
// import es from 'date-fns/locale/es';
// import {db} from '../firebase';
// import moment from 'moment'
import 'moment/locale/es'
import { } from 'react-bootstrap';


const VendedoraBorrador = () => {
    

    let IGV=0.18
   
    //************* */
    //State's Hooks de apoyo:
    const [listaBorradores, setListaBorradores] = useState([])
    const [cambiarModal, setCambiarModal] = useState(false)
    const [finOperacion, setFinOperacion] = useState(false)
    const [recargarBorrador, setRecargarBorrador] = useState(false)
    //************* */
    //Hooks de resultado de emisión
    const [resultadoEmisionComprobante, setResultadoEmisionComprobante] = useState(null)
    const [tituloResultado, setTituloResultado] = useState("")
    const [botonImprimir, setBotonImprimir] = useState(false)
    const [linkDescarga, setLinkDescarga] = useState("")
    const [metodoPago, setMetodoPago] = useState('todos');
    //*************************************** */

    const [delivery, setDelivery] = useState('todos')

    const [tipoCliente, setTipoCliente] = useState('todos')

    const [buscador, setBuscador] = useState(false)

    const [contador, setContador] = useState(1)

    const [desactivar, setDesactivar] = useState(false)

    const [fechaReporte, setFechaReporte] = useState(new Date());
    // const [dateFin, setDateFin] = useState(new Date());
    //************* */
    //UseEfects:
    useEffect(() => {
        const getBorradores = async () =>{
            try {
                console.log("activaremos el axios para obtener todos los objetos de borrador");
                let res = await axios.get('http://46.183.113.134:3000/api/borrador');
                console.log("Lista obtenida por consulta a BORRADOR",res.data);
                setListaBorradores(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        getBorradores();
    }, [])
    const recargar = async () =>{
        try {
            console.log("activaremos el axios para obtener todos los objetos de borrador");
            let res = await axios.get('http://46.183.113.134:3000/api/borrador');
            console.log("Lista obtenida por consulta a BORRADOR",res.data);
            setListaBorradores(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    //Funciones de apoyo:
    let numeracionObtenida = 0;

    const emitirComprobante = async (index,row) =>{
        setCambiarModal(true)
        console.log(row);
        console.log("El tipo de comprobantes es: ", row.tipo_de_comprobante);
        console.log("El tipo de serie es: ", row.serie);
        let numero = await obtenerNumeracion(row.tipo_de_comprobante,row.serie)
        console.log("La numeración obtenida esss: ", numero);
        console.log("Este es un elemento que tiene el siguiente id: " , row.id);
        let fechaActual = new Date()
        let day = fechaActual.getDate()
        let month = fechaActual.getMonth() + 1
        let year = fechaActual.getFullYear()
        let dateNewFormatSunat = ""
        if(month < 10){
        dateNewFormatSunat = `${day}-0${month}-${year}`
        }else{
        dateNewFormatSunat = `${day}-${month}-${year}`
        }    
        let documento = {
            operacion: row.operacion,
            tipo_de_comprobante: row.tipo_de_comprobante,
            serie: row.serie,
            numero: numero,
            sunat_transaction: row.sunat_transaction,
            cliente_tipo_de_documento: row.cliente_tipo_de_documento,
            cliente_numero_de_documento:  row.cliente_numero_de_documento,
            cliente_denominacion: row.cliente_denominacion,
            cliente_direccion: row.cliente_direccion,
            cliente_email: row.cliente_email,
            cliente_email_1: row.cliente_email_1,
            cliente_email_2: row.cliente_email_2,
            fecha_de_emision: dateNewFormatSunat,
            fecha_de_vencimiento: row.fecha_de_vencimiento,
            moneda: row.moneda,
            tipo_de_cambio: row.tipo_de_cambio,
            porcentaje_de_igv: row.porcentaje_de_igv,
            descuento_global: row.descuento_global,
            total_descuento: row.total_descuento,
            total_anticipo: row.total_anticipo,
            total_gravada: row.total_gravada,
            total_inafecta: row.total_inafecta,
            total_exonerada: row.total_exonerada,
            total_igv: row.total_igv,
            total_gratuita: row.total_gratuita,
            total_otros_cargos: row.total_otros_cargos,
            total: row.total,
            percepcion_tipo: row.percepcion_tipo,
            percepcion_base_imponible: row.percepcion_base_imponible,
            total_percepcion: row.total_percepcion,
            total_incluido_percepcion: row.total_incluido_percepcion,
            total_impuestos_bolsas: row.total_impuestos_bolsas,
            detraccion: row.detraccion,
            observaciones: row.observaciones,
            documento_que_se_modifica_tipo: row.documento_que_se_modifica_tipo,
            documento_que_se_modifica_serie: row.documento_que_se_modifica_serie,
            documento_que_se_modifica_numero: row.documento_que_se_modifica_numero,
            tipo_de_nota_de_credito: row.tipo_de_nota_de_credito,
            tipo_de_nota_de_debito: row.tipo_de_nota_de_debito,
            enviar_automaticamente_a_la_sunat: row.enviar_automaticamente_a_la_sunat,
            enviar_automaticamente_al_cliente: row.enviar_automaticamente_al_cliente,
            condiciones_de_pago: row.condiciones_de_pago,
            medio_de_pago: row.medio_de_pago,
            placa_vehiculo: row.placa_vehiculo,
            orden_compra_servicio: row.orden_compra_servicio,  
            formato_de_pdf: row.formato_de_pdf,
            generado_por_contingencia: row.generado_por_contingencia,
            bienes_region_selva: row.bienes_region_selva,
            servicios_region_selva: row.servicios_region_selva,
            items: row.items
        }
        const config = {
            headers: { 
                "Content-Type" : "application/json"
            }
        };
        
        console.log(documento);
        await axios.post('http://46.183.113.134:3000/api/ventas', documento, config)
        .then(async function (params) {
            console.log("se activó el then");
            if (params.data.errors) {
                setResultadoEmisionComprobante(params.data.errors);
                setTituloResultado("error")
            }else{
                console.log(params.data);
                setTituloResultado("exito")
                if (params.data.aceptada_por_sunat) {
                    setResultadoEmisionComprobante(params.data.sunat_description);
                    setBotonImprimir(true);
                    setLinkDescarga(params.data.enlace_del_pdf);
                    await registrarVenta(row,numero,dateNewFormatSunat);
                    await actualizarNumeracion(numero,row.tipo_de_comprobante,row.serie);
                    await eliminarElementoBorrador(row.id);
                    await recargar();
                    setFinOperacion(true);
                }else{
                    setResultadoEmisionComprobante("Se emitió correctamente a NubeFact, pero no llegó aún a la SUNAT. Revise la plataforma de facturación o comuníquese con su proveedor");
                }  
            }
        })
        .catch(function (params) {
            console.log("se activó el catch");
            console.log(params.data);
            setResultadoEmisionComprobante(params.data.errors);
        })  
    }

    const borrarFila = async (row) => {
        await eliminarElementoBorrador(row.id);
        await recargar();
    }

    const eliminarElementoBorrador = async (id) => {
        await axios.delete(`http://46.183.113.134:3000/api/borrador/${id}`)
        .then(function (params) {
            console.log("Resultado de consulta: ", params.data ); 
        })
        .catch(function (params) {
            console.log("Resultado de consulta: ", params.data );
        }) 
    }

    const actualizarNumeracion =  async (numeracionActualizar,tipoComprobante,serie) => {
        console.log("A continuación se actualizará la numeración");
        let comprobante = tipoComprobante===1?"Factura":tipoComprobante===2?"Boleta":tipoComprobante==="nv"?"Nota de Venta":null;
        console.log("La numeracion que actualizaré es:",numeracionActualizar);
        console.log("El tipo de comprobante es:", comprobante);
        console.log("Y la serie es: ", serie);
        await axios.put(`http://46.183.113.134:3000/api/numeracion?tipoComprobante=${comprobante}&serie=${serie}&numeroActual=${numeracionActualizar}`, {})
        .then(function (params) {
            console.log("Resultado de consulta: ", params.data );
        })
        .catch(function (params) {
            console.log("Resultado de consulta: ", params.data );
        })  
    }
    const registrarVenta = async (row,numero,dateNewFormatSunat) =>{
        let documento ={
            usuario: row.usuario,
            operacion: row.operacion,
            tipo_de_comprobante: row.tipo_de_comprobante,
            serie: row.serie,
            numero: numero,
            sunat_transaction: row.sunat_transaction,
            cliente_tipo_de_documento: row.cliente_tipo_de_documento,
            cliente_numero_de_documento:  row.cliente_numero_de_documento,
            cliente_denominacion: row.cliente_denominacion,
            cliente_direccion: row.cliente_direccion,
            cliente_email: row.cliente_email,
            cliente_email_1: row.cliente_email_1,
            cliente_email_2: row.cliente_email_2,
            fecha_de_emision: dateNewFormatSunat,
            fecha_de_vencimiento: row.fecha_de_vencimiento,
            moneda: row.moneda,
            tipo_de_cambio: row.tipo_de_cambio,
            porcentaje_de_igv: row.porcentaje_de_igv,
            descuento_global: row.descuento_global,
            total_descuento: row.total_descuento,
            total_anticipo: row.total_anticipo,
            total_gravada: row.total_gravada,
            total_inafecta: row.total_inafecta,
            total_exonerada: row.total_exonerada,
            total_igv: row.total_igv,
            total_gratuita: row.total_gratuita,
            total_otros_cargos: row.total_otros_cargos,
            total: row.total,
            percepcion_tipo: row.percepcion_tipo,
            percepcion_base_imponible: row.percepcion_base_imponible,
            total_percepcion: row.total_percepcion,
            total_incluido_percepcion: row.total_incluido_percepcion,
            total_impuestos_bolsas: row.total_impuestos_bolsas,
            detraccion: row.detraccion,
            observaciones: row.observaciones,
            documento_que_se_modifica_tipo: row.documento_que_se_modifica_tipo,
            documento_que_se_modifica_serie: row.documento_que_se_modifica_serie,
            documento_que_se_modifica_numero: row.documento_que_se_modifica_numero,
            tipo_de_nota_de_credito: row.tipo_de_nota_de_credito,
            tipo_de_nota_de_debito: row.tipo_de_nota_de_debito,
            enviar_automaticamente_a_la_sunat: row.enviar_automaticamente_a_la_sunat,
            enviar_automaticamente_al_cliente: row.enviar_automaticamente_al_cliente,
            condiciones_de_pago: row.condiciones_de_pago,
            medio_de_pago: row.medio_de_pago,
            placa_vehiculo: row.placa_vehiculo,
            orden_compra_servicio: row.orden_compra_servicio,  
            formato_de_pdf: row.formato_de_pdf,
            generado_por_contingencia: row.generado_por_contingencia,
            bienes_region_selva: row.bienes_region_selva,
            servicios_region_selva: row.servicios_region_selva,
            items: row.items,
            //****VALORES EXTRA */
            tipoRegalo: row.tipoRegalo,
            cantidadRegalo: row.cantidadRegalo,
            celular:row.celular,
            numeroOperacion:row.numeroOperacion,  
            provincia: row.provincia,
            canalVenta: row.canalVenta,
            clienteReferencias: row.clienteReferencias,
            clienteDepartamento: row.clienteDepartamento,
            clienteProvincia: row.clienteProvincia,
        }
        const config = {
            headers: { 
                "Content-Type" : "application/json"
            }
        };
        console.log("Este documento va para el registro:" ,documento);
        await axios.post('http://46.183.113.134:3000/api/ventas/registrarVenta', documento, config)
        .then(function (params) {
            console.log("Resultado de consulta: ", params.data );
        })
        .catch(function (params) {
            console.log("Resultado de consulta: ", params.data );
        })       
    }

    const cerrarModal = ()=>{
        // setTituloResultado("");
        // setResultadoEmisionComprobante("");
        setTimeout(() => {
            setCambiarModal(false);
            setResultadoEmisionComprobante("");
        }, 300); 
        // if (finOperacion===true) {  
        //     window.location.reload()
        // }
    }
    
    const obtenerNumeracion = async (tipoComprobante,serie)=>{
        try {
            console.log("Estoy por activar la consulta de numeracion");
            let comprobante = tipoComprobante===1?"Factura":tipoComprobante===2?"Boleta":tipoComprobante==="nv"?"Nota de Venta":null;
            console.log("El comprobante es: ", comprobante);
            let res = await axios.get(`http://46.183.113.134:3000/api/numeracion?tipoComprobante=${comprobante}&serie=${serie}`);

            return (res.data[0].numeroActual + 1.0);

        } catch (error) {
            console.error(error);
        }                
    };
    
    const manejadorEntradas= (event)=>{
        let name = event.target.name;
        console.log(event.target.dataset.item);
    }

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
                <h1 className="fw-bold h5">Vendedora / Borrador</h1>
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
                                        <select onChange={e => setDelivery(e.target.value)} name="delivery" className="form-select">
                                            <option value="todos" selected>--</option>
                                            <option value="sin_delivery">Sin delivery</option>
                                            <option value="con_delivery">Con delivery</option>
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
                            <th scope="col">Fecha</th>
                            <th scope="col">Serie</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Total Gravada</th>
                            <th scope="col">Total IGV</th>
                            <th scope="col">Total</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaBorradores.map((row,index) => (
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
                                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                                <div className="modal-content">
                                                    {
                                                        cambiarModal?
                                                        (<> 
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="staticBackdropLabel">Emisión de comprobante</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body d-flex flex-column justify-content-center align-content-center">
                                                                {
                                                                    tituloResultado==="error"?<p className="text-danger text-center fw-bold">¡Ocurrió un error en la emisión!</p>:
                                                                    tituloResultado==="exito"?<p className="text-success text-center fw-bold">¡Éxito!</p>:null
                                                                }
                                                                {
                                                                    resultadoEmisionComprobante?<h4 className="text-center">{resultadoEmisionComprobante}</h4>:
                                                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                                                        <div className="spinner-border" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>
                                                                        <p>&nbsp;&nbsp;Enviando...</p>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="modal-footer">
                                                                {
                                                                    botonImprimir?<button type="button" class="btn btn-success" >
                                                                        <a href={linkDescarga} download className="text-white" target="_blank">Descargar</a>
                                                                        </button>:null
                                                                }
                                                                <button type="button" class="btn btn-secondary " data-bs-dismiss="modal" onClick={cerrarModal}>Cerrar</button>
                                                                {/* <button type="button" class="btn btn-primary">Understood</button> */}
                                                            </div>
                                                        </>):
                                                        (<>
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
                                                                <div className="d-flex justify-content-end">
                                                                    <button type="button" 
                                                                    class="btn btn-sm btn-danger mb-2 me-3" 
                                                                    onClick={()=>emitirComprobante(index, row)}>EMITIR</button>
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
                                                        </>)}
                                                    </div>
                                                </div>
                                            </div>

                                        <button type="button" data-item={index} name="borrarContenido" className="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target={`#preview${index}`} >
                                            <i class="fas fa-times"></i>
                                        </button>

                                        <div class="modal fade" id={`preview${index}`}  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Eliminar ítem</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ¿Está seguro de eliminar este registro?.Se eliminará definitivamente.
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                        <button type="button" class="btn btn-primary" onClick={()=>borrarFila(row)} data-bs-dismiss="modal">Confirmar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </td>
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

export default VendedoraBorrador
