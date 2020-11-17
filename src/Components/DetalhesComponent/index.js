import React, { Component } from "react";

import "./styles.css";
import api from "../../Api.js";
import "../../Styles/root.css";

class DetalhesComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      casamentos: {
        idCasamento: [],
        idUsuario: [],
        nrConvidados: [],
        nrOrcamento: [],
        estilo: [],
        data: []
      },
      usuario: {
        idUsuario: [],
        data: []
      },

      agendamentos: {
        idCasamento: [],
        fornecedor: [],
        categoriaFornecedor: [],
        statusAgendamento: [],
        data: []
      }
    };
  }
  componentDidMount() {
    this.receberDados();
  }
  receberDados = async () => {
    const userData = await api.get("user?limit=10");
    const weddingData = await api.get("wedding?limit=10");

    let today = new Date();

    userData.data.map((valor, idx) => {
      const listId = this.state.usuario.idUsuario.concat(userData.data[idx].ID);
      const dataList = this.state.usuario.data.concat(
        userData.data[idx].CREATED_AT
      );

      this.setState({
        usuario: {
          idUsuario: listId,
          data: dataList
        }
      });
    });

    weddingData.data.map((valor, idx) => {
      const id_casamento_list = this.state.casamentos.idCasamento.concat(
        weddingData.data[idx].ID
      );
      const id_owner_list = this.state.casamentos.idUsuario.concat(
        weddingData.data[idx].OWNER_ID
      );
      const nr_convidados_list = this.state.casamentos.nrConvidados.concat(
        weddingData.data[idx].NUMBER_OF_GUESTS
      );
      const estilo_list = this.state.casamentos.estilo.concat(
        weddingData.data[idx].STYLE
      );
      const date_list = this.state.casamentos.data.concat(
        weddingData.data[idx].WEDDING_DATE
      );

      this.setState({
        casamentos: {
          idUsuario: id_owner_list,
          idCasamento: id_casamento_list,
          nrConvidados: nr_convidados_list,
          estilo: estilo_list,
          data: date_list
        }
      });
    });
  };

  redirect = num => {
    console.log(num);
  };

  listaUsuarios = () => {
    const { idUsuario, data } = this.state.usuario;

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
    } = this.state.casamentos;

    return idCasamento.map((valor, idx) => {
      return (
        <li key={idx} className="listElement">
          <strong>{valor}</strong>
          <strong>{idUsuario[idx]}</strong>
          <strong>{nrConvidados[idx]}</strong>
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
    } = this.state.agendamentos;

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
