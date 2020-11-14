import React, { Component } from "react";
import lejourLogo from "../../Images/lejour-logo.svg";
import "./styles.css";
import "../../Styles/root.css";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={lejourLogo} alt="Lejour" />
        <h1> Dashboard </h1>
        <button id="red-button">Sair</button>
      </div>
    );
  }
}

export default Header;
