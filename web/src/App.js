import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Landing from './containers/Landing.jsx';
import Login from './containers/Login.jsx';
import SignUp from './containers/SignUp.jsx';
import ForgotPassword from './containers/ForgotPassword';
import ChangePassword from './containers/ChangePassword';
import DeadPage from './containers/DeadPage';
import Home from './containers/Home'

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          {/* <Navbar/> */}
          <Switch>
             <Route exact path='/' component={Landing}/>
             <Route exact path ='/login' component={Login}/>
             <Route exact path ='/register' component={SignUp}/>
             <Route exact path ='/change_password/:token' component={ChangePassword}/>
             <Route exact path='/forgot_password' component={ForgotPassword}/> 
             <Route exact path='/home' component={Home}/>
             <Route path='/' component={DeadPage}/>
          </Switch>
       </BrowserRouter>
    </div>
  );
}

export default App;