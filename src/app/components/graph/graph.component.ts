import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnInit, SimpleChanges, inject, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [ChartModule, CommonModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit {
  // #cdr = inject(ChangeDetectorRef)
  @Input() month: any[] = []
  @Input() values: any[] = []
  ngOnInit(): void {
    this.showGraph();
  }
  data: any;
  options: any;
  isOk: boolean = false;
  isOk2: boolean = false;

  showGraph() {
    debugger
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    console.log(this.month + "month in graph to see the first value");
    alert(this.month + "month in graph to see the first value");
    console.log(this.values);
    this.data = {
      labels: this.month,
      datasets: [
        {
          label: ' הסתר',
          data: this.values,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        // {
        //   label: 'Second Dataset',
        //   data: [28, 48, 40, 19, 86, 27, 90],
        //   fill: false,
        //   borderColor: documentStyle.getPropertyValue('--pink-500'),
        //   tension: 0.4
        // }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
    this.isOk = true
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges:', changes);
  }
}