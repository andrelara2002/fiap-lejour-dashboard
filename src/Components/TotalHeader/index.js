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
      usuarios: {
        total: 0
      },
      casamentos: {
        total: 0
      }
    };
  }

  componentDidMount() {
    this.generateGraphs();
    this.receberUsuarios();
  }

  receberUsuarios = async () => {
    const userData = await api.get("user");
    const weddingData = await api.get("wedding");
    const invoiceData = await api.get("invoice");
    const apointmentData = await api.get("appointment");
    const weddingFavorites = await api.get("wedding_favorites");

    this.setState({
      usuarios: {
        total: userData.data.length
      },
      casamentos: {
        total: weddingData.data.length
      }
    });
    console.log(this.state.usuarios.valor);

    console.log(userData.data);
    console.log(weddingData.data);
    console.log(invoiceData.data);
    console.log(apointmentData.data);
    console.log(weddingFavorites.data);
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
          <button>1 Ano</button>
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
            <h1>2.000</h1>
            <p>+22%</p>
          </div>
          <div class="mini-card">
            <strong>Atrasados</strong>
            <h1>2.000</h1>
            <p>+22%</p>
          </div>
          <div class="mini-card">
            <strong>Total</strong>
            <h1>2.000</h1>
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
