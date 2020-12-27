import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login'
// import Admin from './components/Admin'
import {auth} from './firebase'
import Usuario from './components/Usuario';
import {MenuProvider} from './context/menusContext'




function App() {
  
  const [firebaseUser, setFirebaseUser] = React.useState(false)
  React.useEffect(() => {
    console.log('pasando por el App.js');
    auth.onAuthStateChanged(user => {
        if(user){
            setFirebaseUser(user)
        }else{
            setFirebaseUser(null)
        }
    })
}, [])

  return firebaseUser !==false ?(
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/admin">
            <Usuario />
          </Route>
          <Route path="/home" exact>
            <Navbar firebaseUser={firebaseUser} />
            Ruta de inicio
          </Route>
        </Switch>
      </div>
    </Router>
  ):(<h1>Cargandoo..</h1>);
}
const resultado = () => 
<MenuProvider>
  <App></App>
</MenuProvider>
export default resultado