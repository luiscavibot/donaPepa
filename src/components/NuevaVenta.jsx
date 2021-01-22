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
        console.log("Estoy asignando la siguiente numeracion:" , tamanoLista+1);
        setDetenerCreacion(true);
        setDeshabilitarValidacion(true);       
    }

    const presentaciones = (presentacion, numero) =>{
        const getPresentaciones = async () =>{
            try {
                console.log("activaremos el axios");
                let res = await axios.get(`http://46.183.113.134:3000/api/productos?busquedaPorNombre=${presentacion}`);
                console.log("Resultado de axios para presentaciones: ",res.data);
                let arrayData= res.data.map(item => (item.presentacion))
                let arrayProv = [...listaPresentacion,[]]
                arrayProv[numero-1]= arrayData
                setListaPresentacion(arrayProv);
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
        console.log(numeroItem);
        let listaProv = [...lista];
        console.log(listaProv);
        console.log("precioUnitario: ", listaProv[numeroItem-1].precioUnitarioLista);
        console.log("cantidadLista: ", listaProv[numeroItem-1].cantidadLista);
        console.log("descuentoLista: ", listaProv[numeroItem-1].descuentoLista);

        let precioVenta = (listaProv[numeroItem-1].precioUnitarioLista*listaProv[numeroItem-1].cantidadLista)-listaProv[numeroItem-1].descuentoLista;
        
        console.log("Esta lista se imprime en calculo final",listaProv);
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
        console.log("Esta lista se imprime al final de calculo final", lista);
        setLista(modoValidarProv);
        setDetenerCreacion(false)
    }

    const eliminarFila = (numeroItem) => {
        let sumaTotal = 0.00;
        console.log(numeroItem);
        console.log("Se activó el boton eleiminar");
        console.log("Lista original:" ,lista);
        let listaProv = [...lista]        
        let numerador = 0;
        let i = numeroItem-1;
        console.log(i);
        let nuevaLista = listaProv.filter((value, index )=>{return index!==i});
        console.log("Cadena reducida",nuevaLista);

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
            // sumaTotal = sumaTotal + (item.totalLista*1.0);
        })
        console.log("Lista Final", listaRenumerada);
        setLista(listaRenumerada);
        console.log("Suma Total", sumaTotal);
        setTotalPagar(sumaTotal.toFixed(2));
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
                break;
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
                                lista.map(valor=> (
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
                                                    <option value="">-</option>
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
                                                <button onClick= {()=>calculoFinal(valor.numeroLista)} className="btn btn-success btn-sm" disabled={deshabilitarValidacion} >Validar</button>:
                                                <button onClick= {()=>eliminarFila(valor.numeroLista)} className="btn btn-danger btn-sm" >Eliminar</button>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-danger" onClick={agregarProducto} disabled={detenerCreacion} >AGREGAR PRODUCTO</button>
                        <p class="fs-5 me-5" >{ `TOTAL: S/. ${totalPagar}`}</p>
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
                        <input onChange={ e => setNumeroDocumentoCliente(e.target.value) } type="text" className="form-control is-valid" name="numeroDocumentoCliente" id="numeroDocumentoCliente"></input>
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
                        <input onChange={ e => setCelular(e.target.value) } className="form-control" type="tel" name="celular" id="celular" pattern="[0-9]{9}"></input>
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
