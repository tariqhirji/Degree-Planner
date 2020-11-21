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