import { Component, OnInit  } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-annual-sales-chart',
  // encapsulation: ViewEncapsulation.None, // Add this line
  templateUrl: './annual-sales-chart.component.html',
  styleUrls: ['./annual-sales-chart.component.scss']
})
export class AnnualSalesChartComponent implements OnInit {
  chart = new Chart({
    chart: {
      type: 'line',
    },
    title: {
      text: 'Month wise sales'
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yAxis: {
      title: {
        text: 'Revenue in $'
      }
    },
    series: [
      {
        name: "Arizona",
        type: "line",
        color: '#044342',
        data: [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139, 196]
      },
      {
        name: 'Connecticut',
        type: 'line',
        color: '#7e0505',
        data: [47, 52, 44, 35, 58, 69, 32, 53, 71, 82, 99, 159]
      },
      {
        name: 'Ohio',
        type: 'line',
        color: '#ed9e20',
        data: [17, 22, 14, 25, 18, 19, 22, 43, 11, 32, 29, 59]
      },
    ],
    credits: {
      enabled: false
    }
  });

  constructor() { }

  ngOnInit(): void {
  }
}
