import React, { Component } from "react";

import "./styles.css";
import "../../Styles/root.css";

class DetalhesComponent extends Component {
  constructor(props) {
    super();
    this.casamentos = {
      idCasamento: [1, 2, 3],
      idUsuario: [2002, 2018, 2020],
      nrConvidados: [300, 100, 180],
      nrOrcamento: [2400.0, 3000.0, 9000.0],
      estilo: ["Festança", "Coquetel", "Memorável"],
      data: ["19-11-2020", "21-01-2021", "23-10-2022"]
    };

    this.usuario = {
      idUsuario: [2002, 2018, 2020],
      data: ["19-11-2020", "21-01-2021", "23-10-2022"]
    };

    this.agendamentos = {
      idCasamento: [1, 2, 3, 4, 5, 6],
      fornecedor: [
        "Fast Shop",
        "Fast Shop",
        "Fast Shop",
        "Fast Shop",
        "Fast Shop",
        "Fast Shop"
      ],
      categoriaFornecedor: [
        "Decoração",
        "Buffet",
        "Decoração",
        "Decoração",
        "Decoração",
        "Buffet"
      ],
      statusAgendamento: [
        "Atrasado",
        "Concluido",
        "Pendente",
        "Concluido",
        "Concluido",
        "Atrasado"
      ],
      data: [
        "19-11-2002",
        "21-12-2020",
        "30-08-2001",
        "20-12-2021",
        "16-09-2020",
        "12-12-2012"
      ]
    };
  }

  redirect = num => {
    console.log(num);
  };

  listaUsuarios = () => {
    const { idUsuario, data } = this.usuario;

    return idUsuario.map((valor, idx) => {
      return (
        <li key={idx} className="listElement">
          <strong>{valor}</strong>
          <strong>{data[idx]}</strong>
          <button className="list-button" onClick={() => redirect(idx)}>
            Acessar
          </button>
        </li>
      );
    });
  };

  listaCasamentos = () => {
    const {
      idCasamento,
      idUsuario,
      nrConvidados,
      nrOrcamento,
      estilo,
      data
    } = this.casamentos;

    return idCasamento.map((valor, idx) => {
      return (
        <li key={idx} className="listElement">
          <strong>{valor}</strong>
          <strong>{idUsuario[idx]}</strong>
          <strong>{nrConvidados[idx]}</strong>
          <strong>{nrOrcamento[idx]}</strong>
          <strong>{estilo[idx]}</strong>
          <strong>{data[idx]}</strong>
          <button className="list-button" onClick={() => this.redirect(idx)}>
            Acessar
          </button>
        </li>
      );
    });
  };

  listaAgendamentos = () => {
    const {
      idCasamento,
      fornecedor,
      categoriaFornecedor,
      statusAgendamento,
      data
    } = this.agendamentos;

    return idCasamento.map((valor, idx) => {
      return (
        <li key={idx} className="listElement">
          <strong>{valor}</strong>
          <strong>{fornecedor[idx]}</strong>
          <strong>{categoriaFornecedor[idx]}</strong>
          <strong>{statusAgendamento[idx]}</strong>
          <strong>{data[idx]}</strong>
          <button className="list-button" onClick={() => this.redirect(idx)}>
            Acessar
          </button>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="main">
        <div className="last">
          <div className="big-card">
            <div className="mini-header">
              <h1>Últimos Agendamentos</h1>
              <input />
            </div>
            <ul>{this.listaCasamentos()}</ul>
          </div>
          <div className="big-card">
            <div className="mini-header">
              <h1>Últimos Usuários</h1>
              <input />
            </div>
            <ul>{this.listaUsuarios()}</ul>
          </div>
        </div>
        <div className="StatusAgendamento">
          <div className="big-card">
            <div className="mini-header">
              <h1>Status de Agendamentos</h1>
              <input />
            </div>
            <ul>{this.listaAgendamentos()}</ul>
          </div>
        </div>
        <div className="Divisor" />
      </div>
    );
  }
}

export default DetalhesComponent;
