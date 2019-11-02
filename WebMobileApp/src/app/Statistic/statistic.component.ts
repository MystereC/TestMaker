import { StatiticService } from '../shared/statistic.service';
import { Component, OnInit,Input } from '@angular/core';
import { } from 'jquery';

declare let $ : any;

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  
  students : any ;
  isDisplay : boolean = false; 
 

   
  constructor(private statisticomponent : StatiticService) {
    
   }

  ngOnInit() {
   
      $(document).ready(function () {
        $('.sidenav').sidenav();
        $('.modal').modal();//active le modal 
        $('select').formSelect();
        $('.collapsible').collapsible();
      });
     
    this.students= this.statisticomponent.students;
   this.statisticomponent.displayLineChart('linec');
    this.statisticomponent.displayBarChart('goodCanvas1');
    this.statisticomponent.displayPieChart([45, 98],["succes","fil"],'lolo');
    
    
  }
}