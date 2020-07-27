import React from "react";
import { Bar, defaults } from "react-chartjs-2";

interface IBarChartProps {
    data: any[];
    highlight: any[];
    domain: any[];
    height?: number;
    width?: number;
};

defaults.global.legend.display = false;
defaults.global.tooltips.enabled = false;

class BarChart extends React.Component<IBarChartProps, {}> {
    render() {
      const { data, highlight, domain } = this.props;
  
      // calculate frequency of data
      let counts: any = {};
      for (let i = 0; i < data.length; i++)
        counts[data[i]] = counts[data[i]] + 1 || 1;
  
      // generate data
      const barDataValues = [];
      for (let i = 0; i < domain[1]; i++) {
        barDataValues.push(counts[i] || 0);
      }
      const barData = {
        labels: barDataValues.map((val, i) => i),
        datasets: [
          {
            backgroundColor: barDataValues.map((val, i) =>
              i >= highlight[0] && i <= highlight[1]
                ? "rgba(135, 206, 235, 1)"
                : "rgba(255, 99, 132, 0.2)"
            ),
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            data: barDataValues
          }
        ]
      };
  
      const height = this.props.height || 200;
      const width = this.props.width || 500;
      const options = {
        responsive: false,
        tooltip: {
            enabled : false,
            custom : false
        },
        legend: {
            display: false
        },
        interactivityEnabled: false,
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                min: 0
              }
            }
          ]
        }
      };
      return <Bar data={barData} options={options} height={height} width={width}/>;
    }
  }
  
  export default BarChart;
  