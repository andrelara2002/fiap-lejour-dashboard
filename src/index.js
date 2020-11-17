import React from "react";
import ReactDOM from "react-dom";
import Load from "./load.js";
import App from "./App";

ReactDOM.render(<Load />, document.getElementById("root"));

setTimeout(() => {
	ReactDOM.render(
		<App />,  
    document.getElementById('root')
	);
}, 4800);
