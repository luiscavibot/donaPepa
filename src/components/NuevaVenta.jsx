import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker, {registerLocale} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { set } from 'date-fns/esm'

const NuevaVenta = () => {

    const [lista, setLista] = useState([])
    // const [numLista, setNumLista] = useState(0)
    // const [cod, setCod] = useState(0)
    const [descripcion, setDescripcion] = useState('')
    // const [unidades, setUnidades] = useState('')
    // const [cantidad, setCantidad] = useState(0)
    // const [descuento, setDescuento] = useState(0)
    // const [precioUnitario, setPrecioUnitario] = useState(0)
    // const [precioUnitarioIgv, setPrecioUnitarioIgv] = useState(0)
    // const [total, setTotal] = useState(0)
    const [usuario, setUsuario] = useState('')
    const [serie, setSerie] = useState('')
    const [numero, setNumero] = useState(0)
    const [tipoRegalo, setTipoRegalo] = useState('')
    const [cantidadRegalo, setCantidadRegalo] = useState(0)
    const [tipoDocumentoCliente, setTipoDocumentoCliente] = useState('')
    const [numeroDocumentoCliente, setNumeroDocumentoCliente] = useState(0)
    const [dateInicio, setDateInicio] = useState(new Date())
    const [nombreCliente, setNombreCliente] = useState('')
    const [tipoMoneda, setTipoMoneda] = useState('')
    const [igv, setIgv] = useState(0.18)
    const [celular, setCelular] = useState(0)
    const [emailCliente, setEmailCliente] = useState('')
    const [condicionPago, setCondicionPago] = useState('')
    const [numeroOperacion, setNumeroOperacion] = useState('')
    const [provincia, setProvincia] = useState('')
    const [canalVenta, setCanalVenta] = useState('')
    const [delivery, setDelivery] = useState(false)
    const [direccion, setDireccion] = useState('')
    const [referencias, setReferencias] = useState('')
    const [gravada, setGravada] = useState(0)
    const [descuentoTotal, setDescuentoTotal] = useState(0)
    const [totalIgv, setTotalIgv] = useState(0)
    const [totalDelivery, setTotalDelivery] = useState(0)
    const [totalPagar, setTotalPagar] = useState(0)
    const [filaProducto, setFilaProducto] = useState()
    const [botonAgregar, setBotonAgregar] = useState(false)

    const [valorDescripcion, setValorDescripcion] = useState("")
    const [listaProductos, setListaProductos] = useState([])
    const [contador, setContador] = useState(1);
    const [listaPresentacion, setListaPresentacion] = useState([])
    const [codigoLista, setCodigoLista] = useState('')
    const [precioUnitario, setPrecioUnitario] = useState(0)

    

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
        <div className="d-flex border align-items-center justify-content-between mt-3" onClick={onClick}>
          <div>{value}</div>
          <div>
              <i className="far fa-calendar p-1 rounded-3 text-center"></i>
          </div>
        </div>
    );

    const deliveryChecked = (e) => {
        console.log("entro")
        console.log(e.target.value)
        if (e.target.value === "true") {
            setDelivery(true)
            return
        }
        setDelivery(false)
        return
    }

    const enviarDatos = (e) => {
        e.preventDefault()

        axios.post('http://46.183.113.134:3000/api/ventas', {
            lista,
            usuario,
            serie,
            numero,
            tipoRegalo,
            cantidadRegalo,
            tipoDocumentoCliente,
            numeroDocumentoCliente,
            nombreCliente,
            tipoMoneda,
            igv,
            celular,
            emailCliente,
            condicionPago,
            numeroOperacion,
            provincia,
            canalVenta,
            delivery,
            direccion,
            referencias,
            gravada,
            descuentoTotal,
            totalIgv,
            totalDelivery,
            totalPagar,
        })

        axios({
            method: 'post',
            url: 'https://api.nubefact.com/api/v1/0cce0d84-fc4b-46dd-a941-34cff1816c0b',
            data: {
                
                    "operacion": "generar_comprobante",
                    "tipo_de_comprobante": 1,
                    "serie": "FFF1",
                    "numero": 1,
                    "sunat_transaction": 1,
                    "cliente_tipo_de_documento": 6,
                    "cliente_numero_de_documento": "20600695771",
                    "cliente_denominacion": "NUBEFACT SA",
                    "cliente_direccion": "CALLE LIBERTAD 116 MIRAFLORES - LIMA - PERU",
                    "cliente_email": "tucliente@gmail.com",
                    "cliente_email_1": "",
                    "cliente_email_2": "",
                    "fecha_de_emision": "09-05-2017",
                    "fecha_de_vencimiento": "",
                    "moneda": 1,
                    "tipo_de_cambio": "",
                    "porcentaje_de_igv": 18.00,
                    "descuento_global": "",
                    "total_descuento": "",
                    "total_anticipo": "",
                    "total_gravada": 600,
                    "total_inafecta": "",
                    "total_exonerada": "",
                    "total_igv": 108,
                    "total_gratuita": "",
                    "total_otros_cargos": "",
                    "total": 708,
                    "percepcion_tipo": "",
                    "percepcion_base_imponible": "",
                    "total_percepcion": "",
                    "total_incluido_percepcion": "",
                    "total_impuestos_bolsas": "",
                    "detraccion": false,
                    "observaciones": "",
                    "documento_que_se_modifica_tipo": "",
                    "documento_que_se_modifica_serie": "",
                    "documento_que_se_modifica_numero": "",
                    "tipo_de_nota_de_credito": "",
                    "tipo_de_nota_de_debito": "",
                    "enviar_automaticamente_a_la_sunat": true,
                    "enviar_automaticamente_al_cliente": false,
                    "condiciones_de_pago": "",
                    "medio_de_pago": "",
                    "placa_vehiculo": "",
                    "orden_compra_servicio": "",  
                    "formato_de_pdf": "",
                    "generado_por_contingencia": "",
                    "bienes_region_selva": "",
                    "servicios_region_selva": "",
                    "items": [
                          {
                             "unidad_de_medida": "NIU",
                             "codigo": "001",
                             "codigo_producto_sunat": "10000000",
                             "descripcion": "DETALLE DEL PRODUCTO",
                             "cantidad": 1,
                             "valor_unitario": 500,
                             "precio_unitario": 590,
                             "descuento": "",
                             "subtotal": 500,
                             "tipo_de_igv": 1,
                    "igv": 90,
                    "total": 590,
                    "anticipo_regularizacion": false,
                    "anticipo_documento_serie": "",
                    "anticipo_documento_numero": ""
                    }, {
                    "unidad_de_medida": "ZZ",
                    "codigo": "001",
                    "codigo_producto_sunat": "20000000",
                    "descripcion": "DETALLE DEL SERVICIO",
                    "cantidad": 5,
                    "valor_unitario": 20,
                    "precio_unitario": 23.60,
                    "descuento": "",
                    "subtotal": 100,
                    "tipo_de_igv": 1,
                    "igv": 18,
                    "total": 118,
                    "anticipo_regularizacion": false,
                    "anticipo_documento_serie": "",
                    "anticipo_documento_numero": ""
                    }
                    ],
                    "guias": [
                            {
                                "guia_tipo": 1,
                                "guia_serie_numero": "0001-23"
                            }
                    ]
            },
            headers: {
                'Authorization': '390c1fd7c71f46379a59d4c6d1a0c23ef7c7c3ab16cf414a8298da7a58d1698c',
                'Content-Type' : 'application/json'
            },

        });

    }

    const agregarProducto = async () => {
        console.log("AGREGAR PRODUCTO");
        setLista([
            ...lista, {          
                numeroLista: contador,
                codigoLista: codigoLista,
                descripcionLista: "",
                presentacionLista: "",
                cantidadLista: "",
                descuentoLista: 0,
                precioUnitarioLista: 0,
                precioUnitarioIgvLista: 0,
                totalLista: 0,
            }
        ]);
        // getProducts();
        setContador(contador+1) 
    }

    const presentaciones = (presentacion) =>{
        const getPresentaciones = async () =>{
            try {
                console.log("activaremos el axios");
                let res = await axios.get(`http://46.183.113.134:3000/api/productos?busquedaPorNombre=${presentacion}`);
                console.log("Resultado de axios para presentaciones: ",res.data);
                let arrayData= res.data.map(item => (item.presentacion))
                setListaPresentacion([...arrayData]);
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
                console.log(elemento);
                let res = await axios.get(`http://46.183.113.134:3000/api/productos?busquedaPorNombre=${elemento.descripcionLista}&busquedaPorPresentacion=${elemento.presentacionLista}`);
                setCodigoLista(res.data[0].codigo)
                setPrecioUnitario(res.data[0].precioUnitario)
            } catch (error) {
                console.error(error);
            }
        }
        getCodigoYprecioUnitario();
    }

    const completarDatosCliente = (e) =>{
        console.log("HH")
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
        setCelular(parseInt(inputCelular.value))
        console.log("celular");
    }

    const manejadorEntrada = (event) =>{
        let numeroItem = event.target.id;
        let name=event.target.name;
        switch (name) {
            case 'descripcion':
                let listaProvDescripcion = [...lista]
                listaProvDescripcion[numeroItem-1].descripcionLista = event.target.value;
                setLista(listaProvDescripcion)
                presentaciones(event.target.value)
                break;
            case 'presentacion':
                let listaProvPresentacion = [...lista]
                listaProvPresentacion[numeroItem-1].presentacionLista = event.target.value;
                setLista(listaProvPresentacion)
                completarCampos(numeroItem)
                break;
            case 'numeroDocumentoCliente':
                // let listaProvPresentacion = [...lista]
                // listaProvPresentacion[numeroItem-1].presentacionLista = event.target.value;
                // setLista(listaProvPresentacion)
                completarDatosCliente(event)
                break;
            default:
                break;
        }
        // setValorDescripcion(event.target.value)        
    }

    const addDescription = (value, key) => {
        console.log(key, value);
        // lista= 
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
            {/* <div> */}
                <div className="wrapper-client-info">
                    <div className="owner-info">
                        <div className="text-uppercase">Jaramillo Torero de Paez Manuela Maria</div>
                        <div>Av. Tacna Nro. 488</div>
                    </div>
                    <div className="ruc-info">
                        <div>RUC 10095588986</div>
                        <div className="text-uppercase">Nota de venta electrónica</div>
                        <div>
                            <span>NV10</span>-<span>9281</span>
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
                                <th scope="col">CANTIDAD</th>
                                <th scope="col">DESCUENTO</th>
                                <th scope="col">PU</th>
                                <th scope="col">PU + IGV</th>
                                <th scope="col">TOT.</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lista.map(id => (
                                    <tr>
                                        <th>{id.numeroLista}</th>
                                        <td>
                                            <input id={id.numeroLista} name = "descripcion" type="search" onChange={manejadorEntrada} 
                                            placeholder="Ingrese un producto"  list="listaproductos" />
                                            <datalist id="listaproductos">
                                                    {
                                                        listaProductos.map((item) =>
                                                            (<option value={item} />)
                                                        )
                                                    }
                                            </datalist>
                                        </td>
                                        <td>
                                            <input id={id.numeroLista} name = "presentacion" type="search" onChange={manejadorEntrada} 
                                            placeholder="Ingrese una Presentación"  list="listapresentacion" />
                                            <datalist id="listapresentacion">
                                                    {
                                                        listaPresentacion.map((item) =>
                                                            (<option value={item} />)
                                                        )
                                                    }
                                            </datalist>
                                        </td>
                                        <td>{codigoLista}</td>
                                        <td><input type="number" /></td>
                                        <td>{id.descuentoLista}</td>
                                        <td>{precioUnitario}</td>
                                        <td>{(precioUnitario*0.18).toFixed(2)}</td>
                                        <td>{(precioUnitario*1.18).toFixed(2)}</td>
                                        <td><button>Eliminar</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div>
                        <button type="button" className="btn btn-outline-danger" onClick={agregarProducto}>AGREGAR PRODUCTO</button>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="border-bottom">Datos de regalos</div>
                    <div className="mb-3">
                        {/* <label for="exampleInputEmail1" className="form-label">Email address</label> */}
                        <label for="tipoRegalo" className="form-label">Tipo de regalo</label>
                        <select onChange={ e => setTipoRegalo(e.target.value) } name="tipoRegalo" className="form-select" aria-label="Default select example">
                            <option selected>Elige el tipo de regalo</option>
                            <option value="muestra">Regalo muestra</option>
                            <option value="tipo regalo 2">Regalo tipo 2</option>
                            <option value="tipo regalo 3">Regalo tipo 3</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="cantidadRegalo">Cantidad (del 1 al 5):</label>
                        <input onChange={ e => setCantidadRegalo(e.target.value) } type="number" id="cantidadRegalo" name="cantidadRegalo" min="0" max="5"></input>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="border-bottom">Datos del cliente</div>
                    <div>
                        <label className="form-label">Tipo de documento</label>
                        <select onChange={ e => setTipoDocumentoCliente(e.target.value) } name="tipoDocumentoCliente" className="form-select">
                            <option selected>Elige el tipo de documento</option>
                            <option value="DNI">DNI</option>
                            <option value="documento 2">documento tipo 2</option>
                            <option value="documento 3">documento tipo 3</option>
                        </select>
                    </div>
                    <div>
                        <label for="numeroDocumentoCliente" className="form-label">Nro. Documento</label>
                        {/* <input onChange={ e => setNumeroDocumentoCliente(e.target.value) } type="text" className="form-control is-valid" name="numeroDocumentoCliente" id="numeroDocumentoCliente" required></input> */}
                        <input className="form-control is-valid" name="numeroDocumentoCliente" type="search" onChange={manejadorEntrada}  list="listaclientes" />
                        <datalist id="listaclientes">
                                {
                                    listaProductos.map((item) =>
                                        (<option data-nombre-cliente="Hans" data-email-cliente="hans.e.huiza.n@gmail.com" data-celular="991570362" data-doc-cliente={item}>{item} 123</option>)
                                    )
                                }
                        </datalist>
                    </div>
                    <div>
                        <label for="nombreCliente" className="form-label">Nombre del cliente</label>
                        <input onChange={ e => setNombreCliente(e.target.value) } type="text" className="form-control" name="nombreCliente" id="nombreCliente"></input>
                    </div>
                    <div>
                        <label for="emailCliente" className="form-label">Email</label>
                        <input onChange={ e => setEmailCliente(e.target.value) } type="email" className="form-control" name="emailCliente" id="emailCliente" aria-describedby="emailHelp"></input>
                    </div>
                    <div>
                        <label className="form-label" for="celular">Celular</label>
                        <input onChange={ e => setCelular(parseInt(e.target.value)) } className="form-control" type="tel" name="celular" id="celular" pattern="[0-9]{9}"></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Provincia</label>
                        <select onChange={ e => setProvincia(e.target.value) } name="provincia" className="form-select">
                            <option selected>Elige la provincia</option>
                            <option value="Lima">Lima</option>
                            <option value="provincia tipo 2">provincia tipo 2</option>
                            <option value="provincia tipo 3">provincia tipo 3</option>
                        </select>
                    </div>
                    <div>
                        <div className="form-check">
                            <input onChange={ e => deliveryChecked(e) } className="form-check-input" type="radio" value="true" name="delivery" id="delivery1"></input>
                            <label className="form-check-label" for="delivery1">
                                Sí
                            </label>
                        </div>
                        <div className="form-check">
                            <input onChange={ e => deliveryChecked(e) } className="form-check-input" type="radio" value="false" name="delivery" id="delivery2"></input>
                            <label className="form-check-label" for="delivery2">
                                No
                            </label>
                        </div>
                    </div>
                    <div>
                        <label for="direccion" className="form-label">Dirección</label>
                        <input onChange={ e => setDireccion(e.target.value) } type="text" className="form-control" name="direccion" id="direccion"></input>
                    </div>
                    <div>
                        <label for="referencias" className="form-label">Referencias</label>
                        <input onChange={ e => setReferencias(e.target.value) } type="text" className="form-control" name="referencias" id="referencias"></input>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="border-bottom">Datos del cliente</div>
                    <div>
                        <p className="m-0 me-1">Fecha</p>
                        <DatePicker 
                            selected={dateInicio} 
                            onChange={date => setDateInicio(date)} 
                            locale="es"
                            customInput={<ExampleCustomInput />} 
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <div>
                        <label className="form-label">Moneda</label>
                        <select onChange={ e => setTipoMoneda(e.target.value) } name="tipoMoneda" className="form-select">
                            <option selected>Elige el tipo de moneda</option>
                            <option value="soles">Soles</option>
                            <option value="dolares">Dolares</option>
                        </select>
                    </div>
                    <div>
                        <label for="igv" className="form-label">IGV</label>
                        <input onChange={ e => setIgv(e.target.value) } type="text" className="form-control" name="igv" id="igv" value="0.18" disabled readonly></input>
                    </div>
                    <div>
                        <label className="form-label">Condicion de pago</label>
                        <select onChange={ e => setCondicionPago(e.target.value) } name="condicionPago" className="form-select">
                            <option selected>Elige la condicion de pago</option>
                            <option value="tarjeta">Tarjeta</option>
                            <option value="efectivo">Efectivo</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Canal de venta</label>
                        <select onChange={ e => setCanalVenta(e.target.value) } name="canalVenta" className="form-select">
                            <option selected>Elige la canal de venta</option>
                            <option value="whatsapp">whatsapp</option>
                            <option value="llamada">llamada</option>
                        </select>
                    </div>
                </div>
                <input type="submit" value="Enviar"></input>
            {/* </div> */}
            </form>
        </div>
    )
}

export default NuevaVenta
