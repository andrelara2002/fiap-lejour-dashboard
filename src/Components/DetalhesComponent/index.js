import React, { Component } from "react";

import "./styles.css";
import api from "../../Api.js";
import "../../Styles/root.css";

import search_icon from "../../Images/search-icon.svg";
import wedding_icon from "../../Images/wedding-icon.svg";
import user_icon from "../../Images/user-icon.svg";
import agendamentos_icon from "../../Images/agendamentos-icon.svg";

import appointmentDatabase from "../../data/appointment.database.json";
import invoiceDatabase from "../../data/invoice.database.json";
import userDatabase from "../../data/user.database.json";
import wenddingDatabase from "../../data/wendding.database.json";
import wenddingFavoritesDatabase from "../../data/wendding-favorites.database.json";

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
    this.loadData();
  }

  loadData() {
    api.get("user?limit=10")
      .then(response => {
        return response;
      })
      .catch((response) => {
        response.data = userDatabase;
        return response;
      })
      .then((response) => {
        const user_data = response.data;
        var listId = [];
        var dataList = [];
        user_data.map((valor, idx) => {
          listId = listId.concat(user_data[idx].ID);
          dataList = dataList.concat(user_data[idx].CREATED_AT);

          this.setState({
            usuario: {
              idUsuario: listId,
              data: dataList
            }
          });
        });
      });

    api.get("wedding?limit=10")
      .then((response) => {
        return response;
      })
      .catch((response) => {
        response.data = wenddingDatabase;
        return response;
      })
      .then(response => {
        const wedding_data = response.data;

        var id_casamento_list = [];
        var id_owner_list = [];
        var nr_convidados_list = [];
        var estilo_list = [];
        var date_list = [];
        var valor_list = [];

        wedding_data.map((valor, idx) => {
          id_casamento_list = id_casamento_list.concat(wedding_data[idx].ID);
          id_owner_list = id_owner_list.concat(wedding_data[idx].OWNER_ID);
          nr_convidados_list = nr_convidados_list.concat(
            wedding_data[idx].NUMBER_OF_GUESTS
          );
          estilo_list = estilo_list.concat(wedding_data[idx].STYLE);
          date_list = date_list.concat(wedding_data[idx].WEDDING_DATE);
          valor_list = valor_list.concat(wedding_data[idx].BUDGET);
        });

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

    api.get("appointment?limit=10")
      .then((response) => {
        return response;
      })
      .catch((response) => {
        response.data = appointmentDatabase;
        return response;
      })
      .then(response => {
        const appointment_data = response.data;
        var id_list = [];
        var id_casamento_list = [];
        var id_distribuidor_list = [];
        var status_list = [];
        var categoria_fornecedor_list = [];

        appointment_data.map((valor, idx) => {
          id_list = id_list.concat(appointment_data[idx].ID);

          id_casamento_list = id_casamento_list.concat(
            appointment_data[idx].WEDDING_ID
          );

          id_distribuidor_list = id_distribuidor_list.concat(
            appointment_data[idx].VENDOR_ID
          );

          status_list = status_list.concat(appointment_data[idx].STATUS);

          categoria_fornecedor_list = categoria_fornecedor_list.concat(
            appointment_data[idx].VENDOR_CATEGORY
          );
        });

        this.setState({
          appointment: {
            id: id_list,
            id_casamento: id_casamento_list,
            id_distribuidor: id_distribuidor_list,
            status: status_list,
            categoria_fornecedor: categoria_fornecedor_list
          }
        });
      });
  }

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
              <div className="inputHeader">
                <img src={wedding_icon} alt="" />
                <h1>Últimos Agendamentos</h1>
              </div>
              <div className="search-div">
                <input />
                <button>
                  <img src={search_icon} alt="pesquisar" />
                </button>
              </div>
            </div>
            <ul>
              <li className="listElement">
                <strong className="style-modifier">id</strong>
                <strong className="style-modifier">valor</strong>
                <strong className="style-modifier">conv</strong>
                <strong className="style-modifier">estilo</strong>
                <strong className="style-modifier">data</strong>
              </li>
              {this.listaCasamentos()}
            </ul>
          </div>
          <div className="big-card" id="card_usuarios">
            <div className="mini-header">
              <div className="inputHeader">
                <img src={user_icon} alt="" />
                <h1>Últimos Usuários</h1>
              </div>
              <div className="search-div">
                <input />
                <button>
                  <img src={search_icon} alt="pesquisar" />
                </button>
              </div>
            </div>
            <ul>
              <li className="listElement">
                <strong className="style-modifier">id</strong>
                <strong className="style-modifier">data</strong>
              </li>
              {this.listaUsuarios()}
            </ul>
          </div>
        </div>
        <div className="StatusAgendamento">
          <div className="big-card">
            <div className="mini-header">
              <div className="inputHeader">
                <img src={agendamentos_icon} alt="" />
                <h1>Status de Agendamentos</h1>
              </div>
              <div className="search-div">
                <input />
                <button>
                  <img src={search_icon} alt="pesquisar" />
                </button>
              </div>
            </div>
            <ul>
              <li className="listElement">
                <strong className="style-modifier">id</strong>
                <strong className="style-modifier">id_casamento</strong>
                <strong className="style-modifier">conv</strong>
                <strong className="style-modifier">status</strong>
                <strong className="style-modifier">id_dis</strong>
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
