import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-product-sales-chart',
  templateUrl: './product-sales-chart.component.html',
  styleUrls: ['./product-sales-chart.component.scss']
})
export class ProductSalesChartComponent implements OnInit {
  chart = new Chart({
    chart: {
      type: 'column', 
    },
    title: {
      text: 'Professional'
    },
    xAxis: {
      categories: [
        'NP(Nurse Practitioner)',
        'RN(Registered Nurse)',
        'SHHA',
        'LVN(Licensed Vocational Nurse)',
        'OT(Occupational Therapy)',
        'ST(Speech Therapy)',
        'PT (Physical Therapy)',
        'Care Giver',
        'Spiritual Consultant',
        'Medical Social Worker',
        'Pediatric'
      ]
    },
    yAxis: {
      title: {
        text: 'Status'
      }
    },
    series: [
      {
        name: 'Pending',
        type: 'column', 
        color: 'red',
        data: [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139]
      },
      {
        name: 'Completed',
        type: 'column', 
        color: 'green',
        data: [47, 52, 44, 35, 58, 69, 32, 53, 71, 82, 99]
      },
    ],
    credits: {
      enabled: false
    }
  });

  constructor() { }

  ngOnInit(): void { }
}