import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Landing from './containers/Landing.jsx'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Landing />
      </BrowserRouter>
    </div>
  );
}

export default App;
