import { Option } from 'src/app/models/Option.model';
import { PieChartService } from './../../shared/pie-chart.service';
import { Class } from './../../models/Class.model';
import { Component } from '@angular/core';
import { ClasseProgramService } from './../../shared/classe-program.service';
import { Router } from '@angular/router';
import { UserService } from './../../shared/user.service';
import { QuizesService } from './../../shared/quizes.service';
import {} from 'jquery';
import { ExamService } from './../../shared/exam.service';
import { Poll } from './../../models/Poll.model';
import { PollService } from './../../shared/poll.service';

declare const M;
declare let $ : any;

@Component({
  selector: 'app-sondage-list',
  templateUrl: './sondage-list.component.html',
  styleUrls: ['./sondage-list.component.css']
})
export class SondageListComponent{

  
  myclasses : any;
  myPolls:any;
  modalPoll : Poll;
  optionsName = [];
  datas = [];


  constructor( private classeProgramService: ClasseProgramService,private examenService: ExamService,
    private router: Router,userService: UserService,private quizesService:QuizesService, private pollService : PollService, private piech : PieChartService) {
     this.modalPoll = new Poll();
  
 }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
    });
    
    this.refrech();
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems, {
        direction: 'left'
      });
    });

    this.refrech()

  }

  refrech(){
    this.fetchAllClasses();
    this.fetchAllPolls();
  }

/**
   * select a poll and affect it in the poll Object.
   * @param {any} poll - selected poll.
   */
  onSelectPoll(poll){
    this.modalPoll = poll;
    this.setStaToPoll(poll);
     this.optionsName = [];
     this.datas = [];
     
   
    //console.log(this.modalPoll);
  }

  fetchAllPolls(){
    this.pollService.getMyPolls().subscribe(

      res => {
        this.myPolls = res;
        console.log(res);
     
      },
      err => { 
        console.log(err);
        
      }

    );
    }

    fetchAllClasses(){
      this.classeProgramService.getMyClasses().subscribe(
        res => {
          this.myclasses = res;
        
         
        },
        err => { 
          console.log(err);
          
        }
      );
    }

    setStaToPoll(modal){ 
    
      for (var i = 0; i < this.modalPoll.option.length; i++){
              this.optionsName.push(modal.option[i].proposition) ;
             this.datas.push(modal.option[i].vote);
         } 
         this.piech.displayPieChart(this.datas ,this.optionsName,'pie',modal.option.length);
     
       }
}
