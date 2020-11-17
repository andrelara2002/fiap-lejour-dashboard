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
      },

      appointment: {
        id: [],
        id_casamento: [],
        id_distribuidor: [],
        status: [],
        categoria_fornecedor: []
      }
    };
  }
  componentDidMount() {
    this.receberDados();
  }
  receberDados = async () => {
    const userData = await api.get("user?limit=10");
    const weddingData = await api.get("wedding?limit=10");
    const appointmentData = await api.get("appointment?limit=20");

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

    appointmentData.data.map((valor, idx) => {
      const id_list = this.state.appointment.id.concat(
        appointmentData.data[idx].ID
      );
      const id_casamento_list = this.state.appointment.id_casamento.concat(
        appointmentData.data[idx].WEDDING_ID
      );
      const id_distribuidor_list = this.state.appointment.id_distribuidor.concat(
        appointmentData.data[idx].VENDOR_ID
      );
      const status_list = this.state.appointment.status.concat(
        appointmentData.data[idx].STATUS
      );
      const categoria_fornecedor_list = this.state.appointment.status.concat(
        appointmentData.data[idx].VENDOR_CATEGORY
      );

      this.setState({
        appointment: {
          id: id_list,
          id_casamento: id_casamento_list,
          id_distribuidor: id_distribuidor_list,
          status: status_list,
          categoria_fornecedor: categoria_fornecedor_list
        }
      });
      console.log(this.state.appointment);
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
      const valor_list = this.state.casamentos.nrOrcamento.concat(
        weddingData.data[idx].BUDGET
      );

      this.setState({
        casamentos: {
          idUsuario: id_owner_list,
          idCasamento: id_casamento_list,
          nrConvidados: nr_convidados_list,
          estilo: estilo_list,
          nrOrcamento: valor_list,
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
          <strong>{idUsuario[idx]}</strong>
          <strong>{nrOrcamento[idx]}</strong>
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
      id,
      id_casamento,
      id_distribuidor,
      status,
      categoria_fornecedor
    } = this.state.appointment;

    return id.map((valor, idx) => {
      return (
        <li key={idx} className="listElement">
          <strong>{valor}</strong>
          <strong>{id_casamento[idx]}</strong>
          <strong>{id_distribuidor[idx]}</strong>
          <strong>{status[idx]}</strong>
          <strong>{categoria_fornecedor[idx]}</strong>
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
            <ul>
              <li className="listElement">
                <strong>id</strong>
                <strong>valor</strong>
                <strong>conv</strong>
                <strong>estilo</strong>
                <strong>data</strong>
              </li>
              {this.listaCasamentos()}
            </ul>
          </div>
          <div className="big-card" id="card_usuarios">
            <div className="mini-header">
              <h1>Últimos Usuários</h1>
              <input />
            </div>
            <ul>
              <li className="listElement">
                <strong>id</strong>
                <strong>data</strong>
              </li>
              {this.listaUsuarios()}
            </ul>
          </div>
        </div>
        <div className="StatusAgendamento">
          <div className="big-card">
            <div className="mini-header">
              <h1>Status de Agendamentos</h1>
              <input />
            </div>
            <ul>
              <li className="listElement">
                <strong>id</strong>
                <strong>id_casamento</strong>
                <strong>conv</strong>
                <strong>status</strong>
                <strong>id_dis</strong>
              </li>
              {this.listaAgendamentos()}
            </ul>
          </div>
        </div>
        <div className="Divisor" />
      </div>
    );
  }
}

export default DetalhesComponent;
