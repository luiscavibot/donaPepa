import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker, {registerLocale} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { set } from 'date-fns/esm'
import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react'



const NuevaVenta = () => {

    const [lista, setLista] = useState([])
    // const [numLista, setNumLista] = useState(0)
    // const [cod, setCod] = useState(0)
    const [descripcion, setDescripcion] = useState('')
    // const [unidades, setUnidades] = useState('')
    // const [cantidad, setCantidad] = useState(0)
    // const [descuento, setDescuento] = useState(0)
    const [precioUnitario, setPrecioUnitario] = useState(0)
    // const [precioUnitarioIgv, setPrecioUnitarioIgv] = useState(0)
    // const [total, setTotal] = useState(0)
    const [usuario, setUsuario] = useState('')
    const [serie, setSerie] = useState('')
    const [numero, setNumero] = useState(0)
    const [tipoRegalo, setTipoRegalo] = useState('')
    const [cantidadRegalo, setCantidadRegalo] = useState(0)
    const [tipoDocumentoCliente, setTipoDocumentoCliente] = useState('')
    const [tipoDocumentoClienteSunat, setTipoDocumentoClienteSunat] = useState('')
    const [numeroDocumentoCliente, setNumeroDocumentoCliente] = useState('')
    const [dateInicio, setDateInicio] = useState(new Date())
    const [fechaSunat, setFechaSunat] = useState('')
    const [nombreCliente, setNombreCliente] = useState('')
    const [tipoMoneda, setTipoMoneda] = useState('')
    const [tipoMonedaSunat, setTipoMonedaSunat] = useState()
    const [igv, setIgv] = useState(0.18)
    const [celular, setCelular] = useState('')
    const [emailCliente, setEmailCliente] = useState('')
    const [condicionPago, setCondicionPago] = useState('')
    const [numeroOperacion, setNumeroOperacion] = useState('')
    const [provincia, setProvincia] = useState('')
    const [canalVenta, setCanalVenta] = useState('')
    const [delivery, setDelivery] = useState(false)
    const [conBolsa, setConBolsa] = useState(false)
    const [cantidadBolsa, setCantidadBolsa] = useState(0)
    const [direccionCliente, setDireccionCliente] = useState('')
    const [referencias, setReferencias] = useState('')
    const [gravada, setGravada] = useState(0)
    const [descuentoTotal, setDescuentoTotal] = useState(0)
    const [totalIgv, setTotalIgv] = useState(0)
    const [totalDelivery, setTotalDelivery] = useState(0)
    const [totalPagar, setTotalPagar] = useState(0)
    const [filaProducto, setFilaProducto] = useState()
    const [botonAgregar, setBotonAgregar] = useState(false)

    const [listaProductos, setListaProductos] = useState([])
    const [listaPresentacion, setListaPresentacion] = useState([[]])
    const [presentacion, setPresentacion] = useState([])
    const [codigoLista, setCodigoLista] = useState([])
    const [listaCantidad, setListaCantidad] = useState([0])
    const [descuentoLista, setDescuentoLista] = useState([0])
    const [precioUnitarioLista, setPrecioUnitarioLista] = useState([0])
    const [precioVentaLista, setPrecioVentaLista] = useState([0])
    const [igvLista, setIgvLista] = useState([0])
    const [totalLista, setTotalLista] = useState([0])
    const [modoValidar, setModoValidar] = useState([true])
    const [numeracion, setNumeracion] = useState(false)
    const [detenerCreacion, setDetenerCreacion] = useState(false)
    const [deshabilitarValidacion, setDeshabilitarValidacion] = useState(true)
    const [fijarPresentacion, setFijarPresentacion] = useState(false)
    const [resultadoEmisionComprobante, setResultadoEmisionComprobante] = useState("")
    const [tituloResultado, setTituloResultado] = useState("")
    const [botonImprimir, setBotonImprimir] = useState(false)
    const [linkDescarga, setLinkDescarga] = useState("")

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
        getDateFormatSunat(dateInicio);
    }, [])

    const ExampleCustomInput = ({ value, onClick }) => (
        <div className="d-flex border align-items-center justify-content-between form-control" onClick={onClick}>
          <div>{value}</div>
          <div>
              <i className="far fa-calendar p-1 rounded-3 text-center"></i>
          </div>
        </div>
    );

    const deliveryChecked = (e) => {
        console.log("entro a delivery checked")
        console.log(e.target.value)
        if (e.target.value === "true") {
            setDelivery(true)
            return
        }
        setDelivery(false)
        return
    }

    const bolsaChecked = (e) => {
        console.log("entro a bolsa checked")
        console.log(e.target.value)
        if (e.target.value === "true") {
            setConBolsa(true)
            return
        }
        setConBolsa(false)
        return
    }
    
    const getDateFormatSunat = date => {
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let dateNewFormatSunat = ""

        if(month < 10){
        dateNewFormatSunat = `${day}-0${month}-${year}`
        }else{
        dateNewFormatSunat = `${day}-${month}-${year}`
        }
        setDateInicio(date)
        setFechaSunat(dateNewFormatSunat)
    }

    const enviarDatos = (e) => {
        e.preventDefault()
        console.log("inicio el axios para enviar la data final a nubefact");
        const emitir = async () =>{
          const documento = {
          operacion: "generar_comprobante",
          tipo_de_comprobante: 1,
          serie: "FFF1",
          numero:7,
          sunat_transaction: 1,
          cliente_tipo_de_documento: tipoDocumentoClienteSunat,
          cliente_numero_de_documento: numeroDocumentoCliente,
          cliente_denominacion: nombreCliente,
          cliente_direccionCliente: direccionCliente,
          cliente_email: emailCliente,
          cliente_email_1: "",
          cliente_email_2: "",
          fecha_de_emision: fechaSunat,
          fecha_de_vencimiento: "",
          moneda: tipoMonedaSunat,
          tipo_de_cambio: "",
          porcentaje_de_igv: 18.00,
          descuento_global: "",
          total_descuento: "",
          total_anticipo: "",
          total_gravada: gravada,
          total_inafecta: "",
          total_exonerada: "",
          total_igv: 108,
          total_gratuita: "",
          total_otros_cargos: "",
          total: 708,
          percepcion_tipo: "",
          percepcion_base_imponible: "",
          total_percepcion: "",
          total_incluido_percepcion: "",
          total_impuestos_bolsas: "",
          detraccion: false,
          observaciones: "",
          documento_que_se_modifica_tipo: "",
          documento_que_se_modifica_serie: "",
          documento_que_se_modifica_numero: "",
          tipo_de_nota_de_credito: "",
          tipo_de_nota_de_debito: "",
          enviar_automaticamente_a_la_sunat: true,
          enviar_automaticamente_al_cliente: true,
          condiciones_de_pago: "",
          medio_de_pago: "",
          placa_vehiculo: "",
          orden_compra_servicio: "",  
          formato_de_pdf: "",
          generado_por_contingencia: "",
          bienes_region_selva: "",
          servicios_region_selva: "",
          items: [
                {
                  unidad_de_medida: "NIU",
                  codigo: "001",
                  codigo_producto_sunat: "10000000",
                  descripcion: "DETALLE DEL PRODUCTO",
                  cantidad: 1,
                  valor_unitario: 500,
                  precio_unitario: 590,
                  descuento: "",
                  subtotal: 500,
                  tipo_de_igv: 1,
                  igv: 90,
                  total: 590,
                  anticipo_regularizacion: false,
                  anticipo_documento_serie: "",
                  anticipo_documento_numero: ""
                },
                {
                  unidad_de_medida: "NIU",
                  codigo: "001",
                  codigo_producto_sunat: "20000000",
                  descripcion: "DETALLE DEL PRODUCTO",
                  cantidad: 1,
                  valor_unitario: 20,
                  precio_unitario: 23.60,
                  descuento: "",
                  subtotal: 100,
                  tipo_de_igv: 1,
                  igv: 18,
                  total: 118,
                  anticipo_regularizacion: false,
                  anticipo_documento_serie: "",
                  anticipo_documento_numero: ""
                }
          ],
          guias: [
                  {
                      guia_tipo: 1,
                      guia_serie_numero: "0001-23"
                  }
          ]    
        };

        const config = {
          headers: { 
            "Content-Type" : "application/json"
          }
        };

        await axios.post('http://46.183.113.134:3000/api/ventas', documento, config)
        .then(function (params) {
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
        
      };
      emitir();    

    }

    const agregarProducto = async () => {
        console.log("AGREGAR PRODUCTO");
        let tamanoLista = lista.length;
        setLista([
            ...lista, {          
                numeroLista: tamanoLista+1,
                codigoLista: "",
                descripcionLista: [],
                presentacionLista: "",
                cantidadLista: "1",
                precioUnitarioLista: "0",
                descuentoLista: "0",
                precioVentaLista: 0,
                igvLista: 0,
                totalLista: 0,
                modoValidar: true,
            }
        ]);
        setDetenerCreacion(true);
        setDeshabilitarValidacion(true);       
    }

    const presentaciones = (descripcion, numero) =>{
        const getPresentaciones = async () =>{
            try {
                console.log("activaremos el axios con la siguiente descricpion: ", descripcion);
                let res = await axios.get(`http://46.183.113.134:3000/api/productos?busquedaPorNombre=${descripcion}`);
                console.log("Resultado de axios para la descripcion recibida: ",res.data);
                let arrayData= res.data.map(item => (item.presentacion))
                let arrayProv = [...listaPresentacion,[]]
                arrayProv[numero-1]= arrayData
                setListaPresentacion(arrayProv);
                let listaProv = [...lista]
                listaProv[numero-1].presentacionLista = res.data[0].presentacion;
                console.log("la extracción es: ",res.data[0].presentacion);
                setLista(listaProv)
            } catch (error) {
                console.error(error);
            }
        }
        getPresentaciones();
    };
    const completarCampos = (numeroItem) =>{
        let elemento = lista[numeroItem-1];
        const getCodigoYprecioUnitario = async () =>{
            try {
                let res = await axios.get(`http://46.183.113.134:3000/api/productos?busquedaPorNombre=${elemento.descripcionLista}&busquedaPorPresentacion=${elemento.presentacionLista}`);
                
                let listaProvb = [...lista]
                listaProvb.presentacionLista = res.data[0].presentacion;
                setLista(listaProvb)
                
                let arrayProv = [...codigoLista];
                arrayProv[numeroItem-1] = res.data[0].codigo;
                setCodigoLista(arrayProv)

                let listaProv = [...lista]
                listaProv[numeroItem-1].codigoLista = res.data[0].codigo;
                listaProv[numeroItem-1].precioUnitarioLista = res.data[0].precioUnitario;
                setLista(listaProv);

                let arrayProvb = [...precioUnitarioLista];
                arrayProvb[numeroItem-1] = res.data[0].precioUnitario;
                setPrecioUnitarioLista(arrayProvb)

            } catch (error) {
                console.error(error);
            }
        }
        getCodigoYprecioUnitario();
        setDeshabilitarValidacion(false);
    }
    useEffect(() => {

        let sumaTotal = 0.00;
        totalLista.forEach(value =>{
            sumaTotal = sumaTotal + (value*1.0);
        })
        setTotalPagar(sumaTotal.toFixed(2));

    }, [totalLista,setTotalPagar])

    

    const calculoFinal = (numeroItem) => {
    
        // let precioVenta=((precioUnitarioLista[numeroItem-1]*listaCantidad[numeroItem-1])-descuentoLista[numeroItem-1]);
        let listaProv = [...lista];
        console.log(listaProv);

        let precioVenta = (listaProv[numeroItem-1].precioUnitarioLista*listaProv[numeroItem-1].cantidadLista)-listaProv[numeroItem-1].descuentoLista;
        
        listaProv[numeroItem-1].precioVentaLista = precioVenta.toFixed(2);
        listaProv[numeroItem-1].igvLista = (precioVenta*0.18).toFixed(2);
        listaProv[numeroItem-1].totalLista = (precioVenta*1.18).toFixed(2);
            
        let listaProvPrecioVentaLista = [...precioVentaLista]
        listaProvPrecioVentaLista[numeroItem-1]= precioVenta.toFixed(2);
        setPrecioVentaLista(listaProvPrecioVentaLista);
    
        let listaProvIgvLista = [...igvLista]
        listaProvIgvLista[numeroItem-1]= (precioVenta*0.18).toFixed(2);
        setIgvLista(listaProvIgvLista);
    
        let listaProvTotalLista = [...totalLista]
        listaProvTotalLista[numeroItem-1]= (precioVenta*1.18).toFixed(2);
        setTotalLista(listaProvTotalLista);

        let modoValidarProv = [...lista]
        modoValidarProv[numeroItem-1].modoValidar= false;
        setLista(modoValidarProv);
        setDetenerCreacion(false)
    }

    const eliminarFila = (numeroItem) => {
        let sumaTotal = 0.00;
        //algoritmo para sacar un elemento en especifico de la matriz lista y reenumerarla
        let listaProv = [...lista]        
        let numerador = 0;
        let i = numeroItem-1;
        let nuevaLista = listaProv.filter((value, index )=>{return index!==i});
        let listaRenumerada = nuevaLista.map( function(obj){
            numerador++;
            sumaTotal = sumaTotal + (obj.totalLista*1.0);
            let robj = {};
            robj["numeroLista"]= numerador;
            robj["codigoLista"]= obj.codigoLista;
            robj["descripcionLista"]= obj.descripcionLista;
            robj["presentacionLista"]= obj.presentacionLista;
            robj["cantidadLista"]= obj.cantidadLista;
            robj["precioUnitarioLista"]= obj.precioUnitarioLista;
            robj["descuentoLista"]= obj.descuentoLista;
            robj["precioVentaLista"]= obj.precioVentaLista;
            robj["igvLista"]= obj.igvLista;
            robj["totalLista"]= obj.totalLista;
            robj["modoValidar"]= obj.modoValidar;
            return robj
        })
        setLista(listaRenumerada);
        setTotalPagar(sumaTotal.toFixed(2));

        let provListaPresentacion = [...listaPresentacion]       
        // let numeradorb = 0;
        let nuevaListab = provListaPresentacion.filter((value, index )=>{return index!==i});    
        setListaPresentacion(nuevaListab);
 



    }

    const completarDatosCliente = (e) =>{
        let inputNroDoc = e.target
        console.log(inputNroDoc)
        let inputNombreCliente = document.querySelector("input[name='nombreCliente']")
        let inputEmailCliente = document.querySelector("input[name='emailCliente']")
        let inputCelular = document.querySelector("input[name='celular']")
        let list = inputNroDoc.getAttribute('list')
        let options = document.querySelectorAll('#' + list + ' option')
        let inputValue = inputNroDoc.value
        console.log(inputNroDoc.value)
        console.log(inputCelular.value)
        // console.log(options[0])

        // inputNombreCliente.value = "Hanhu"
        // inputEmailCliente.value = "hans.e.huiza.n@gmail.com"
        // inputCelular = "991570362"

        // setNombreCliente(inputNombreCliente.value)
        // setEmailCliente(inputEmailCliente.value)
        // setCelular(inputCelular)

        // console.log(inputNombreCliente);


        for(let i = 0; i < options.length; i++) {
            let option = options[i];
    
            if(option.innerText === inputValue) {
                inputNroDoc.value = option.getAttribute('data-doc-cliente')
                inputNombreCliente.value = option.getAttribute('data-nombre-cliente')
                inputEmailCliente.value = option.getAttribute('data-email-cliente')
                inputCelular.value = option.getAttribute('data-celular')

                break;
            }
        }

        setNumeroDocumentoCliente(inputNroDoc.value)
        setNombreCliente(inputNombreCliente.value)
        setEmailCliente(inputEmailCliente.value)
        setCelular(inputCelular.value)
        // console.log("celular");
    }

    const manejadorEntrada = (event) =>{
        let numeroItem = event.target.id;
        let name=event.target.name;
        switch (name) {
            case 'descripcion':
                let listaProvDescripcion = [...lista]
                listaProvDescripcion[numeroItem-1].descripcionLista = event.target.value;
                setLista(listaProvDescripcion)
                presentaciones(event.target.value, numeroItem)
                completarCampos(numeroItem)
                break;
            case 'presentacion':
                let listaProvPresentacion = [...lista]
                listaProvPresentacion[numeroItem-1].presentacionLista = event.target.value;
                setLista(listaProvPresentacion)
                setPresentacion([...presentacion, event.target.value])
                completarCampos(numeroItem)
                break;
            case 'cantidad':
                let listaProvCantidad = [...lista];
                listaProvCantidad[numeroItem-1].cantidadLista = event.target.value;
                setLista(listaProvCantidad);
                let listaProv = [...listaCantidad]
                listaProv[numeroItem-1]=event.target.value;
                setListaCantidad(listaProv);
                break;
            case 'descuento':
                let listaProvDescuento = [...lista];
                listaProvDescuento[numeroItem-1].descuentoLista = event.target.value;
                setLista(listaProvDescuento);
                let listaProvb = [...descuentoLista]
                listaProvb[numeroItem-1]=event.target.value;
                setDescuentoLista(listaProvb);
                // completarCampos(numeroItem)
                break;
            case 'numeroDocumentoCliente':
                completarDatosCliente(event)
                break;
            case 'tipoDocumentoCliente':
                console.log("ENTRO TIPO DOCUMENTO CLIENTE");
                let td = event.target.value
                setTipoDocumentoCliente(td)
                if(td == "DNI") {
                    setTipoDocumentoClienteSunat("1")
                    break;
                }
                if(td == "RUC") {
                    setTipoDocumentoClienteSunat("6")
                    break;
                }
            case 'tipoMoneda':
                console.log("ENTRO TIPO MONEDA");
                let tm = event.target.value
                setTipoMoneda(tm)
                if(tm == "soles") {
                    setTipoMonedaSunat(1)
                    break;
                }
            default:
                break;
        }
        // calculoFinal(numeroItem)
        // setValorDescripcion(event.target.value)        
    }

    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h5">Vendedora / Nueva venta</h1>
                {/* <div>
                    <button type="button" className="btn btn-secondary btn-sm me-1">Copiar</button>
                    <button type="button" className="btn btn-secondary btn-sm me-1" >Imprimir</button>
                    <button type="button" className="btn btn-secondary btn-sm">Excel</button>
                </div> */}
            </div>
            
            {/* http://46.183.113.134:3000/api/ventas */}

            <form onSubmit={ enviarDatos }>
                <div className="wrapper-client-info row">
                    <div className="owner-info col-5">
                        <div className="text-uppercase">Jaramillo Torero de Paez Manuela Maria</div>
                        <div>Av. Tacna Nro. 488</div>
                    </div>
                    <div className="ruc-info col-7 d-flex justify-content-center text-center">
                        <div>
                            <div>RUC 10095588986</div>
                            <div className="text-uppercase">Nota de venta electrónica</div>
                            <div>
                                <span>NV10</span>-<span>9281</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">DESCRIPCIÓN</th>
                                <th scope="col">PRESENTACIÓN</th>
                                <th scope="col">COD</th>
                                <th scope="col">CANT</th>
                                <th scope="col">PU</th>
                                <th scope="col">DSCTO</th>
                                <th scope="col">PV</th>
                                <th scope="col">IGV</th>
                                <th scope="col">TOT</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lista.map(valor => (
                                    <tr>
                                        <th>{valor.numeroLista}</th>
                                        <td>
                                            <input id={valor.numeroLista} name = "descripcion" type="search" onChange={manejadorEntrada} 
                                            placeholder="Ingrese un producto" list="listaproductos" disabled={!valor.modoValidar} value={valor.descripcionLista} />
                                            <datalist id="listaproductos">
                                                    {
                                                        listaProductos.map((item) =>
                                                        (<option value={item} />)
                                                        )
                                                    }
                                            </datalist>
                                        </td>
                                        <td>
                                            <select id={valor.numeroLista} name ="presentacion" onChange={manejadorEntrada} value={valor.presentacionLista} disabled={!valor.modoValidar}>
                                                    
                                                    {   
                                                        listaPresentacion[valor.numeroLista-1].map(
                                                            (item) =>(<option value={item}>{item}</option>)
                                                            )
                                                        }
                                            </select>
                                        </td>
                                        <td>{valor.codigoLista}</td>
                                        <td>
                                            <input id={valor.numeroLista} min="1" step="1" type="number" name="cantidad" value={valor.cantidadLista}
                                             onChange={manejadorEntrada}  list="off" autoComplete="off" disabled={!valor.modoValidar}/>
                                        </td>
                                        <td>
                                            {valor.precioUnitarioLista}
                                        </td>
                                        <td>
                                            <input id={valor.numeroLista} type="number" name="descuento" min="0" value={valor.descuentoLista} 
                                            onChange={manejadorEntrada} disabled={!valor.modoValidar} />
                                        </td>
                                        <td>{valor.precioVentaLista}</td>
                                        <td>{valor.igvLista}</td>
                                        <td>{valor.totalLista}</td>
                                        <td>
                                            {
                                                valor.modoValidar?
                                                <button onClick= {()=>calculoFinal(valor.numeroLista)} className="btn btn-success btn-sm" type="button" >Validar</button>:
                                                <button onClick= {()=>eliminarFila(valor.numeroLista)} className="btn btn-danger btn-sm" type="button" >Eliminar</button>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {/* <div className="border-bottom my-4"></div> */}
                    <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-outline-danger" onClick={agregarProducto} disabled={detenerCreacion} >+ AGREGAR PRODUCTO</button>
                        <p class="fs-5 me-5" >{ `TOTAL: S/. ${totalPagar}`}</p>
                    </div>
                </div>
                <div className="border-bottom my-4"></div>
                <div className="mb-3">
                    <div className="mb-3 sub-title">Datos de regalos</div>
                    <div className="row">
                        <div className="col-3 mb-3">
                            {/* <label for="exampleInputEmail1" className="form-label">Email address</label> */}
                            <label for="tipoRegalo" className="form-label">Tipo de regalo</label>
                            <select onChange={ e => setTipoRegalo(e.target.value) } name="tipoRegalo" className="form-select" aria-label="Default select example">
                                <option selected>Elige el tipo de regalo</option>
                                <option value="Regalo Probadores">Regalo Probadores</option>
                                <option value="Regalo Muestra x 50">Regalo Muestra x 50</option>
                                <option value="Regalo Muestra x 100">Regalo Muestra x 100</option>
                            </select>
                        </div>
                        <div className="col-1 mb-3">
                            <label for="cantidadRegalo" className="form-label">Cantidad</label>
                            <input className="form-control" onChange={ e => setCantidadRegalo(parseInt(e.target.value)) } value={cantidadRegalo} type="number" id="cantidadRegalo" name="cantidadRegalo" min="0" max="5"></input>
                        </div>
                    </div>
                </div>
                <div className="border-bottom my-4"></div>
                <div className="row">
                    <div className="col-6 mb-3">
                        <div className="mb-3 sub-title">Datos del cliente</div>
                        <div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label className="form-label">Tipo de documento</label>
                                    {/* <select onChange={ e => setTipoDocumentoCliente(e.target.value) } name="tipoDocumentoCliente" className="form-select"> */}
                                    <select onChange={ manejadorEntrada } name="tipoDocumentoCliente" className="form-select">
                                        <option selected>Elige el tipo de documento</option>
                                        <option value="DNI">DNI</option>
                                        <option value="RUC">RUC</option>
                                    </select>
                                </div>
                                <div className="col-6 mb-3">
                                    <label for="numeroDocumentoCliente" className="form-label">Nro. Documento</label>
                                    {/* <input onChange={ e => setNumeroDocumentoCliente(e.target.value) } type="text" className="form-control is-valid" name="numeroDocumentoCliente" id="numeroDocumentoCliente" required></input> */}
                                    <input className="form-control is-valid" name="numeroDocumentoCliente" type="search" onChange={manejadorEntrada}  list="listaclientes" />
                                    {/* <datalist id="listaclientes">
                                            {
                                                listaProductos.map((item) =>
                                                    (<option data-nombre-cliente="Hans" data-email-cliente="hans.e.huiza.n@gmail.com" data-celular="991570362" data-doc-cliente={item}>{item} 123</option>)
                                                )
                                            }
                                    </datalist> */}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="nombreCliente" className="form-label">Nombre del cliente</label>
                                <input onChange={ e => setNombreCliente(e.target.value) } type="text" className="form-control" name="nombreCliente" id="nombreCliente"></input>
                            </div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label for="emailCliente" className="form-label">Email</label>
                                    <input onChange={ e => setEmailCliente(e.target.value) } type="email" className="form-control" name="emailCliente" id="emailCliente" aria-describedby="emailHelp"></input>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="form-label" for="celular">Celular</label>
                                    <input onChange={ e => setCelular(e.target.value) } className="form-control" type="tel" name="celular" id="celular"></input>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Provincia</label>
                                <select onChange={ e => setProvincia(e.target.value) } name="provincia" className="form-select">
                                    <option selected>Elige la provincia</option>
                                    <option value="Barranca">Barranca</option>
                                    <option value="Cajatambo">Cajatambo</option>
                                    <option value="Canta">Canta</option>
                                    <option value="Cañete">Cañete</option>
                                    <option value="Huaral">Huaral</option>
                                    <option value="Huarochirí">Huarochirí</option>
                                    <option value="Huaura">Huaura</option>
                                    <option value="Lima">Lima</option>
                                    <option value="Oyón">Oyón</option>
                                    <option value="Yauyos">Yauyos</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="direccionCliente" className="form-label">Dirección</label>
                                <input onChange={ e => setDireccionCliente(e.target.value) } type="text" className="form-control" name="direccionCliente" id="direccionCliente"></input>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <div className="mb-3 sub-title">Datos de la venta</div>
                        <div>
                            <div className="row">
                                <div className="col-7 mb-3">
                                    <label className="form-label">Fecha</label>
                                    <div>
                                        <DatePicker 
                                            selected={dateInicio} 
                                            onChange={(date) => getDateFormatSunat(date)} 
                                            locale="es"
                                            customInput={<ExampleCustomInput />} 
                                            dateFormat="dd/MM/yyyy"
                                            wrapperClassName="form-control"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7 mb-3">
                                    <label className="form-label">Moneda</label>
                                    <select onChange={ manejadorEntrada } name="tipoMoneda" className="form-select">
                                        <option selected>Elige el tipo de moneda</option>
                                        <option value="soles">Soles</option>
                                        {/* <option value="dolares">Dolares</option> */}
                                    </select>
                                </div>
                                <div className="col-5 mb-3">
                                    <label for="igv" className="form-label">IGV</label>
                                    <input onChange={ e => setIgv(e.target.value) } type="text" className="form-control" name="igv" id="igv" value="0.18" disabled readonly></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7 mb-3">
                                    <label className="form-label">Condicion de pago</label>
                                    <select onChange={ e => setCondicionPago(e.target.value) } name="condicionPago" className="form-select">
                                        <option selected>Elige la condicion de pago</option>
                                        <option value="tarjeta">Tarjeta</option>
                                        <option value="contado">Contado</option>
                                    </select>
                                </div>
                                <div className="col-5 mb-3">
                                    <label for="noperacion" className="form-label">Nro. Operación</label>
                                    <input onChange={ e => setNumeroOperacion(e.target.value) } type="text" className="form-control" name="noperacion" id="noperacion" disabled={(condicionPago == "tarjeta") ? "" : "disabled"}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7 mb-3">
                                    <label className="form-label">Canal de venta</label>
                                    <select onChange={ e => setCanalVenta(e.target.value) } name="canalVenta" className="form-select">
                                        <option selected>Elige la canal de venta</option>
                                        <option value="whatsapp">whatsapp</option>
                                        <option value="llamada">llamada</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7 mb-3">
                                    <label className="form-label">¿Incluye bolsa?</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={ e => bolsaChecked(e) } className="form-check-input" type="radio" value="true" name="bolsa" id="bolsa1"></input>
                                            <label className="form-check-label" for="bolsa1">
                                                Sí
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={ e => bolsaChecked(e) } className="form-check-input" type="radio" value="false" name="bolsa" id="bolsa2"></input>
                                            <label className="form-check-label" for="bolsa2">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-5 mb-3">
                                    <label for="cantidadBolsa" className="form-label">Cantidad</label>
                                    <input className="form-control" onChange={ e => setCantidadBolsa(parseInt(e.target.value)) } value={cantidadBolsa} type="number" id="cantidadBolsa" name="cantidadBolsa" min="0" disabled={(conBolsa) ? "" : "disabled"}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-3 mb-3">
                        <label className="form-label">¿Envío por delivery?</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input onChange={ e => deliveryChecked(e) } className="form-check-input" type="radio" value="true" name="delivery" id="delivery1"></input>
                                <label className="form-check-label" for="delivery1">
                                    Sí
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onChange={ e => deliveryChecked(e) } className="form-check-input" type="radio" value="false" name="delivery" id="delivery2"></input>
                                <label className="form-check-label" for="delivery2">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-3 mb-3">
                        <label for="direccionCliente" className="form-label">Dirección</label>
                        <input onChange={ e => setDireccionCliente(e.target.value) } type="text" className="form-control" name="direccionCliente" id="direccionCliente"></input>
                    </div> */}
                    {/* <div className="col-3 mb-3">
                        <label for="referencias" className="form-label">Referencias</label>
                        <input onChange={ e => setReferencias(e.target.value) } type="text" className="form-control" name="referencias" id="referencias"></input>
                    </div> */}
                </div>
                <div className="mb-3">
                    <div className="info-total mb-4">
                        <div className="row">
                            <div className="col-11">Gravada:</div>
                            <div className="col-1">{gravada}</div>
                        </div>
                        <div className="row">
                            <div className="col-11">Descuento:</div>
                            <div className="col-1">0.00</div>
                        </div>
                        <div className="row">
                            <div className="col-11">IGV(18%):</div>
                            <div className="col-1">442.37</div>
                        </div>
                        <div className="row">
                            <div className="col-11">Delivery:</div>
                            <div className="col-1">25.90</div>
                        </div>
                    </div>
                </div>    
                <div className="row mb-4">
                    <div className="col-4">
                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#previewModal">PREVISUALIZAR</button>
                        <div className="modal fade" id="previewModal" tabindex="-1" aria-labelledby="previewModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                {/* <div class="modal-header">
                                    <h5 class="modal-title" id="previewModalLabel">Modal title</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div> */}
                                <div className="">
                                    <div className="bg-gray p-4">
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="text-uppercase sub-title">Jaramillo Torero de Paez Manuela Maria</div>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <div>Av. Tacna Nro. 488</div>
                                                <div>Lima - Lima - Lima</div>
                                                <div>RUC 10095588986</div>
                                                <div className="text-uppercase">NOTA DE VENTA ELECTRONICA</div>
                                            </div>
                                            <div className="col"></div>
                                        </div>
                                        <div className="h5">NV10-9281</div>
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-3">ADQUIRIENTE</div>
                                        <div>
                                            <div>Nro. Documento: {numeroDocumentoCliente}</div>
                                            <div className="text-uppercase">{nombreCliente}</div>
                                            <div>Fecha de emisión: {fechaSunat}</div>
                                            <div>Moneda: {tipoMoneda}</div>
                                            <div>IGV: 18%</div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">CANTIDAD</th>
                                                    <th scope="col">DESCRIPCIÓN</th>
                                                    <th scope="col">PU</th>
                                                    <th scope="col">TOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    lista.map((item) =>
                                                        (
                                                            <tr>
                                                                <td>{item.cantidadLista}</td>
                                                                <td>{item.descripcionLista}</td>
                                                                <td>PU</td>
                                                                <td>{item.totalLista}</td>
                                                            </tr>
                                                        )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="border-bottom"></div>
                                    <div className="p-4 text-end">
                                        <div className="row">
                                            <div className="col-8">Gravada:</div>
                                            <div className="col-1">S/</div>
                                            <div className="col-3">{gravada}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">Descuento:</div>
                                            <div className="col-1">S/</div>
                                            <div className="col-3">{descuentoTotal}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">IGV(18%):</div>
                                            <div className="col-1">S/</div>
                                            <div className="col-3">{totalIgv}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">Delivery:</div>
                                            <div className="col-1">S/</div>
                                            <div className="col-3">25.90</div>
                                        </div>
                                    </div>
                                    <div className="border-bottom"></div>
                                    <div className="p-4 text-end">
                                        <div className="row">
                                            <div className="col-8">Total:</div>
                                            <div className="col-1">S/</div>
                                            <div className="col-3">{totalLista}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="w-100 text-center">
                                        <div>
                                            Representación impresa de la
                                        </div>
                                        <div>
                                            NOTA DE VENTA ELECTRONICA
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-outline-danger me-2">GUARDAR EN BORRADOR</button>
                            <button type="submit" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">EMITIR</button>
                            {/* <input className="btn btn-danger" type="submit" value="EMITIR"></input> */}
                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">Emisión de comprobante</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body d-flex justify-content-center align-content-center">
                                            {
                                                tituloResultado==="error"?<p className="text-danger text-center fw-bold">¡Ocurrió un error en la emisión!</p>:
                                                tituloResultado==="exito"?<p className="text-success text-center fw-bold">¡Éxito!</p>:null
                                            }
                                            {
                                                resultadoEmisionComprobante?<h4>{resultadoEmisionComprobante}</h4>:
                                                <div>
                                                    <div className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    <p>Enviando...</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="modal-footer">
                                            {
                                                botonImprimir?<button type="button" class="btn btn-success" >
                                                    <a href={linkDescarga} download className="text-white" target="_blank">Imprimir</a>
                                                    </button>:null
                                            }
                                            <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">Cerrar</button>
                                            {/* <button type="button" class="btn btn-primary">Understood</button> */}
                                        </div>
                                    </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        
    )
}

export default NuevaVenta
