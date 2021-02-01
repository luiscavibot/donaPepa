import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker, {registerLocale} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { set } from 'date-fns/esm'
import 'semantic-ui-css/semantic.min.css'
import { Modal,Button } from 'react-bootstrap';
import { useBootstrapPrefix } from 'react-bootstrap/esm/ThemeProvider'



const NuevaVenta = () => {

    const IGV = 0.18
    const ICBPER= 0.3
    const [descripcion, setDescripcion] = useState('')
    const [precioUnitario, setPrecioUnitario] = useState(0)
    //******************************** */
    //Hooks de estado para Nubefact-inicio
    const [usuario, setUsuario] = useState('')
    const [serie, setSerie] = useState('')
    const [numero, setNumero] = useState(7)
    const [tipoComprobante, setTipoComprobante] = useState(null)
    const [clienteTipoDocumento, setClienteTipoDocumento] = useState("1")
    const [clienteNumeroDocumento, setClienteNumeroDocumento] = useState(null)
    const [clienteDenominacion, setClienteDenominacion] = useState(null)
    const [clienteEmail, setClienteEmail] = useState(null)
    const [clienteDireccion, setClienteDireccion] = useState(null)
    const [lista, setLista] = useState([])
    const [item, setItem] = useState([])
    const [sumaTotalFinal, setSumaTotalFinal] = useState(0.0)
    //***************************************** */
    //Hooks de estado Adicionales para la BD-inicio
    const [provincia, setProvincia] = useState("Lima")
    const [clienteCelular, setClienteCelular] = useState(null)
    const [moneda, setMoneda] = useState("1")
    const [departamento, setDepartamento] = useState("Lima")
    const [distritoDestino, setDistritoDestino] = useState(10)
    const [totalDescuento, setTotalDescuento] = useState(0)
    //******************************************/
    //Hooks de estado para funcionaldiades extra
    const [ofrecerRegalo, setOfrecerRegalo] = useState(false)
    const [minimaCantidadRegalos, setMinimaCantidadRegalos] = useState(0)
    const [show, setShow] = useState(false);
    const [autorizador, setAutorizador] = useState("")
    const [habilitarDelivery, setHabilitarDelivery] = useState(false)
    const [alteroDescuento, setAlteroDescuento] = useState(false)
    const [habilitarBotonAutorizacion, setHabilitarBotonAutorizacion] = useState(false)
    const [totalGravada, setTotalGravada] = useState(0)
    const [totalIgv, setTotalIgv] = useState(0)
    // const [toalIgv, setToalIgv] = useState(0)
    //*************************************************** */
    const [tipoRegalo, setTipoRegalo] = useState('')
    const [cantidadRegalo, setCantidadRegalo] = useState(0)
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
    const [canalVenta, setCanalVenta] = useState('')
    const [delivery, setDelivery] = useState(true)
    const [conBolsa, setConBolsa] = useState(false)
    const [cantidadBolsa, setCantidadBolsa] = useState(0)
    const [direccionCliente, setDireccionCliente] = useState('')
    const [referencias, setReferencias] = useState('')
    // const [gravada, setGravada] = useState(0)
    const [descuentoTotal, setDescuentoTotal] = useState(0)
    const [totalDelivery, setTotalDelivery] = useState(0)
    const [totalPagar, setTotalPagar] = useState(0)

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
    // const [modoValidar, setModoValidar] = useState([true])
    // const [numeracion, setNumeracion] = useState(false)
    const [detenerCreacion, setDetenerCreacion] = useState(false)
    // const [fijarPresentacion, setFijarPresentacion] = useState(false)
    const [resultadoEmisionComprobante, setResultadoEmisionComprobante] = useState("")
    const [tituloResultado, setTituloResultado] = useState("")
    const [botonImprimir, setBotonImprimir] = useState(false)
    const [linkDescarga, setLinkDescarga] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            setHabilitarDelivery(true)
            setTotalDelivery(distritoDestino)
            return
        }
        setTotalDelivery(0);
        setDelivery(false);
        setHabilitarDelivery(false);
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
        // setDateInicio(date)
        setFechaSunat(dateNewFormatSunat)
    }

    const enviarDatos = (e) => {
        e.preventDefault()
        console.log("inicio el axios para enviar la data final a nubefact");
        let itemsProv = lista.map(function(valor) {
            let obj={
                unidad_de_medida: "NIU",
                codigo: valor.codigoLista,
                codigo_producto_sunat: "",
                descripcion: valor.descripcionLista +" "+ valor.presentacionLista,
                cantidad: valor.cantidadLista*1.0,
                valor_unitario: parseFloat((valor.precioUnitarioLista*(1/(1+IGV))).toFixed(2)),
                precio_unitario: valor.precioUnitarioLista,
                descuento: valor.descuentoLista*(1/(1+IGV)),
                subtotal: parseFloat(valor.precioVentaLista),
                tipo_de_igv: 1,
                igv: valor.igvLista*1.0,
                impuesto_bolsas: parseFloat(valor.impuestoBolsas),
                total: valor.totalLista*1.0,
                anticipo_regularizacion: false,
                anticipo_documento_serie: "",
                anticipo_documento_numero: ""            
            }
            return obj
        })
        if (cantidadBolsa>0) {
            itemsProv.push({
                unidad_de_medida: "NIU",
                codigo: "",
                codigo_producto_sunat: "",
                descripcion: "Bolsa plástica",
                cantidad: cantidadBolsa,
                valor_unitario: 0,
                precio_unitario: 0,
                descuento: 0,
                subtotal: 0,
                tipo_de_igv: 1,
                igv: 0,
                impuesto_bolsas: parseFloat(cantidadBolsa*ICBPER),
                total: 0,
                anticipo_regularizacion: false,
                anticipo_documento_serie: "",
                anticipo_documento_numero: "" 
            })
        }


        setItem(itemsProv);
        const emitir = async () =>{
            const documento = {
                operacion: "generar_comprobante",
                tipo_de_comprobante: parseInt(tipoComprobante,10),
                serie: "FFF1",
                numero: 8,
                sunat_transaction: 1,
                cliente_tipo_de_documento: parseInt(clienteTipoDocumento,10),
                cliente_numero_de_documento: clienteNumeroDocumento,
                cliente_denominacion: clienteDenominacion,
                cliente_direccion: clienteDireccion,
                cliente_email: clienteEmail,
                cliente_email_1: "",
                cliente_email_2: "",
                fecha_de_emision: fechaSunat,
                fecha_de_vencimiento: "",
                moneda: 1,
                tipo_de_cambio: 3.14,
                porcentaje_de_igv: (IGV*100),
                descuento_global: "",
                total_descuento: "",
                total_anticipo: "",
                total_gravada: parseFloat(totalGravada),
                total_inafecta: "",
                total_exonerada: "",
                total_igv: parseFloat(totalIgv),
                total_gratuita: "",
                total_otros_cargos: "",
                total: (totalGravada*1.0) + (totalIgv*1.0),
                percepcion_tipo: "",
                percepcion_base_imponible: "",
                total_percepcion: "",
                total_incluido_percepcion: "",
                total_impuestos_bolsas: parseFloat(cantidadBolsa*ICBPER),
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
                medio_de_pago: condicionPago,
                placa_vehiculo: "",
                orden_compra_servicio: "",  
                formato_de_pdf: "TICKET",
                generado_por_contingencia: "",
                bienes_region_selva: "",
                servicios_region_selva: "",
                items: itemsProv,
                // guias: [
                //     {
                //         guia_tipo: 1,
                //         guia_serie_numero: "0001-23"
                //     }
                // ]
            }

            const config = {
                headers: { 
                    "Content-Type" : "application/json"
                }
            };
            console.log(documento);
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
                        // registrarVenta();
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
                descuentoLista: 0,
                precioVentaLista: 0,
                igvLista: 0,
                totalLista: 0,
                modoValidar: true,
                impuestoBolsas: 0
            }
        ]);
        setDetenerCreacion(true);
    }

    const presentaciones = (descripcion, numero) =>{
        const getPresentaciones = async () =>{
            try {
                //Aquí se creará la nueva lista acorde a la elección de un producto y seguidamente se setearan valores según 1er valor de la misma lista
                let res = await axios.get(`http://46.183.113.134:3000/api/productos?busquedaPorNombre=${descripcion}`);
                console.log("Resultado de axios para la descripcion recibida: ",res.data);
                let arrayData= res.data.map(item => (item.presentacion))
                let arrayProv = [...listaPresentacion,[]]
                arrayProv[numero-1]= arrayData
                setListaPresentacion(arrayProv);//renderiza una lista acorde a la descripción elegida
                let listaProv = [...lista]
                listaProv[numero-1].presentacionLista = res.data[0].presentacion; //Setea la propiedad "presentacionLista" con un valor igual al 1° resultado de la consulta a la BD
                //este es un codigo extra para forzar la actualziacion de cantidades de pago
                let resb = await axios.get(`http://46.183.113.134:3000/api/productos?busquedaPorNombre=${descripcion}&busquedaPorPresentacion=${res.data[0].presentacion}`);
                console.log("Resultado de axios para la descripcion recibida y primer elemento de lista de presentacion: ",resb.data);
                listaProv[numero-1].codigoLista = resb.data[0].codigo;
                listaProv[numero-1].precioUnitarioLista = resb.data[0].precioUnitario;
                //Nuevo Cálculo
                let total = listaProv[numero-1].precioUnitarioLista*listaProv[numero-1].cantidadLista-listaProv[numero-1].descuentoLista;
                listaProv[numero-1].totalLista = total.toFixed(2);
                listaProv[numero-1].igvLista = ((total*IGV)/(1+IGV)).toFixed(2);
                listaProv[numero-1].precioVentaLista = (total/(1+IGV)).toFixed(2);
                // let precioVenta = (listaProv[numero-1].precioUnitarioLista*listaProv[numero-1].cantidadLista*(1/(1+IGV)))-listaProv[numero-1].descuentoLista;
                // listaProv[numero-1].precioVentaLista = precioVenta.toFixed(2);
                // listaProv[numero-1].igvLista = (precioVenta*IGV).toFixed(2);
                // listaProv[numero-1].totalLista = (precioVenta*1.18).toFixed(2);
                let arrayTotalLista = [...totalLista];
                arrayTotalLista[numero-1] = listaProv[numero-1].totalLista
                setTotalLista(arrayTotalLista)
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
    }
    useEffect(() => {

        let sumaTotal = 0.00;
        totalLista.forEach(value =>{
            sumaTotal = sumaTotal + (value*1.0);
        })
        setTotalPagar(sumaTotal.toFixed(2));

    }, [totalLista,setTotalPagar])
    useEffect(() => {

        let sumaTotalGravadaProv = ((totalDelivery*1.0)+(totalPagar*1.0))*(1/(1+IGV))
        setTotalGravada(sumaTotalGravadaProv.toFixed(2));
        let sumaTotalIgvProv = ((totalPagar*1.0)+(totalDelivery*1.0))*(IGV/(1+IGV))
        setTotalIgv(sumaTotalIgvProv.toFixed(2))
        let sumaTotalFinalProv = (totalDelivery*1.0) + (totalPagar*1.0) + (cantidadBolsa*ICBPER)
        setSumaTotalFinal(sumaTotalFinalProv)
    }, [totalDelivery,totalPagar,cantidadBolsa])

    

    // const calculoFinal = (numeroItem) => {
    
    //     // let precioVenta=((precioUnitarioLista[numeroItem-1]*listaCantidad[numeroItem-1])-descuentoLista[numeroItem-1]);
    //     let listaProv = [...lista];
    //     console.log("LLAMADO A CALCULO FINAL (Precio Unitario)",listaProv.precioUnitarioLista);

    //     let precioVenta = ((listaProv[numeroItem-1].precioUnitarioLista)*(listaProv[numeroItem-1].cantidadLista)*(1/1+IGV))-listaProv[numeroItem-1].descuentoLista;
        
    //     listaProv[numeroItem-1].precioVentaLista = precioVenta.toFixed(2);
    //     listaProv[numeroItem-1].igvLista = (precioVenta*IGV).toFixed(2);
    //     listaProv[numeroItem-1].totalLista = (precioVenta*1.18).toFixed(2);
            
    //     let listaProvPrecioVentaLista = [...precioVentaLista]
    //     listaProvPrecioVentaLista[numeroItem-1]= precioVenta.toFixed(2);
    //     setPrecioVentaLista(listaProvPrecioVentaLista);
    
    //     let listaProvIgvLista = [...igvLista]
    //     listaProvIgvLista[numeroItem-1]= (precioVenta*IGV).toFixed(2);
    //     setIgvLista(listaProvIgvLista);
    
    //     let listaProvTotalLista = [...totalLista]
    //     listaProvTotalLista[numeroItem-1]= (precioVenta*1.18).toFixed(2);
    //     setTotalLista(listaProvTotalLista);

    //     let modoValidarProv = [...lista]
    //     modoValidarProv[numeroItem-1].modoValidar= false;
    //     setLista(modoValidarProv);
    //     setDetenerCreacion(false)
    // }

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
            robj["impuestoBolsas"]= obj.impuestoBolsas;
            return robj
        })
        
        let provTotalLista = [...listaRenumerada]
        let nuevaListaTotalLista = provTotalLista.map(function(obj){
            let robjb = 0; 
            robjb = obj.totalLista;
            return robjb
        })
        setTotalLista(nuevaListaTotalLista)
        setLista(listaRenumerada);
        setTotalPagar(sumaTotal.toFixed(2));

        let provListaPresentacion = [...listaPresentacion]       
        // let numeradorb = 0;
        let nuevaListab = provListaPresentacion.filter((value, index )=>{return index!==i});    
        setListaPresentacion(nuevaListab);
    }

    // const completarDatosCliente = (e) =>{
    //     let inputNroDoc = e.target
    //     console.log(inputNroDoc)
    //     let inputNombreCliente = document.querySelector("input[name='nombreCliente']")
    //     let inputEmailCliente = document.querySelector("input[name='emailCliente']")
    //     let inputCelular = document.querySelector("input[name='celular']")
    //     let list = inputNroDoc.getAttribute('list')
    //     let options = document.querySelectorAll('#' + list + ' option')
    //     let inputValue = inputNroDoc.value
    //     console.log(inputNroDoc.value)
    //     console.log(inputCelular.value)
    //     // console.log(options[0])

    //     // inputNombreCliente.value = "Hanhu"
    //     // inputEmailCliente.value = "hans.e.huiza.n@gmail.com"
    //     // inputCelular = "991570362"

    //     // setNombreCliente(inputNombreCliente.value)
    //     // setEmailCliente(inputEmailCliente.value)
    //     // setCelular(inputCelular)

    //     // console.log(inputNombreCliente);


    //     for(let i = 0; i < options.length; i++) {
    //         let option = options[i];
    
    //         if(option.innerText === inputValue) {
    //             inputNroDoc.value = option.getAttribute('data-doc-cliente')
    //             inputNombreCliente.value = option.getAttribute('data-nombre-cliente')
    //             inputEmailCliente.value = option.getAttribute('data-email-cliente')
    //             inputCelular.value = option.getAttribute('data-celular')

    //             break;
    //         }
    //     }

    //     setNumeroDocumentoCliente(inputNroDoc.value)
    //     setNombreCliente(inputNombreCliente.value)
    //     setEmailCliente(inputEmailCliente.value)
    //     setCelular(inputCelular.value)
    //     // console.log("celular");
    // }

    const manejadorEntrada = (event) =>{
        let numeroItem = event.target.id;
        let name=event.target.name;
        switch (name) {
            case 'descripcion':
                let listaProvDescripcion = [...lista]
                listaProvDescripcion[numeroItem-1].descripcionLista = event.target.value;//seteo el valor elegido en el datalist de descripcion
                setLista(listaProvDescripcion) 
                presentaciones(event.target.value, numeroItem);//con esto se logra setear la lista a elegir en presentacion
                setDetenerCreacion(false);
                // completarCampos(numeroItem)
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
                listaProvCantidad[numeroItem-1].cantidadLista = event.target.value*1.0;
                
                if (listaProvCantidad[numeroItem-1].descripcionLista ==="Panetón buon natale" && listaProvCantidad[numeroItem-1].cantidadLista>9) {
                    listaProvCantidad[numeroItem-1].descuentoLista = 10.0;
                    setTotalDescuento(10)
                    setOfrecerRegalo(true)
                    setMinimaCantidadRegalos(3)
                    setCantidadRegalo(3)
                }else{
                    listaProvCantidad[numeroItem-1].descuentoLista = 0.00
                    setOfrecerRegalo(false)
                    setMinimaCantidadRegalos(0)
                    setCantidadRegalo(0)
                }

                let total = listaProvCantidad[numeroItem-1].precioUnitarioLista*(event.target.value)-listaProvCantidad[numeroItem-1].descuentoLista;
                listaProvCantidad[numeroItem-1].totalLista = total.toFixed(2);
                listaProvCantidad[numeroItem-1].igvLista = ((total*IGV)/(1+IGV)).toFixed(2);
                listaProvCantidad[numeroItem-1].precioVentaLista = (total/(1+IGV)).toFixed(2);
                let arrayTotalLista = [...totalLista];
                arrayTotalLista[numeroItem-1] = listaProvCantidad[numeroItem-1].totalLista
                setTotalLista(arrayTotalLista)
                setLista(listaProvCantidad);
                break;

            // case 'descuento':
            //     let listaProvDescuento = [...lista];
            //     listaProvDescuento[numeroItem-1].descuentoLista = event.target.value*1.0;
            //     let totalb = listaProvDescuento[numeroItem-1].precioUnitarioLista*listaProvDescuento[numeroItem-1].cantidadLista-event.target.value;
            //     listaProvDescuento[numeroItem-1].totalLista = totalb.toFixed(2);
            //     listaProvDescuento[numeroItem-1].igvLista = ((totalb*IGV)/(1+IGV)).toFixed(2);
            //     listaProvDescuento[numeroItem-1].precioVentaLista = (totalb/(1+IGV)).toFixed(2);
            //     let arrayTotalListab = [...totalLista];
            //     arrayTotalListab[numeroItem-1] = listaProvDescuento[numeroItem-1].totalLista
            //     setTotalLista(arrayTotalListab)
            //     setLista(listaProvDescuento);
            //     break;

            case 'numeroDocumentoCliente':
                setClienteNumeroDocumento(event.target.value)
                break;
            case 'clienteDenominacion':
                setClienteDenominacion(event.target.value)
                break;
            case 'clienteEmail':
                setClienteEmail(event.target.value)
                break;
            case 'clienteCelular':
                setClienteCelular(event.target.value)
                break; 
            case 'clienteDireccion':
                setClienteDireccion(event.target.value)
                break;
            case 'cantidadRegalo':
                setCantidadRegalo(event.target.value) 
                if (event.target.value!==3 && alteroDescuento===false) {
                    setShow(true);
                    setAlteroDescuento(true);
                }
                break;  
            case 'tipoMoneda':
                console.log("ENTRO TIPO MONEDA");
                let tm = event.target.value
                setTipoMoneda(tm)
                if(tm == "soles") {
                    setTipoMonedaSunat(1)
                    break;
                }
            case 'distritoDestino':
                setDistritoDestino(event.target.value);
                if (habilitarDelivery===true) {
                    setTotalDelivery(event.target.value)
                }
                break;
            case 'autorizador':
                setAutorizador(event.target.value);
                setHabilitarBotonAutorizacion(true)
            default:
                break;
        }
        // calculoFinal(numeroItem)
        // setValorDescripcion(event.target.value)        
    }
    const cerrarModal = ()=>{
        setTituloResultado("");
        setResultadoEmisionComprobante("");
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <div className="d-flex justify-content-center">
                    <Modal.Header >
                        <Modal.Title className="fw-bold">Regalos</Modal.Title>
                    </Modal.Header>
                </div>
                <Modal.Body>
                    Sugerimos que los regalos no pasen de esta cantidad por los siguientes motivos
                     … Nulla vestibulum erat eu molestie cursus. Ut semper erat id molestie aliquam.
                     <div className="d-flex justify-content-center flex-column align-items-center">
                        <p className="fw-bold">¿Quién lo autorizó?</p>
                        <select onChange={ manejadorEntrada } name="autorizador" className="form-select">
                                    <option disabled="disabled" selected>Escoger un valor</option>
                                    <option value="Carlos Ventura" >Carlos Ventura</option>
                                    <option value="Luis Castillo" >Luis Castillo</option>
                        </select>
                     </div>
                </Modal.Body>
                <div className="d-flex justify-content-center">
                    <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} disabled={!habilitarBotonAutorizacion}>
                                Aceptar
                            </Button>
                    </Modal.Footer>
                </div>
            </Modal>
            
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3 mb-3 border-bottom">
                <h1 className="fw-bold h5 text-black-header">Vendedora / Nueva venta</h1>
                {/* <div>
                    <button type="button" className="btn btn-secondary btn-sm me-1">Copiar</button>
                    <button type="button" className="btn btn-secondary btn-sm me-1" >Imprimir</button>
                    <button type="button" className="btn btn-secondary btn-sm">Excel</button>
                </div> */}
            </div>
            
            {/* http://46.183.113.134:3000/api/ventas */}

            <form onSubmit={ enviarDatos }>
                <div className="row mb-4">
                    <div className="col-7"></div>
                    <div className="col-3">
                        <select onChange={ e => setTipoComprobante(e.target.value) } name="canalVenta" className="form-select">
                            <option selected disabled>Elija un tipo de comprobante</option>
                            <option value="2">Boleta</option>
                            <option value="1">Factura</option>
                            <option value="nv">Nota de Venta</option>
                        </select>                                    
                    </div>
                    <div className="col-2">
                        <select onChange={ e => setSerie(e.target.value) } name="serie" className="form-select">
                            <option selected disabled>Elija una serie</option>
                            {tipoComprobante==="2"?(<><option value="B003">B003</option><option value="B004">B004</option></>):
                            tipoComprobante==="1"?(<><option value="F003">F003</option><option value="F004">F004</option></>):
                            tipoComprobante==="nv"?(<option value="NV10">NV10</option>):null}
                            {/* <option value="B003">B003</option>
                            <option value="B004">B004</option> */}
                            
                            {/* <option value="F003">F003</option>
                            <option value="F004">F004</option> */}
                        </select>                                    
                    </div>
                </div>
                <div className="wrapper-client-info row m-3">
                    <div className="owner-info col-5 py-4">
                        <div className="text-uppercase mb-2 fw-bold">Jaramillo Torero de Paez Manuela Maria</div>
                        <div>Av. Tacna Nro. 488</div>
                        <div>Lima - Lima - Lima</div>
                    </div>
                    <div className="col-7 d-flex justify-content-center text-center">
                        <div className="ruc-info py-4">
                            <div className="ruc mb-2">RUC 10095588986</div>
                            <div className="desc text-uppercase mb-2">
                            {tipoComprobante==="1"?"Factura":tipoComprobante==="2"?"Boleta":tipoComprobante==="nv"?"Nota de Venta":null} 
                                &nbsp;electrónica</div>
                            <div className="serie">
                                <span>{serie}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Presentación</th>
                                <th scope="col">Cod.</th>
                                <th scope="col">Cant.</th>
                                <th scope="col">Precio U.</th>
                                <th scope="col">Descuento</th>
                                <th scope="col">Subtotal</th>
                                <th scope="col">IGV</th>
                                <th scope="col">Tot.</th>
                                <th scope="col">ICBPER</th>
                                <th scope="col"></th>
                                <th scope="col">Desc.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lista.map(valor => (
                                    <tr>
                                        <th valign="middle" align="center">{valor.numeroLista}</th>
                                        <td>
                                            <input className="form-control" id={valor.numeroLista} name = "descripcion" type="search" onChange={manejadorEntrada} 
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
                                            <select className="form-select" id={valor.numeroLista} name ="presentacion" onChange={manejadorEntrada} value={valor.presentacionLista} disabled={!valor.modoValidar}>
                                                    
                                                    {   
                                                        listaPresentacion[valor.numeroLista-1].map(
                                                            (item) =>(<option value={item}>{item}</option>)
                                                            )
                                                    }
                                            </select>
                                        </td>
                                        <td valign="middle" align="center">{valor.codigoLista}</td>
                                        <td>
                                            <input className="form-control" id={valor.numeroLista} min="1" step="1" type="number" name="cantidad" value={valor.cantidadLista}
                                             onChange={manejadorEntrada}  list="off" autoComplete="off" disabled={!valor.modoValidar}/>
                                        </td>
                                        <td valign="middle" align="center">
                                            {valor.precioUnitarioLista}
                                        </td>
                                        <td valign="middle" align="center">
                                            <p>{valor.descuentoLista}</p>
                                        </td>
                                        <td valign="middle" align="center">{valor.precioVentaLista}</td>
                                        <td valign="middle" align="center">{valor.igvLista}</td>
                                        <td valign="middle" align="center">{valor.totalLista}</td>
                                        <td valign="middle" align="center">{valor.impuestoBolsas}</td>
                                        <td valign="middle" align="center">
                                            <button onClick= {()=>eliminarFila(valor.numeroLista)} className="btn btn-outline-danger btn-sm" type="button" ><i class="far fa-trash-alt"></i></button>
                                        </td>
                                        <td valign="middle" align="center">
                                            <button type="button" class="btn btn-warning btn-sm">Estado</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {/* <div className="border-bottom my-4"></div> */}
                    <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-outline-danger" onClick={agregarProducto} disabled={detenerCreacion} >+ AGREGAR PRODUCTO</button>
                        <p class="fs-5 me-5 text-black-header" >{ `Total Productos: S/. ${totalPagar}`}</p>
                    </div>
                </div>
                <div className="border-bottom my-4"></div>
                <div className="mb-3">
                    <div className="mb-3 sub-title">Datos de regalos</div>
                    <div className="row">
                        <div className="col-3 mb-3">
                            {/* <label for="exampleInputEmail1" className="form-label">Email address</label> */}
                            <label for="tipoRegalo" className="form-label" >Tipo de regalo</label>
                            <select disabled={!ofrecerRegalo} onChange={ e => setTipoRegalo(e.target.value) } name="tipoRegalo" className="form-select" aria-label="Default select example">
                                <option value="Regalo Probadores" selected>Regalo Probadores</option>
                            </select>
                        </div>
                        <div className="col-1 mb-3">
                            <label for="cantidadRegalo" className="form-label">Cantidad</label>
                            <input disabled={!ofrecerRegalo} className="form-control" onChange={manejadorEntrada} value={cantidadRegalo} type="number" id="cantidadRegalo" name="cantidadRegalo" min="0"></input>
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
                                    {/* <select onChange={ manejadorEntrada } name="tipoDocumentoCliente" className="form-select">
                                        <option selected>Elige el tipo de documento</option>
                                        <option value="DNI">DNI</option>
                                        <option value="RUC">RUC</option>
                                    </select> */}
                                    <select onChange={ e => setClienteTipoDocumento(e.target.value) } name="clienteTipoDocumento" className="form-select">
                                        <option value="1" selected>DNI</option>
                                        <option value="6">RUC</option>
                                        <option value="4">Carnet de Extranjería</option>
                                        <option value="7">Pasaporte</option>
                                        <option value="-">Varios (Ventas menores a S/700.00)</option>
                                    </select> 
                                </div>
                                <div className="col-6 mb-3">
                                    <label for="numeroDocumentoCliente" className="form-label">Nro. Documento</label>
                                    {/* <input onChange={ e => setNumeroDocumentoCliente(e.target.value) } type="text" className="form-control is-valid" name="numeroDocumentoCliente" id="numeroDocumentoCliente" required></input> */}
                                    <input className="form-control" name="numeroDocumentoCliente" required type="text" onChange={manejadorEntrada} value={clienteNumeroDocumento}/>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="nombreCliente" className="form-label">Nombre del cliente</label>
                                <input onChange={manejadorEntrada} type="text" className="form-control" name="clienteDenominacion" id="nombreCliente"></input>
                            </div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label for="emailCliente" className="form-label" value={clienteEmail}>Email</label>
                                    <input onChange={manejadorEntrada} type="email" className="form-control" name="clienteEmail" id="emailCliente" aria-describedby="emailHelp"></input>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="form-label" for="celular" value={clienteCelular}>Celular</label>
                                    <input onChange={manejadorEntrada} className="form-control" type="tel" name="clienteCelular" id="celular"></input>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="form-label">Departamento</label>
                                    <select onChange={ e => setDepartamento(e.target.value) } name="provincia" className="form-select">
                                        <option value="Lima" selected>Lima</option>
                                        <option value="Arequipa">Arequipa</option>
                                    </select>
                                </div>
                                {departamento==="Lima"?(<>
                                    <div className="col-6">
                                        <label className="form-label">Provincia</label>
                                        <select onChange={ e => setProvincia(e.target.value) } name="provincia" className="form-select">
                                            <option value="Lima" selected>Lima</option>
                                            <option value="Barranca">Barranca</option>
                                            <option value="Cajatambo">Cajatambo</option>
                                            <option value="Canta">Canta</option>
                                            <option value="Cañete">Cañete</option>
                                            <option value="Huaral">Huaral</option>
                                            <option value="Huarochirí">Huarochirí</option>
                                            <option value="Huaura">Huaura</option>
                                            <option value="Oyón">Oyón</option>
                                            <option value="Yauyos">Yauyos</option>
                                        </select>
                                    </div>
                                </>):departamento==="Arequipa"?(<>
                                    <div className="col-6">
                                        <label className="form-label">Provincia</label>
                                        <select onChange={ e => setProvincia(e.target.value) } name="provincia" className="form-select">
                                            <option value="Arequipa" selected>Arequipa</option>
                                            <option value="Camaná">Camaná</option>
                                            <option value="Caravelí">Caravelí</option>
                                            <option value="Castilla">Castilla</option>
                                            <option value="Caylloma">Caylloma</option>
                                            <option value="Condesuyos">Condesuyos</option>
                                            <option value="Islay">Islay</option>
                                            <option value="La Unión">La Unión</option>
                                        </select>
                                    </div>
                                </>):null}
                            </div>
                            <div className="mb-3">
                                <label for="direccionCliente" className="form-label">Dirección</label>
                                <input onChange={ e => setClienteDireccion(e.target.value) } type="text" className="form-control" 
                                    name="clienteDireccion" id="direccionCliente" value={clienteDireccion}></input>
                            </div>
                            <div className="mb-3">
                                <label for="direccionCliente" className="form-label">Referencias</label>
                                <input onChange={ e => setReferencias(e.target.value) } type="text" className="form-control" 
                                    name="referencias" id="referencias" value={referencias}></input>
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
                                    <label for="moneda" className="form-label">Tipo de moneda</label>
                                    <select onChange={ e => setMoneda(e.target.value) } name="moneda" className="form-select" aria-label="Default select example" id="moneda">
                                        <option selected value="1">Soles</option>
                                    </select>
                                    {/* <label className="form-label">Moneda</label>
                                    <select onChange={ manejadorEntrada } name="tipoMoneda" className="form-select">
                                        <option selected>Elige el tipo de moneda</option>
                                        <option value="1">Soles</option>
                                    </select> */}
                                </div>
                                <div className="col-5 mb-3">
                                    <label for="igv" className="form-label">IGV</label>
                                    <input  type="text" className="form-control" name="igv" id="igv" value={IGV} disabled readonly></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7 mb-3">
                                    <label className="form-label">Medio de pago</label>
                                    <select onChange={ e => setCondicionPago(e.target.value) } name="condicionPago" className="form-select">
                                        <option disabled selected>Elige la condicion de pago</option>
                                        <option value="tarjeta">Tarjeta</option>
                                        <option value="contado">Contado</option>
                                        <option value="yape">Yape</option>
                                    </select>
                                </div>
                                <div className="col-5 mb-3">
                                    <label for="noperacion" className="form-label">Nro. Operación</label>
                                    <input onChange={ e => setNumeroOperacion(e.target.value) } type="text" className="form-control" name="noperacion" id="noperacion"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7 mb-3">
                                    <label className="form-label">Canal de venta</label>
                                    <select onChange={ e => setCanalVenta(e.target.value) } name="canalVenta" className="form-select">
                                        <option disabled selected>Elige la canal de venta</option>
                                        <option value="whatsapp">Whatsapp</option>
                                        <option value="llamada">Llamada</option>
                                        <option value="llamada">Tienda</option>
                                        <option value="llamada">Internet</option>
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
                    <div className="col-6 mb-3">
                        <div className="row">
                            <div className="col-6">
                                <label className="form-label">¿Envío por delivery?</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input onChange={ e => deliveryChecked(e)} className="form-check-input" type="radio" value="true" name="delivery" id="delivery1"></input>
                                        <label className="form-check-label" for="delivery1">
                                            Sí
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input checked={!habilitarDelivery} onChange={ e => deliveryChecked(e) } className="form-check-input" type="radio" value="false" name="delivery" id="delivery2"></input>
                                        <label className="form-check-label" for="delivery2">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <label className="form-label">Distrito destino</label>
                                <div>
                                    <div className="col-12 mb-3">
                                        <select onChange={ manejadorEntrada} name="distritoDestino" className="form-select" disabled={!habilitarDelivery}>
                                            <option value="10" selected>Centro de Lima</option>
                                            <option value="10">Breña</option>
                                            <option value="10">Lince</option>
                                            <option value="10">Rimac</option>
                                        </select>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mb-3"></div>
                </div>
                <div className="mb-3">
                    <div className="info-total mb-4">
                        
                        <div className="row">
                            <div className="col-11">Sub Total productos:</div>
                            <div className="col-1">{(totalPagar*(1/(1+IGV))).toFixed(2)}</div>
                        </div>
                        <div className="row">
                            <div className="col-11">Delivery:</div>
                            <div className="col-1">{(totalDelivery*(1/(1+IGV))).toFixed(2)}</div>
                        </div>
                        {/* <div className="row">
                            <div className="col-11">Descuento Total:</div>
                            <div className="col-1">{(totalDescuento*(1/(1+IGV))).toFixed(2)}</div>
                        </div> */}
                        <div className="row">
                            <div className="col-11">Total gravada:</div>
                            <div className="col-1">{totalGravada}</div>
                        </div>
                        <div className="row">
                            <div className="col-11">Total IGV(18%):</div>
                            <div className="col-1">{totalIgv}</div>
                        </div>
                        <div className="row">
                            <div className="col-11">ICBPER:</div>
                            <div className="col-1">{(cantidadBolsa*ICBPER).toFixed(2)}</div>
                        </div>
                        <hr></hr>
                        <div className="row fs-4">
                            <div className="col-11">TOTAL:</div>
                            <div className="col-1">S/.{(sumaTotalFinal.toFixed(2))}</div>
                        </div>
                    </div>
                </div>    
                <div className="row mb-4">
                    <div className="col-4">
                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#previewModal">PREVISUALIZAR COMPROBANTE</button>
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
                                            <div className="text-uppercase sub-title text-black-header">Jaramillo Torero de Paez Manuela Maria</div>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <div>Av. Tacna Nro. 488</div>
                                                <div>Lima - Lima - Lima</div>
                                                <div>RUC 10095588986</div>
                                                <div className="text-uppercase">{tipoComprobante==="1"?"Factura":tipoComprobante==="2"?"Boleta":tipoComprobante==="nv"?"Nota de Venta":null} 
                                                &nbsp;electrónica</div>
                                            </div>
                                            <div className="col"></div>
                                        </div>
                                        <div className="h5">Serie: {serie}</div>
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-3 text-black">ADQUIRIENTE</div>
                                        <div>
                                            <div className="text-uppercase">{nombreCliente}</div>
                                            <div>Fecha de emisión: {fechaSunat}</div>
                                            <div>Moneda: {moneda==="1"?"Soles":null}</div>
                                            <div>IGV: {IGV*100}%</div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Descripción</th>
                                                    <th scope="col">Presentación</th>
                                                    <th scope="col">Cód.</th>
                                                    <th scope="col">Cant.</th>
                                                    <th scope="col">Precio U.</th>
                                                    <th scope="col">Desc.</th>
                                                    <th scope="col">Subtotal</th>
                                                    <th scope="col">IGV</th>
                                                    <th scope="col">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    lista.map((item) =>
                                                        (
                                                            <tr>
                                                                <td>{item.numeroLista}</td>
                                                                <td>{item.descripcionLista}</td>
                                                                <td>{item.presentacionLista}</td>
                                                                <td>{item.codigoLista}</td>
                                                                <td>{item.cantidadLista}</td>
                                                                <td>{item.precioUnitarioLista}</td>
                                                                <td>{item.descuentoLista}</td>
                                                                <td>{item.precioVentaLista}</td>
                                                                <td>{item.igvLista}</td>
                                                                <td>{item.totalLista}</td>
                                                            </tr>
                                                        )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="border-bottom"></div>
                                    <div className="p-4 text-end text-black">
                                        <div className="row">
                                            <div className="col-8">Sub Total productos:</div>
                                            <div className="col-1">S/</div>
                                            <div className="col-3">{(totalPagar*(1/(1+IGV))).toFixed(2)}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">Delivery:</div>
                                            <div className="col-1">S/</div>
                                            <div className="col-3">{(totalDelivery*(1/(1+IGV))).toFixed(2)}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">Total gravada:</div>
                                            <div className="col-1">S/</div>
                                            <div className="col-3">{totalGravada}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">Total IGV({IGV}%):</div>
                                            <div className="col-1">S/</div>
                                            <div className="col-3">{totalIgv}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">ICBPER:</div>
                                            <div className="col-1">S/</div>
                                            <div className="col-3">{(cantidadBolsa*ICBPER).toFixed(2)}</div>
                                        </div>
                                    </div>
                                    <div className="border-bottom"></div>
                                    <div className="p-4 text-end text-black-header">
                                        <div className="row">
                                            <div className="col-8">TOTAL:</div>
                                            <div className="col-1">S/</div>
                                            <div className="col-3">{(sumaTotalFinal.toFixed(2))}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="w-100 text-center">
                                        <div>
                                            Representación impresa de la
                                        </div>
                                        <div>
                                        {tipoComprobante==="1"?"Factura":tipoComprobante==="2"?"Boleta":tipoComprobante==="nv"?"Nota de Venta":null} 
                                        &nbsp;electrónica
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
