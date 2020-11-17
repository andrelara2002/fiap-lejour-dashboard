import React, { Component } from "react";
import lejourLogo from "../../Images/lejour-logo.svg";
import "./styles.css";

class Load extends Component {
  render() {
    return (
      <div class="container" id="root">
	<div class="loader-container">
  <div class="imagem">  <img src={lejourLogo} alt="Lejour" /> </div>
 
		
		<div class="loader">
    	<div></div>
			<div></div>
		</div>
	</div>
</div>
    );
  }
}

export default Load;