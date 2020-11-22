import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider as AlertProvider} from 'react-alert';
import Alert from './components/Alert';
import reportWebVitals from './reportWebVitals';

import rootReducer from './store/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

const AlertTemplate = ({style, options, message, close}) =>(
   <Alert
     style = {style}
     options = {options}
     message = {message}
     close = {close}
   />
);

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
     <AlertProvider template={AlertTemplate}>
        < App /> 
    </AlertProvider>
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
