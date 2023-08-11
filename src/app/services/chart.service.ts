import { Injectable } from '@angular/core';
import { ChartOptions } from './chart-options';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
    constructor() {}
  
    getPieChartOptions(): ChartOptions {
        return {
          chart: {
            type: 'pie'
          },
          fill: {
            colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#775DD0']
          },
          title: {
            text: 'Pie Chart',
            align: 'center'
          },
          legend: {
            position: 'bottom'
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {}, // Add xaxis property for compatibility
          yaxis: {} // Add yaxis property for compatibility
        };
      }
    
      getBarChartOptions(): ChartOptions {
        return {
          chart: {
            type: 'bar'
          },
          fill: {
            colors: ['#00E396']
          },
          title: {
            text: 'Bar Chart',
            align: 'center'
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June','Jul','Aug','Sep','Oct','Nov','Dec']
          },
          yaxis: {
            title: {
              text: 'Total Customers'
            }
          },
          legend: {
            position: 'bottom'
          },
          dataLabels: {
            enabled: false
          }
        };
      }
    }