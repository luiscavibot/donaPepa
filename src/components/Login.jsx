  
import React from 'react';
import { auth} from '../firebase'
import { withRouter } from "react-router-dom";
// import {db} from '../firebase';
import axios from "axios"


const Login = (props) => {
    // React.useEffect(() => {
    //   console.log("inicio el axios para enviar a nubefact");
    //   const emitir = async () =>{
    //     const documento = {
    //       operacion: "generar_comprobante",
    //       tipo_de_comprobante: 1,
    //       serie: "FFF1",
    //       numero:54,
    //       sunat_transaction: 1,
    //       cliente_tipo_de_documento: 6,
    //       cliente_numero_de_documento: "20600695771",
    //       cliente_denominacion: "NUBEFACT SA",
    //       cliente_direccion: "CALLE LIBERTAD 116 MIRAFLORES - LIMA - PERU",
    //       cliente_email: "lcastillov123@gmail.com",
    //       cliente_email_1: "",
    //       cliente_email_2: "",
    //       fecha_de_emision: "22-01-2021",
    //       fecha_de_vencimiento: "",
    //       moneda: 1,
    //       tipo_de_cambio: "",
    //       porcentaje_de_igv: 18.00,
    //       descuento_global: "",
    //       total_descuento: "",
    //       total_anticipo: "",
    //       total_gravada: 600,
    //       total_inafecta: "",
    //       total_exonerada: "",
    //       total_igv: 108,
    //       total_gratuita: "",
    //       total_otros_cargos: "",
    //       total: 708,
    //       percepcion_tipo: "",
    //       percepcion_base_imponible: "",
    //       total_percepcion: "",
    //       total_incluido_percepcion: "",
    //       total_impuestos_bolsas: "",
    //       detraccion: false,
    //       observaciones: "",
    //       documento_que_se_modifica_tipo: "",
    //       documento_que_se_modifica_serie: "",
    //       documento_que_se_modifica_numero: "",
    //       tipo_de_nota_de_credito: "",
    //       tipo_de_nota_de_debito: "",
    //       enviar_automaticamente_a_la_sunat: true,
    //       enviar_automaticamente_al_cliente: true,
    //       condiciones_de_pago: "",
    //       medio_de_pago: "",
    //       placa_vehiculo: "",
    //       orden_compra_servicio: "",  
    //       formato_de_pdf: "",
    //       generado_por_contingencia: "",
    //       bienes_region_selva: "",
    //       servicios_region_selva: "",
    //       items: [
    //             {
    //               unidad_de_medida: "NIU",
    //               codigo: "001",
    //               codigo_producto_sunat: "10000000",
    //               descripcion: "DETALLE DEL PRODUCTO",
    //               cantidad: 1,
    //               valor_unitario: 500,
    //               precio_unitario: 590,
    //               descuento: "",
    //               subtotal: 500,
    //               tipo_de_igv: 1,
    //               igv: 90,
    //               total: 590,
    //               anticipo_regularizacion: false,
    //               anticipo_documento_serie: "",
    //               anticipo_documento_numero: ""
    //             },
    //             {
    //               unidad_de_medida: "NIU",
    //               codigo: "001",
    //               codigo_producto_sunat: "20000000",
    //               descripcion: "DETALLE DEL PRODUCTO",
    //               cantidad: 1,
    //               valor_unitario: 20,
    //               precio_unitario: 23.60,
    //               descuento: "",
    //               subtotal: 100,
    //               tipo_de_igv: 1,
    //               igv: 18,
    //               total: 118,
    //               anticipo_regularizacion: false,
    //               anticipo_documento_serie: "",
    //               anticipo_documento_numero: ""
    //             }
    //       ],
    //       guias: [
    //               {
    //                   guia_tipo: 1,
    //                   guia_serie_numero: "0001-23"
    //               }
    //       ]    
    //     };

    //     const config = {
    //       headers: { 
    //         "Content-Type" : "application/json"
    //       }
    //     };

        
    //     await axios.post('http://46.183.113.134:3000/api/ventas', documento, config)
    //     .then(function (params) {
    //       console.log(params.data);
    //     })
    //     .catch(function (params) {
    //       console.log(params.data);
    //     })       
        
    //   };
    //   emitir();
    // }, []);


    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)
    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
            setError('Debe ingresar un email.')
            return
        }
        if(!pass.trim()){
            setError('Debe ingresar un password.')
            return
        }
        if(pass.length < 6){
            setError('La contraseña deber ser igual o mayor a 6 caracteres.')
            return
        }
        setError(null)
        login()
    }
    const login = React.useCallback(async() => {
        try {
            await auth.signInWithEmailAndPassword(email, pass)  
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/panelcontrol/reportes-ventas') 
        } catch (error) {
            if(error.code === 'auth/user-not-found'){
                setError('Usuario o contraseña incorrecto')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Usuario o contraseña incorrecto')
            }
        }
    }, [email, pass, props.history])

    // const FieldValue = admin.firestore.FieldValue;
    // const docRef = db.collection('objects').doc('some-id');


    return (

        <div className="container vh-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-4 border p-4 rounded">
              <form onSubmit={procesarDatos}>
                <div className="d-flex justify-content-around p-3">
                  <h1 className="fs-3">Iniciar Sesión</h1>
                  <img src='./img/donapepa.png' className="logo" alt="Doña Pepa"/>
                </div>
                <div className="mb-3">
                  <input type="email" 
                         className="form-control" 
                         id="exampleInputEmail1" 
                         aria-describedby="emailHelp" 
                         placeholder="Usuario"
                         onChange={ e => setEmail(e.target.value) }
                         value={email}/>
                </div>
                <div className="mb-3">
                  <input type="password" 
                         className="form-control" 
                         id="exampleInputPassword1" 
                         placeholder="Contraseña" 
                         onChange={ e => setPass(e.target.value) }
                         value={pass}/>
                </div>
                    {
                        error ? (
                                  <div className="alert alert-danger" role="alert">
                                    {error}
                                  </div>
                        ) : null
                    }
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label">Recordar contraseña</label>
                </div>
                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                <p className="text-center pt-3 olvidaste">¿Olvidaste tu contraseña? Click aquí</p>
              </form>
            </div>
          </div>
        </div>
    );
}

export default withRouter (Login)
