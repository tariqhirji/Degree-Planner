import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import DeadPage from './containers/DeadPage';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Switch>
             <Route path='/' component={DeadPage}/>
          </Switch>
       </BrowserRouter>
    </div>
  );
}

export default App;
