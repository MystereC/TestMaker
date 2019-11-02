import { Chart } from 'chart.js';

export class StatiticService {


    lineDatas = [9, 7, 3, 5, 2, 10, 15, 16, 19, 3, 1, 9];
    pieDatas = [45, 98];
    barChart = [3, 19, 3, 5, 2, 3];
    students = [
        {
            name: 'Victor',
            note: 12
        },
        {
            name: 'Julien',
            note: 6.5
        },
        {
            name: 'Ophelie',
            note: 15
        },
        {
            name: 'Julie',
            note: 15
        }
    ];

    displayPieChart(pieDatas,lbel,idChart: any) {

        return new Chart(idChart, {
            type: 'pie',
            data: {
                labels: lbel,
                datasets: [{
                    label: "# note",
                    data: pieDatas,
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

    displayLineChart(idChart: any) {

        return new Chart(idChart, {
            type: 'line',
            data: {
                labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: 'NUmber Of Items Sold In Mounts',
                    data: this.lineDatas,
                    fill: false,
                    lineTension: 0.2,
                    borderColor: "red",
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    text: "Line Chart",
                    display: true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }

            }

        });

    }



    displayBarChart(idChart: any) {
        return new Chart(idChart, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: this.barChart,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgb(50,205,50,0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });


    }



}