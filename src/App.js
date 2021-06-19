import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import "antd/dist/antd.css";

import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Result from './components/Result/Result';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={Home} />
        <Route exact path='/result' component={Result} />
        <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
