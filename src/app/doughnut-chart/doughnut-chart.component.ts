import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  public chartType: string = 'doughnut';
  public chartLabels: string[] = [];
  public chartData: number[] = [];
  public chartOptions: any;
  public chartLegend: boolean = true; // Set to false if you don't need the legend

  ngOnInit(): void {
    // Fetch data from a service or constant file
    this.chartLabels = ['Available Leaves', 'Taken Leaves'];
    this.chartData = [50, 10];

    // Chart options
    this.chartOptions = {
      pieceLabel: {
        render: 'label',
        position: 'outside'
      }
    };
  }
}
