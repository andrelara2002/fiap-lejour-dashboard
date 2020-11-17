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
          usuarios: [],
          agendamento: []
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
        valor_total: 0,
        total: 0
      },
      invoices: {
        total_register: 0,
        total_pending: 0,
        total_approved: 0,
        total_amount: 0,
        data: []
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

    const invoice_total_pending = invoice_data.filter(x => x.ACCEPTED != "TRUE")
      .length;
    const invoice_total_approved = invoice_data.filter(
      x => x.ACCEPTED == "TRUE"
    ).length;
    const invoice_total_amount = invoice_data
      .reduce((sum, item) => {
        return sum + item.AMOUNT;
      }, 0)
      .toLocaleString("pt-br", { style: "currency", currency: "BRL" });

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

  updateGraphics = num => {
    console.log(this.state.localData);
    if (num === 1 || num === "1") {
      const time_line = [];
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
            console.log(janeiro);
            janeiro++;
          } else if (dateComparator.getMonth() === 1) {
            console.log("Fevereiro");
            console.log(fevereiro);
            fevereiro++;
          } else if (dateComparator.getMonth() === 2) {
            console.log("Março");
            console.log(marco);
            marco++;
          } else if (dateComparator.getMonth() === 3) {
            console.log("Abril");
            console.log(abril);
            abril++;
          } else if (dateComparator.getMonth() === 4) {
            console.log("Maio");
            console.log(mai);
            mai++;
          } else if (dateComparator.getMonth() === 5) {
            console.log("Junho");
            console.log(jun);
            jun++;
          } else if (dateComparator.getMonth() === 6) {
            console.log("Julho");
            console.log(jul);
            jul++;
          } else if (dateComparator.getMonth() === 7) {
            console.log("Agosto");
            console.log(ago);
            ago++;
          } else if (dateComparator.getMonth() === 8) {
            console.log("Setembro");
            console.log(sete);
            sete++;
          } else if (dateComparator.getMonth() === 9) {
            console.log("Outubro");
            console.log(out);
            out++;
          } else if (dateComparator.getMonth() === 10) {
            console.log("Novembro");
            console.log(nov);
            nov++;
          } else if (dateComparator.getMonth() === 11) {
            console.log("Dezembro");
            console.log(dez);
            dez++;
          }
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

      console.log(this.state);

      this.myChart.data.labels = this.state.localData.period;
      this.usuariosChart.data.labels = this.state.localData.period;

      this.myChart.data.datasets[0].data = this.state.localData.graphData.agendamento;

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
