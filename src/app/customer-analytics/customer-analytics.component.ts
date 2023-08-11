import { Component, OnInit } from '@angular/core';
import { ChartService } from '../services/chart.service';
import { ChartOptions } from '../services/chart-options';

@Component({
  selector: 'app-customer-analytics',
  templateUrl: './customer-analytics.component.html',
  styleUrls: ['./customer-analytics.component.scss']
})

export class CustomerAnalyticsComponent implements OnInit {
  pieChartOptions: ChartOptions;
  barChartOptions: ChartOptions;

  pieChartSeries: number[] = []; // Initialize with empty array
  barChartSeries: number[] = []; // Initialize with empty array


  constructor(private chartService: ChartService) {
    this.pieChartOptions = this.chartService.getPieChartOptions();
    this.barChartOptions = this.chartService.getBarChartOptions();
  }

  ngOnInit(): void {
    // Populate data for the charts
    this.pieChartSeries = [30, 15, 25, 10, 20]; // Replace with your actual pie chart data
    this.barChartSeries = [40, 60, 30, 50, 45]; // Replace with your actual bar chart data
  }
}






