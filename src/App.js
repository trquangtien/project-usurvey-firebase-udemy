import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Uservey from './components/usurvey.component.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React - Uservey App</h1>
        </header>
        <Uservey />
      </div>
    );
  }
}

export default App;
