

import { ApexChart, ApexFill, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ApexLegend, ApexDataLabels } from 'ng-apexcharts';

export interface ChartOptions {
  chart: ApexChart;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
}
