import React from "react";
import "./style.css";

import TotalHeader from "./Components/TotalHeader/index.js";
import DetalhesComponent from "./Components/DetalhesComponent/index.js";
import Header from "./Components/Header/index.js";

export default function App() {
  return (
    <div>
      <Header />
      <TotalHeader />
      <DetalhesComponent />
    </div>
  );
}
