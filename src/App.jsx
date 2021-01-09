import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import {auth} from './firebase'
// import PruebaBoostrap from './components/PruebaBoostrap';
import PanelControl from './components/PanelControl';



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
      {/* <div className="container"> */}
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          {/* <Route path="/admin">
            <Usuario firebaseUser={firebaseUser}/>
          </Route>
          <Route path="/home" exact>
            <Navbar firebaseUser={firebaseUser} />
            Ruta de inicio
          </Route> */}
          {/* <Route path="/boostrap" exact>
            <PruebaBoostrap />
          </Route> */}
          <Route path="/panelcontrol" firebaseUser={firebaseUser}>
            <PanelControl />
          </Route>
        </Switch>
      {/* </div> */}
    </Router>
  ):(<h1>Cargandoo..</h1>);
}

export default App