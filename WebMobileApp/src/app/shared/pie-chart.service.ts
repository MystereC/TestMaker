import { Chart } from 'chart.js';


export class PieChartService {

    ngOnInit() {
      
        this.displayPieChart;
      }


    displayPieChart(pieDatas,labelName,idChart: any, len :number) {
      
        var color = [];

        for (var i=0; i<len; i++){
            color.push( 'rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','
                            +Math.floor(Math.random()*255)+",1)");
        }


        return new Chart(idChart, {
            type: 'pie',
            data: {
                labels: labelName,
                datasets: [{
                    label: "note",
                    data: pieDatas,
                    backgroundColor: color,
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    text: "Vote",
                    display: true
                },
                responsive: true,
             
            }
        }
        );


    }

}