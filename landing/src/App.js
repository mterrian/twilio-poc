import React, { Component } from 'react';
import wrangler from './wrangler.png'
import journey from './2019-dodge-journey-gallery-6.jpg.image.2880.jpg'
import qr from './personal-invitation-code@2x.png'
import './App.css';


class App extends Component {



  render() {
    return (
      <div className="App" id="">
        <img src={journey} alt="Wrangler With QR Code"/>
        <img id="qr" src={qr} alt="QR Code"/>
        <span>Hello User, Buy your new 2019 Car by August 31 and receive a private offer of $500 on top of all existing incentives!</span>
      </div>
    );
  }
}

export default App;
