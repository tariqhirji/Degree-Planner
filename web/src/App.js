import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Landing from './containers/Landing.jsx'
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ForgotPassword from './containers/ForgotPassword';
import DeadPage from './containers/DeadPage';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Switch>
             <Route exact path='/forgot_password' component={ForgotPassword}/> 
             <Route path='/' component={DeadPage}/>
          </Switch>
       </BrowserRouter>
    </div>
  );
}

export default App;