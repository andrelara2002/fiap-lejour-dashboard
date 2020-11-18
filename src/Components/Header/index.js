import React, { Component } from "react";
import lejourLogo from "../../Images/lejour-logo.svg";
import "./styles.css";
import "../../Styles/root.css";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <a href="https://painel.lejour.com.br/buscar"><img src={lejourLogo} alt="Lejour" /></a>
        <a href="https://painel.lejour.com.br/login"> <button id="red-button"> Sair</button></a>
      </div>
    );
  }
}

export default Header;
