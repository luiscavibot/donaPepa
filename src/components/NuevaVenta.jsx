import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker, {registerLocale} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const NuevaVenta = () => {

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
    const [descuento, setDescuento] = useState(0)
    const [totalIgv, setTotalIgv] = useState(0)
    const [totalDelivery, setTotalDelivery] = useState(0)
    const [totalPagar, setTotalPagar] = useState(0)

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
            descuento,
            totalIgv,
            totalDelivery,
            totalPagar,
        })

    }

    useEffect(() => {
        
    })

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
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button type="button" className="btn btn-outline-danger">AGREGAR PRODUCTO</button>
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
                        <input onChange={ e => setNumeroDocumentoCliente(e.target.value) } type="text" className="form-control is-valid" name="numeroDocumentoCliente" id="numeroDocumentoCliente" required></input>
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
