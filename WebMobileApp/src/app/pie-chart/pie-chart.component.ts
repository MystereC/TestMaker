import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  marks : number[] = [12,13,15,6,8,7,3,5,7];
  pieDatas = [];
  numberOfgoodMarks: number = 0;
  numberOfBadMarks: number = 0;

  constructor() { }

  ngOnInit() {
      
    this.countIfMoy();
    this.pieDatas = [this.numberOfgoodMarks , this.numberOfBadMarks];
      this.displayPieChart('pie');
  }


  countIfMoy(){
    this.marks.forEach(value=>  {if(value>=10){this.numberOfgoodMarks++;}else{this.numberOfBadMarks++;}  })

  }

  displayPieChart(idChart: any) {

    return new Chart(idChart, {
        type: 'pie',
        data: {
            labels: ["succes", "échec"],
            datasets: [{
                label: "# note",
                data: this.pieDatas,
                backgroundColor: [
                    'rgba(255,99,132,1)',
                    'rgba(255,162,235,1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                text: "Notes",
                display: true
            },
            responsive: true,
           
        }
    }
    );


}
}
