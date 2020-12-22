import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/login" exact>
            Ruta de login
          </Route>
          <Route path="/admin">
            Ruta de administracion
          </Route>
          <Route path="/" exact>
            Ruta de inicio
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
