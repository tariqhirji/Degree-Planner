import React, {Component} from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from './store/userActions';
import { getMe } from './routes/authRoutes';
import Navbar from './components/Navbar.jsx';
import Landing from './containers/Landing.jsx';
import Login from './containers/Login.jsx';
import SignUp from './containers/SignUp.jsx';
import ForgotPassword from './containers/ForgotPassword';
import ChangePassword from './containers/ChangePassword';
import DeadPage from './containers/DeadPage';
import CourseInfo from './containers/CourseInfo';
import Profile from './containers/Profile'
import Home from './containers/Home'
import DepartmentInfo from './containers/DepartmentInfo';
import CoursesPage from './containers/CoursesPage';

class App extends Component{
   async componentDidMount(){
      const { dispatch } = this.props;

      const user = await getMe();
      
      dispatch(setUser(user));
   }

   render(){
      const { signedIn } = this.props;

      return (
         <div className="App">
            <BrowserRouter>
               {!signedIn? <Navbar/> : null}
               <Switch>
                  <Route exact path='/' render={() => (signedIn)? <Home/> : <Landing/> }/>
                  <Route exact path='/profile' component={Profile}/> 
                  <Route exact path ='/login' component={Login}/>
                  <Route exact path ='/register' component={SignUp}/>
                  <Route exact path ='/departments/:id' component={DepartmentInfo}/>
                  <Route exact path ='/change_password/:token' component={ChangePassword}/>
                  <Route exact path='/forgot_password' component={ForgotPassword}/> 
                  <Route exact path='/course/:id' component={CourseInfo}/>
                  <Route exact path='/courses' component={CoursesPage}/>
                  <Route path='/' component={DeadPage}/>
               </Switch>
            </BrowserRouter>
         </div>
       );
   }
}


const mapStateToProps = (state) => ({signedIn : state.signedIn});
const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(App);