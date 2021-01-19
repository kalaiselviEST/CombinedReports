import { Injectable } from '@angular/core';
import { CommonMethods } from './common.methods';

@Injectable({
  providedIn: 'root'
})

export class ChartJs {

  constructor(
    private commonMethods: CommonMethods
  ) { }

  lblMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  lblMonthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  lblAlldays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  lblAlldaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  lblWeekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  lblWeekdaysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  colorsLight = ['#017DC5', '#04104A', '#54ACBA', '#EA4436', '#FCB124', '#F03337', '#9158ff'];

  /**
   * Options for common charting
   */
  options = {
    /**
     * Options for minimal line chart with no legends, axis labels and gridlines
     */
    minimal: {
      elements: {
        point: {
          radius: 0
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: 'rgba(0, 0, 0, 0)'
          }
        }],
        yAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: 'rgba(0, 0, 0, 0)'
          }
        }]
      },
      title: {
        display: false,
        text: ''
      },
      legend: {
        display: false,
        position: 'bottom'
      },
      tooltips: {
        mode: 'index',
        intersect: true
      },
      responsive: true,
      maintainAspectRatio: false
    }
  };


  randomScalingFactor(min: number = 0, max: number = 75): number {
    return Math.round(this.commonMethods.randomBetweenRange(min, max));
  }

  randomNegativeScalingFactor(min: number = -50, max: number = 75): number {
    return Math.round(this.commonMethods.randomBetweenRange(min, max));
  }

}
