import { Component, OnInit  } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-sales-traffic-chart',
  templateUrl: './sales-traffic-chart.component.html',
  styleUrl: './sales-traffic-chart.component.scss'
})
export class SalesTrafficChartComponent implements OnInit  {
  chart = new Chart({
    chart: {
      type: 'pie',
      height: 325
    },
    title: {
      text: 'Ethnicity'
    },
    xAxis: {
      categories: [
        'African Americans',
        'White Americans',
        'White None American',
        'Latino',
        'Arabs',
        'Asian',
        'European',
        'Hispanic and Latino Americans',
        'Indian',
        'Non-Hispanic whites',
        'African',
        'Other'
      ]
    },
    yAxis: {
      title: {
        text: 'Ethnicity Status'
      }
    },
    series: [
     {
      type: 'pie',
      data: [
        {
          name: 'African Americans',
          y: 9,
          color: '#044342',
        },
        {
          name: 'White Americans',
          y: 9,
          color: '#7e0505',
        },
        {
          name: 'White None American',
          y: 9,
          color: '#ed9e20',
        },
        {
          name: 'Latino',
          y: 9,
          color: '#6920fb',
        },
        {
          name: 'Arabs',
          y: 9,
          color: '#ed9e20',
        },
        {
          name: 'Asian',
          y: 10,
          color: '#044342',
        },
        {
          name: 'European',
          y: 9,
          color: '#6920fb',
        },
        {
          name: 'Arabs',
          y: 9,
          color: '#7e0505',
        },
        {
          name: 'Hispanic and Latino Americans',
          y: 9,
          color: '#ed9e20',
        },
        {
          name: 'Indian',
          y: 9,
          color: '#044342',
        },
        {
          name: 'Non-Hispanic whites',
          y: 9,
          color: '#7e0505',
        },
        {
          name: 'African',
          y: 9,
          color: '#ed9e20',
        },
        {
          name: 'Others',
          y: 9,
          color: '#044342',
        },
      ]
     }
    ],
    credits: {
      enabled: false
    }
  })

  constructor() { }

  ngOnInit(): void {
  }
}