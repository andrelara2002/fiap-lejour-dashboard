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
    this.userData = api.get("user?");
    console.log(this.userData);
  }

  componentDidMount() {
    this.generateGraphs();
  }

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
            <h1>2.000</h1>
            <p>+22%</p>
          </div>
          <div class="mini-card">
            <strong>Agendamentos</strong>
            <h1>2.000</h1>
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
          <div className="big-card">
            <canvas id="agendamentosChart" width="400" height="300" />
          </div>
          <div className="big-card">
            <canvas id="usuariosChart" width="400" height="300" />
          </div>
        </div>
      </div>
    );
  }
}

export default TotalHeader;
