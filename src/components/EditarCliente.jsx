import React, { useState, useEffect } from "react";
import axios from 'axios'
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'moment/locale/es'

import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    // NavLink,
    Link,
    useParams,
    // useRouteMatch,
    // withRouter
} from "react-router-dom";

const EditarCliente = () => {

    // const [buscador, setBuscador] = useState(false)

    const { id } = useParams();

    const [clienteTipoDocumento, setClienteTipoDocumento] = useState("")
    const [clienteNumeroDocumento, setClienteNumeroDocumento] = useState("")
    const [clienteTipo, setClienteTipo] = useState("all")
    const [clienteNombre, setClienteNombre] = useState("")
    const [clienteEdad, setClienteEdad] = useState(0)
    const [clienteRangoEdad, setClienteRangoEdad] = useState("")
    const [clienteCumple, setClienteCumple] = useState(new Date());
    const [clienteCelular, setClienteCelular] = useState("")
    const [clienteEmail, setClienteEmail] = useState("")
    const [clienteFamilia, setClienteFamilia] = useState("")
    const [clienteEdadHijos, setClienteEdadHijos] = useState("")
    const [clienteDireccion, setClienteDireccion] = useState("")
    const [clienteDistrito, setClienteDistrito] = useState("")
    const [clienteReferencias, setClienteReferencias] = useState("")
    const [clienteProvincia, setClienteProvincia] = useState("")
    const [clienteCodigoPostal, setClienteCodigoPostal] = useState("")
    const [clienteEntrenamiento1, setClienteEntrenamiento1] = useState("")
    const [clienteEntrenamiento2, setClienteEntrenamiento2] = useState("")
    const [clienteEntrenamiento3, setClienteEntrenamiento3] = useState("")
    const [clienteHaceDeporte, setClienteHaceDeporte] = useState("")
    const [clienteDeporte, setClienteDeporte] = useState("")
    const [clientePublicidad, setClientePublicidad] = useState(true)

    // const [contador, setContador] = useState(1)

    // const [desactivar, setDesactivar] = useState(false)

    const ExampleCustomInput = ({ value, onClick }) => (
        <div className="d-flex align-items-center justify-content-between form-control" onClick={onClick}>
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
            // setBuscador(true);
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

    const publicidadChecked = (e) => {
        console.log("entro a delivery checked")
        console.log(e.target.value)
        if (e.target.value === "true") {
            setClientePublicidad(true)
            return
        }
        setClientePublicidad(false);
        return
    }

    const enviarCliente = async (e) => {
        e.preventDefault()
        
        let cliente = {
            tipoDocumento: clienteTipoDocumento,
            nroDocumento: clienteNumeroDocumento,
            tipo: clienteTipo,
            nombre: clienteNombre,
            edad: clienteEdad,
            rangoEdad: clienteRangoEdad,
            fechaCumple: clienteCumple,
            celular: clienteCelular,
            email: clienteEmail,
            familia: clienteFamilia,
            edadHijos: clienteEdadHijos,
            direccion: clienteDireccion,
            distrito: clienteDistrito,
            referencias: clienteReferencias,
            provincia: clienteProvincia,
            codigoPostal: clienteCodigoPostal,
            entretenimiento1: clienteEntrenamiento1,
            entretenimiento2: clienteEntrenamiento2,
            entretenimiento3: clienteEntrenamiento3,
            haceDeportes: clienteHaceDeporte,
            deportes: clienteDeporte,
            deseaPublicidad: clientePublicidad,
        }
        const config = {
            headers: { 
                "Content-Type" : "application/json"
            }
        };
        console.log("Este form va para el registro en Clientes:" ,cliente);
        await axios.post(`http://localhost:3000/api/clientes/${id}`, cliente, config)
        .then(function (params) {
            console.log("Resultado de consulta: ", params.data );
            // setGuardadoExitosamente(true)
            // setTimeout(() => {
            //     window.location.reload()
            // }, 1200);
        })
        .catch(function (params) {
            console.log("Resultado de consulta: ", params.data );
        })
    }

    useEffect(() => {
        const getCliente = async () =>{
            try {
                console.log("activaremos el axios para obtener todos los objetos de clientes");
                let res = await axios.get(`http://localhost:3000/api/clientes/${id}`);
                console.log("Lista obtenida por consulta a CLIENTES",res.data);
                setClienteTipoDocumento(res.data.tipoDocumento)
                setClienteNumeroDocumento(res.data.nroDocumento)
                setClienteTipo(res.data.tipo)
                setClienteNombre(res.data.nombre)
            } catch (error) {
                console.error(error);
            }
        }
        getCliente();
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3 mb-5 border-bottom">
                <h1 className="fw-bold h5 text-black-header">Editar cliente</h1>
            </div>
            <form onSubmit={ enviarCliente }>
            <div>
                
                <div className="mb-5 sub-title">Datos del cliente</div>
                <div>
                    <div className="row">
                        <div className="col-3 mb-4">
                            <label className="form-label">Tipo de documento</label>
                            <select onChange={ e => setClienteTipoDocumento(e.target.value) } name="clienteTipoDocumento" className="form-select">
                                <option value="" selected>--</option>
                                <option value="DNI">DNI</option>
                                <option value="RUC">RUC</option>
                                <option value="Carnet de extranjería">Carnet de Extranjería</option>
                                <option value="pasaporte">Pasaporte</option>
                                <option value="varios">Varios (Ventas menores a S/700.00)</option>
                            </select> 
                        </div>
                        <div className="col-3 mb-4">
                            <label for="numeroDocumentoCliente" className="form-label">Nro. Documento</label>
                            <input className="form-control" name="numeroDocumentoCliente" type="text" onChange={ e => setClienteNumeroDocumento(e.target.value) } value={clienteNumeroDocumento}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 mb-4">
                            <label className="form-label">Tipo de cliente</label>
                            <select onChange={ e => setClienteTipo(e.target.value) } name="clienteTipo" className="form-select">
                                <option value="" selected>--</option>
                                <option value="persona natural">Persona natural</option>
                                <option value="persona jurídica">Persona jurídica</option>
                            </select> 
                        </div>
                        <div className="col-3 mb-4">
                            <label for="nombreCliente" className="form-label">Nombre del cliente</label>
                            <input onChange={ e => setClienteNombre(e.target.value) } value={clienteNombre} type="text" className="form-control" name="clienteDenominacion" id="nombreCliente"></input>
                        </div>
                        <div className="col-1 mb-3">
                            <label for="edad" className="form-label">Edad</label>
                            <input className="form-control" onChange={ e => setClienteEdad(e.target.value) } value={clienteEdad} type="number" id="edad" name="edad" min="0"></input>
                        </div>
                        <div className="col-1 mb-4">
                            <label className="form-label">Rango de edad</label>
                            <select onChange={ e => setClienteRangoEdad(e.target.value) } name="clienteRangoEdad" className="form-select">
                                <option value="" selected>--</option>
                                <option value="18 - 25">18 - 25</option>
                                <option value="26 - 45">26 - 45</option>
                                <option value="46 - más">46 - más</option>
                            </select> 
                        </div>
                        <div className="col-2 mb-4">
                                    <label className="form-label">Fecha</label>
                                    <div>
                                        <DatePicker 
                                            selected={clienteCumple} 
                                            onChange={(date) => setClienteCumple(date.setHours(0,0,0,0))} 
                                            locale="es"
                                            customInput={<ExampleCustomInput />} 
                                            dateFormat="dd/MM/yyyy"
                                            wrapperClassName="form-control"
                                        />
                                    </div>
                                </div>
                    </div>
                    <div className="row">
                        <div className="col-3 mb-4">
                            <label className="form-label" for="celular" value={clienteCelular}>Celular</label>
                            <input onChange={ e => setClienteCelular(e.target.value) } className="form-control" type="tel" name="clienteCelular" id="celular"></input>
                        </div>
                        <div className="col-3 mb-4">
                            <label for="clienteEmail" className="form-label" value={clienteEmail}>Email</label>
                            <input onChange={ e => setClienteEmail(e.target.value) } type="email" className="form-control" name="clienteEmail" id="clienteEmail" aria-describedby="emailHelp"></input>
                        </div>
                        <div className="col-2 mb-4">
                            <label for="clienteFamilia" className="form-label">Familia</label>
                            <input onChange={ e => setClienteFamilia(e.target.value) } type="text" className="form-control" name="clienteFamilia" id="clienteFamilia"></input>
                        </div>
                        <div className="col-2 mb-4">
                            <label for="clienteEdadHijos" className="form-label">Edad de hijos</label>
                            <input onChange={ e => setClienteEdadHijos(e.target.value) } type="text" className="form-control" name="clienteEdadHijos" id="clienteEdadHijos"></input>
                        </div>
                    </div>
                </div>
            </div>

            <div class="border-bottom my-4"></div>

            <div>
                <div className="mb-5 sub-title">Zona de residencia</div>
                <div>
                    <div className="row">
                        <div className="col-3 mb-4">
                            <label for="clienteDireccion" className="form-label">Direccion</label>
                            <input onChange={ e => setClienteDireccion(e.target.value) } type="text" className="form-control" name="clienteDireccion" id="clienteDireccion"></input>
                        </div>
                        <div className="col-3 mb-4">
                            <label for="clienteDistrito" className="form-label">Distrito</label>
                            <input onChange={ e => setClienteDistrito(e.target.value) } type="text" className="form-control" name="clienteDistrito" id="clienteDistrito"></input>
                        </div>
                        <div className="col-3 mb-4">
                            <label for="clienteReferencias" className="form-label">Referencias</label>
                            <input onChange={ e => setClienteReferencias(e.target.value) } type="text" className="form-control" name="clienteReferencias" id="clienteReferencias"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 mb-4">
                            <label className="form-label">Provincia</label>
                            <select onChange={ e => setClienteProvincia(e.target.value) } name="clienteProvincia" className="form-select">
                                <option value="" selected>--</option>
                                <option value="Lima">Lima</option>
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
                        <div className="col-2 mb-4">
                            <label className="form-label">Código Postal</label>
                            <select onChange={ e => setClienteCodigoPostal(e.target.value) } name="clienteCodigoPostal" className="form-select">
                                <option value="" selected>--</option>
                                <option value="Lima 13">Lima 13</option>
                            </select> 
                        </div>
                    </div>
                </div>
            </div>

            <div class="border-bottom my-4"></div>

            <div>
                <div className="mb-5 sub-title">Hábitos y aptitudes</div>
                <div>
                    <div className="row">
                        <div className="col-3 mb-4">
                            <label for="clienteEntrenamiento1" className="form-label">Entrenamiento 1</label>
                            <input onChange={ e => setClienteEntrenamiento1(e.target.value) } type="text" className="form-control" name="clienteEntrenamiento1" id="clienteEntrenamiento1"></input>
                        </div>
                        <div className="col-3 mb-4">
                            <label for="clienteEntrenamiento2" className="form-label">Entrenamiento 2</label>
                            <input onChange={ e => setClienteEntrenamiento2(e.target.value) } type="text" className="form-control" name="clienteEntrenamiento2" id="clienteEntrenamiento2"></input>
                        </div>
                        <div className="col-3 mb-4">
                            <label for="clienteEntrenamiento3" className="form-label">Entrenamiento 3</label>
                            <input onChange={ e => setClienteEntrenamiento3(e.target.value) } type="text" className="form-control" name="clienteEntrenamiento3" id="clienteEntrenamiento3"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 mb-4">
                            <label className="form-label">Deportes</label>
                            <select onChange={ e => setClienteHaceDeporte(e.target.value) } name="clienteHaceDeporte" className="form-select">
                                <option value="" selected>--</option>
                                <option value="Sí practico">Sí practico</option>
                                <option value="No practico">No practico</option>
                            </select> 
                        </div>
                        <div className="col-2 mb-4">
                            <label className="form-label">Deportes</label>
                            <select onChange={ e => setClienteDeporte(e.target.value) } name="clienteDeporte" className="form-select">
                                <option value="" selected>--</option>
                                <option value="Futbol">Futbol</option>
                                <option value="Voley">Voley</option>
                            </select> 
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label className="form-label">¿Desea recibir publicidad?</label>
                <div>
                    <div class="form-check form-check-inline">
                        {/* <input onChange={ e => setClientePublicidad(e.target.value) } class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={true}/> */}
                        <input onChange={ e => publicidadChecked(e) } class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={true}/>
                        <label class="form-check-label" for="inlineRadio1">Sí</label>
                    </div>
                    <div class="form-check form-check-inline">
                        {/* <input onChange={ e => setClientePublicidad(e.target.value) } class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={false}/> */}
                        <input onChange={ e => publicidadChecked(e) } class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={false}/>
                        <label class="form-check-label" for="inlineRadio2">No</label>
                    </div>
                </div>
            </div>

            <div className="d-grid col-3 mx-auto mb-5">
                <button type="submit" class="btn btn-danger text-uppercase">Guardar</button>
            </div>

            </form>
            
        </>
    )

}

export default EditarCliente
