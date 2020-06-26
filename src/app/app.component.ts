import { Component } from '@angular/core';
import {Chart} from 'node_modules/chart.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myChart';

  Height = 0;
  time: Array<string> = ["0"];
  newHeights: Array<number> = [0];
  Coefficient = 0.5;
  bounces = 1;
  ChangemyChart() {
    new Chart("myChart", {
      type: "line",
      data: {
        labels: this.time,
        datasets: [
          {
            label: "ball",
            data: this.newHeights,
            borderColor: "#8e5ea2",
            fill: false
          }
        ]
      }
    });
  }
  calculate() {
    this.newHeights = [];
    this.newHeights.push(this.Height);
    let h = this.Height;
    for (let i = 1; i < this.bounces + 1; ++i) {
      this.newHeights.push(0);
      h = Math.pow(this.Coefficient, 2 * i) * h;
      this.newHeights.push(h);
    }
    this.time = [];
    this.time.push("0");
    this.time.push(String(Math.sqrt(this.Height / 9.8) * 2));
    let t = Math.sqrt(this.Height / 9.8) * 2;
    for (let i = 0; i < this.bounces; ++i) {
      let t2 = Math.sqrt(this.newHeights[2 * (i + 1)] / 9.8) * 2;
      this.time.push(String(t + t2));
      if (i === this.bounces - 1) break;
      this.time.push(String(t + t2 + t2));
      t = t + t2 + t2;
    }
    this.ChangemyChart();
  }
  onChangeHeight(event: Event) {
    this.newHeights = [];
    this.Height = Number((event.target as HTMLInputElement).value);
    this.calculate();
  }
  onChangeE(event: Event) {
    this.Coefficient = Number((event.target as HTMLInputElement).value);
    this.calculate();
  }
  onChangeBounces(event: Event) {
    this.bounces = Number((event.target as HTMLInputElement).value);
    this.calculate();
  }
}
