import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() riskLevel: number = 0; // Input for risk level (0 to 100)
  public chart: any;

  ngOnInit(): void {
    // Initialize the chart only if riskLevel is available
    if (this.riskLevel !== undefined) {
      this.createChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If riskLevel changes and the chart exists, update it
    if (changes['riskLevel'] && this.chart) {
      this.updateChart();
    } else if (changes['riskLevel'] && !this.chart) {
      // If the chart doesn't exist yet, create it
      this.createChart();
    }
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'doughnut', // Use doughnut chart for radial gauge
      data: {
        labels: ['Low Risk', 'High Risk'],
        datasets: [
          {
            label: 'Diabetes Risk',
            data: [100 - this.riskLevel, this.riskLevel], // Calculate low and high risk
            backgroundColor: ['green', 'red'],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        cutout: '80%', // Make it a radial gauge
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Diabetes Risk Level'
          }
        }
      }
    });
  }

  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = [100 - this.riskLevel, this.riskLevel];
      this.chart.update();
    }
  }
}