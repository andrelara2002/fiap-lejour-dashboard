import React, { Component } from "react";
import api from "../../Api.js";
import Chart from "chart.js";
import "./styles.css";
import "../../Styles/root.css";
import getDayOfYear from "date-fns/esm/fp/getDayOfYear"
import getDayOfWeek from "date-fns/esm/fp/getDay"
import graph_icon from '../../Images/graph-icon.svg'
const monthsOfYear = [
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
];

const dayOfWeek = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado"
];



const filterChars = {
  Year: '1 Ano',
  ThreeMonths: '3 Meses',
  OneMonth: '30 Dias',
  OneWeek: '1 Semana'
}



class TotalHeader extends Component {
  constructor(props) {
    super();
    this.states = {
      textos: "Casamentos",
      values: []
    };

    this.state = {
      filterEnable: "1 Ano",
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

    this.buildChars();
    this.loadDatas();
  }


  buildChars() {
    var ctx = document.getElementById("agendamentosChart").getContext("2d");
    this.myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: monthsOfYear,
        datasets: [
          {
            label: "1 ano",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        labels: monthsOfYear,
        datasets: [
          {
            label: "1 ano",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

  getInvoiceForState(invoice_data) {

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

    return {
      total_register: invoice_total_pending + invoice_total_approved,
      total_pending: invoice_total_pending,
      total_approved: invoice_total_approved,
      total_amount: invoice_total_amount,
      data: invoice_data
    }
  }
  loadDatas() {

    api.get("invoice").then((response) => {
      this.setState({
        invoices: this.getInvoiceForState(response.data)
      });
    });

    api.get("user").then((response) => {

      const user_data = response.data;
      var listId = [];
      var dataList = [];

      user_data.map((valor, idx) => {
        listId = listId.concat(user_data[idx].ID);
        dataList = dataList.concat(
          user_data[idx].CREATED_AT
        );
      });

      this.setState({
        usuarios: {
          id: listId,
          data: dataList
        }
      }, () => {
        this.filterDataChars(filterChars.Year);
      });
    });

    api.get("wedding").then((response) => {
      const wedding_data = response.data;

      var id_casamento_list = [];
      var id_owner_list = [];
      var nr_convidados_list = [];
      var estilo_list = [];
      var date_list = [];

      wedding_data.map((valor, idx) => {

        id_casamento_list = id_casamento_list.concat(
          wedding_data[idx].ID
        );

        id_owner_list = id_owner_list.concat(
          wedding_data[idx].OWNER_ID
        );

        nr_convidados_list = nr_convidados_list.concat(
          wedding_data[idx].NUMBER_OF_GUESTS
        );

        estilo_list = estilo_list.concat(
          wedding_data[idx].STYLE
        );

        date_list = date_list.concat(
          wedding_data[idx].WEDDING_DATE
        );
      });

      this.setState({
        casamentos: {
          id_cliente: id_owner_list,
          id_casamento: id_casamento_list,
          nr_convidados: nr_convidados_list,
          estilo: estilo_list,
          data: date_list
        }
      }, () => {
        this.filterDataChars(filterChars.Year);
      });

    });

    //const weddingData = await api.get("wedding");
    //const apointmentData = await api.get("appointment");
    //const weddingFavorites = await api.get("wedding_favorites");

  };

  getItemsInMonth = (year, month, data) => {

    var date = new Date(data);
    return date.getFullYear() == year && date.getMonth() == month;
  }

  getItemsInDay = (year, dayOfYear, data) => {
    var date = new Date(data);
    var dataDayOfYear = getDayOfYear(date);
    return date.getFullYear() == year && dataDayOfYear == dayOfYear;
  }

  updateMyChart(weddingTotalInMonths, period, filterChar) {
    this.setState({
      localData: {
        data: this.state.localData.data,
        period: period,
        graphData: {
          usuarios: this.state.usuarios.data,
          agendamento: weddingTotalInMonths
        }
      },
      usuarios: this.state.usuarios,
      casamentos: this.state.casamentos
    }, () => {

      this.myChart.data.labels = this.state.localData.period;
      this.myChart.data.datasets[0].label = filterChar;      
      this.myChart.data.datasets[0].data = weddingTotalInMonths;
      this.myChart.update();
    });

  }

  updateUsuariosChart = (usersTotalInMonths, period, filterChar) => {
    this.setState({
      localData: {
        data: this.state.localData.data,
        period: period,
        graphData: {
          usuarios: usersTotalInMonths,
          agendamento: this.state.casamentos.data
        }
      },
      usuarios: this.state.usuarios,
      casamentos: this.state.casamentos
    }, () => {

      this.usuariosChart.data.labels = this.state.localData.period;
      this.usuariosChart.data.datasets[0].label = filterChar;   
      this.usuariosChart.data.datasets[0].data = usersTotalInMonths;
      this.usuariosChart.update();

    });


  }

  filterDataChars = filterChar => {
    var weddingTotalInMonths = [];
    var usersTotalInMonths = [];
    var period = [];
    var dateNow = new Date();
    
    this.state.filterEnable = filterChar;

    switch (filterChar) {
      case filterChars.Year:
        period = monthsOfYear;
        for (var i = 0; i < 12; i++) {
          var valueMonthWedding = this
            .state
            .casamentos
            .data
            .filter(x => this.getItemsInMonth(dateNow.getFullYear(), i, x))
            .length;

          var valueMonthUsers = this
            .state
            .usuarios
            .data
            .filter(x => this.getItemsInMonth(dateNow.getFullYear(), i, x))
            .length;

          weddingTotalInMonths.push(valueMonthWedding);
          usersTotalInMonths.push(valueMonthUsers);
        }
        break;
      case filterChars.ThreeMonths:

        for (var i = 3; i > 0; i--) {

          var lastMonth = dateNow.getMonth() - i;
          period.push(monthsOfYear[lastMonth]);

          var valueMonthWedding = this
            .state
            .casamentos
            .data
            .filter(x => this.getItemsInMonth(dateNow.getFullYear(), lastMonth, x))
            .length;

          var valueMonthUsers = this
            .state
            .usuarios
            .data
            .filter(x => this.getItemsInMonth(dateNow.getFullYear(), lastMonth, x))
            .length;

          weddingTotalInMonths.push(valueMonthWedding);
          usersTotalInMonths.push(valueMonthUsers);
        }

        break;
      case filterChars.OneMonth:
        var endDay = getDayOfYear(dateNow);
        var startDay = endDay - 30;
        var countIndex = 0;
        for (var i = startDay; i < endDay; i++) {
          countIndex++;
          period.push(countIndex);

          var valueMonthWedding = this
            .state
            .casamentos
            .data
            .filter(x => this.getItemsInDay(dateNow.getFullYear(), i, x))
            .length;

          var valueMonthUsers = this
            .state
            .usuarios
            .data
            .filter(x => this.getItemsInDay(dateNow.getFullYear(), i, x))
            .length;

          weddingTotalInMonths.push(valueMonthWedding);
          usersTotalInMonths.push(valueMonthUsers);

        }

        break;
      case filterChars.OneWeek:
        var dayInWeek = getDayOfWeek(dateNow);
        var endDay = getDayOfYear(dateNow);
        var startDay = endDay - 8;

        for (var i = startDay; i <= endDay; i++) {

          period.push(dayOfWeek[dayInWeek]);

          var valueMonthWedding = this
            .state
            .casamentos
            .data
            .filter(x => this.getItemsInDay(dateNow.getFullYear(), i, x))
            .length;

          var valueMonthUsers = this
            .state
            .usuarios
            .data
            .filter(x => this.getItemsInDay(dateNow.getFullYear(), i, x))
            .length;

          weddingTotalInMonths.push(valueMonthWedding);
          usersTotalInMonths.push(valueMonthUsers);

          if (dayInWeek >= 6) {
            dayInWeek = 0;
          } else if (dayInWeek >= 0) {
            dayInWeek++;
          } else if (dayInWeek < 0) {
            dayInWeek--;
          }
        }

        break;
    }

    this.updateMyChart(weddingTotalInMonths, period, filterChar);
    this.updateUsuariosChart(usersTotalInMonths, period, filterChar);
  };

  render() {
    return (

      <div className="main">
        <div className='main-wrapper'>
          <div className='inputHeader'>
            <img src={graph_icon} alt=''></img>
            <h1>Resumo por: {this.state.filterEnable}</h1>
          </div>
          <div className="view-options">
            <button onClick={() => this.filterDataChars(filterChars.OneWeek)}>1 Semana</button>
            <button onClick={() => this.filterDataChars(filterChars.OneMonth)}>30 Dias</button>
            <button onClick={() => this.filterDataChars(filterChars.ThreeMonths)}>3 Meses</button>
            <button onClick={() => this.filterDataChars(filterChars.Year)}>1 Ano</button>
          </div>
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
            <strong>Agendamentos</strong>
            <canvas id="agendamentosChart" width="100" height="100" />
          </div>
          <div className="big-chart">
            <strong>Usuários</strong>
            <canvas id="usuariosChart" width="100" height="100" />
          </div>
          <div className="big-chart">
            <strong>Categorias vs Notas</strong>
            <canvas id="fornecedoresChart" width="100" height="100" />
          </div>
        </div>
        <div className="Divisor" />
      </div>

    );
  }
}

export default TotalHeader;
