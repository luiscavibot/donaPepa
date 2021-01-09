  
import React from 'react';
import { auth} from '../firebase'
import { withRouter } from "react-router-dom";

const Login = (props) => {

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
