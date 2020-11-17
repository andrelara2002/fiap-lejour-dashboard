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
      values: []
    };

    this.state = {
      localData: {
        data: [],
        period: [],
        graphData: {
          usuarios: [1, 3, 2, 4, 5, 7, 6, 8, 10, 9, 11, 12],
          agendamento: [1, 3, 2, 4, 5, 7, 6, 8, 10, 9, 11, 12]
        }
      },
      usuarios: {
        id: [],
        data: []
      },
      casamentos: {
        id_cliente: [],
        id_casamento: [],
        nr_convidados: [],
        estilo: [],
        valor: [],
        data: [],
        valor_total: 0
      }
    };
  }

  componentDidMount() {
    this.receberUsuarios();

    var ctx = document.getElementById("agendamentosChart").getContext("2d");
    this.myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.state.localData.period,
        datasets: [
          {
            label: "Agendamentos - 1 ano",
            data: this.state.localData.graphData.agendamento,
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
    this.fornecedoresChart = new Chart(fornecedoresCtx, {
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
    this.usuariosChart = new Chart(usuariosCtx, {
      type: "line",
      data: {
        labels: this.state.localData.period,
        datasets: [
          {
            label: "Usuários - 1 ano",
            data: this.state.localData.graphData.usuarios,
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
  }

  receberUsuarios = async index => {
    const userData = await api.get("user");
    const weddingData = await api.get("wedding");
    const invoiceData = await api.get("invoice");
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
      const date_list = this.state.casamentos.data.concat(
        weddingData.data[idx].WEDDING_DATE
      );

      this.setState({
        casamentos: {
          id_cliente: id_owner_list,
          id_casamento: id_casamento_list,
          nr_convidados: nr_convidados_list,
          estilo: estilo_list,
          data: date_list
        }
      });
    });

    this.setState({
      localData: {
        data: today,
        period: this.state.localData.period,
        graphData: this.state.localData.graphData
      }
    });
  };

  updateGraphics = num => {
    if (num === 1 || num === "1") {
      this.state.localData.graphData.agendamento = [];
      var janeiro = 0;
      var fevereiro = 0;
      var marco = 0;
      var abril = 0;
      var mai = 0;
      var jun = 0;
      var jul = 0;
      var ago = 0;
      var sete = 0;
      var out = 0;
      var nov = 0;
      var dez = 0;
      this.state.casamentos.data.map((valor, idx) => {
        let dateComparator = new Date(this.state.casamentos.data[idx]);
        if (
          dateComparator.getFullYear() ===
          this.state.localData.data.getFullYear()
        ) {
          if (dateComparator.getMonth() === 0) {
            console.log("Janeiro");
            janeiro++;
          } else if (dateComparator.getMonth() === 1) {
            console.log("Fevereiro");
            fevereiro++;
          } else if (dateComparator.getMonth() === 2) {
            console.log("Março");
            marco++;
          } else if (dateComparator.getMonth() === 3) {
            console.log("Abril");
            abril++;
          } else if (dateComparator.getMonth() === 4) {
            console.log("Maio");
            mai++;
          } else if (dateComparator.getMonth() === 5) {
            console.log("Junho");
            jun++;
          } else if (dateComparator.getMonth() === 6) {
            console.log("Julho");
            jul++;
          } else if (dateComparator.getMonth() === 7) {
            console.log("Agosto");
            ago++;
          } else if (dateComparator.getMonth() === 8) {
            console.log("Setembro");
            sete++;
          } else if (dateComparator.getMonth() === 9) {
            console.log("Outubro");
            out++;
          } else if (dateComparator.getMonth() === 10) {
            console.log("Novembro");
            nov++;
          } else if (dateComparator.getMonth() === 11) {
            console.log("Dezembro");
            dez++;
          }

          this.setState({
            localData: {
              data: this.state.localData.data,
              period: this.state.localData.period,
              graphData: {
                usuarios: this.state.localData.graphData.usuarios,
                agendamento: [
                  janeiro,
                  fevereiro,
                  marco,
                  abril,
                  mai,
                  jun,
                  jul,
                  ago,
                  sete,
                  out,
                  nov,
                  dez
                ]
              }
            },
            usuarios: this.state.usuarios,
            casamentos: this.state.casamentos
          });
          console.log(this.state);
        }
      });
      this.setState({
        localData: {
          data: this.state.localData.data,
          period: [
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
          graphData: this.state.localData.graphData
        },
        usuarios: this.state.usuarios,
        casamentos: this.state.casamentos
      });

      console.log(this.state);

      this.myChart.data.labels = this.state.localData.period;
      this.usuariosChart.data.labels = this.state.localData.period;

      this.usuariosChart.update();
      this.myChart.update();
    }
  };

  render() {
    return (
      <div className="main">
        <div className="view-options">
          <button>1 Semana</button>
          <button>30 Dias</button>
          <button>3 Meses</button>
          <button onClick={() => this.updateGraphics(1)}>1 Ano</button>
        </div>
        <div className="main-mini">
          <div class="mini-card">
            <strong>Usuários</strong>
            <h1>{this.state.usuarios.id.length}</h1>
            <p>+22%</p>
          </div>
          <div class="mini-card">
            <strong>Agendamentos</strong>
            <h1>{this.state.casamentos.id_cliente.length}</h1>
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
