import React, { Component } from 'react';
import './App.css';
import SMSForm from './SMSForm'
import SMSContainer from './SMSContainer'
import logo from './Dodge_white_logo@2x.png'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: ''
    };
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span id="logo">
            <img src={logo} alt="dodge logo"/>
          </span>
        </header>
        <header className="containerHeader">
          Next Best Action
        </header>
        <section className="App-container">
          <SMSContainer/>
        </section>
      </div>
    );
  }
}

export default App;
