import React, { Component } from "react";
import api from "../../Api.js";
import Chart from "chart.js";
import "./styles.css";
import "../../Styles/root.css";

class TotalHeader extends Component {
  constructor(props) {
    super();
    this.states = {
      textos: "Casamentos",
      values: [1, 3, 2, 4, 5, 7, 6, 8, 10, 9, 11, 12]
    };

    this.state = {
      localData: {
        data: null
      },
      usuarios: {
        id: [],
        data: [],
        total: 0
      },
      casamentos: {
        id_cliente: [],
        id_casamento: [],
        nr_convidados: [],
        estilo: [],
        valor: [],
        data: [],
        valor_total: 0,
        total: 0
      },
      invoices: {
        total_register: 0,
        total_pending: 0,
        total_approved: 0,
        total_amount: 0,
        data:[]
      }
    };
  }

  componentDidMount() {
    this.generateGraphs();
    this.receberUsuarios();
  }

  receberUsuarios = async index => {
    const userData = await api.get("user");
    const weddingData = await api.get("wedding");
    const invoice_data = (await api.get("invoice")).data;
    const apointmentData = await api.get("appointment");
    const weddingFavorites = await api.get("wedding_favorites");

    
    let today = new Date();

    userData.data.map((valor, idx) => {
      const listId = this.state.usuarios.id.concat(userData.data[idx].ID);
      const dataList = this.state.usuarios.data.concat(
        userData.data[idx].CREATED_AT
      );

      this.setState({
        usuarios: {
          id: listId,
          data: dataList
        }
      });
    });

    weddingData.data.map((valor, idx) => {
      const id_casamento_list = this.state.casamentos.id_casamento.concat(
        weddingData.data[idx].ID
      );
      const id_owner_list = this.state.casamentos.id_cliente.concat(
        weddingData.data[idx].OWNER_ID
      );
      const nr_convidados_list = this.state.casamentos.nr_convidados.concat(
        weddingData.data[idx].NUMBER_OF_GUESTS
      );
      const estilo_list = this.state.casamentos.estilo.concat(
        weddingData.data[idx].STYLE
      );

      this.setState({
        casamentos: {
          id_cliente: id_owner_list,
          id_casamento: id_casamento_list,
          nr_convidados: nr_convidados_list,
          estilo: estilo_list
        }
      });
    });

    this.setState({
      localData: {
        period: [7, 30, 90, 365],
        data: today
      },
      usuarios: {
        id: [],
        data: [],
        total: userData.data.length
      },
      casamentos: {
        total: weddingData.data.length
      }
    });
  
   
    const invoice_total_pending = invoice_data.filter(x => x.ACCEPTED != "TRUE").length;
    const invoice_total_approved = invoice_data.filter(x => x.ACCEPTED == "TRUE").length;
    const invoice_total_amount = invoice_data.reduce((sum, item) => {return sum + item.AMOUNT}, 0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
   
    this.setState({
      invoices: {
        total_register: invoice_total_pending + invoice_total_approved,
        total_pending: invoice_total_pending,
        total_approved: invoice_total_approved,
        total_amount: invoice_total_amount,
        data: invoice_data
      }
    });
  };

  generateGraphs = () => {
    var ctx = document.getElementById("agendamentosChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro"
        ],
        datasets: [
          {
            label: "Agendamentos - 1 ano",
            data: this.states.values,
            backgroundColor: ["#EA8079"],
            borderColor: ["#E2645A"],
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    var fornecedoresCtx = document
      .getElementById("fornecedoresChart")
      .getContext("2d");
    var fornecedoresChart = new Chart(fornecedoresCtx, {
      type: "doughnut",
      data: {
        labels: ["Madeira", "Pedra", "Água"],
        datasets: [
          {
            label: "Ranking de Estilos",
            data: [10, 40, 50],
            backgroundColor: ["#EA8079", "#68bfb7", "#84b8e2"],
            borderColor: ["#E2645A"],
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    var usuariosCtx = document.getElementById("usuariosChart").getContext("2d");
    var usuariosChart = new Chart(usuariosCtx, {
      type: "line",
      data: {
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro"
        ],
        datasets: [
          {
            label: "Usuários - 1 ano",
            data: [1, 3, 2, 4, 5, 7, 6, 8, 10, 9, 11, 12],
            backgroundColor: ["#86D0CB"],
            borderColor: ["#68BFB7"],
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  };

  render() {
    return (
      <div className="main">
        <div className="view-options">
          <button>1 Semana</button>
          <button>30 Dias</button>
          <button>3 Meses</button>
          <button onClick={() => this.receberUsuarios(1)}>1 Ano</button>
        </div>
        <div className="main-mini">
          <div class="mini-card">
            <strong>Usuários</strong>
            <h1>{this.state.usuarios.total}</h1>
            <p>+22%</p>
          </div>
          <div class="mini-card">
            <strong>Agendamentos</strong>
            <h1>{this.state.casamentos.total}</h1>
            <p>+22%</p>
          </div>
          <div class="mini-card">
            <strong>Pendentes</strong>
            <h1>{this.state.invoices.total_pending}</h1>
            <p>+22%</p>
          </div>
          <div class="mini-card">
            <strong>Aprovados</strong>
            <h1>{this.state.invoices.total_approved}</h1>
            <p>+22%</p>
          </div>
          <div class="mini-card">
            <strong>Total</strong>
            <h1>{this.state.invoices.total_amount}</h1>
            <p>+22%</p>
          </div>
        </div>
        <div className="main-big">
          <div className="big-chart">
            <strong>Gráficos de Agendamentos</strong>
            <canvas id="agendamentosChart" width="100" height="100" />
          </div>
          <div className="big-chart">
            <strong>Gráficos de Usuários</strong>
            <canvas id="usuariosChart" width="100" height="100" />
          </div>
          <div className="big-chart">
            <strong>Ranking de Estilos</strong>
            <canvas id="fornecedoresChart" width="100" height="100" />
          </div>
        </div>
        <div className="Divisor" />
      </div>
    );
  }
}

export default TotalHeader;
