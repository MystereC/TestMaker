import { Option } from 'src/app/models/Option.model';
import { PieChartService } from './../shared/pie-chart.service';
import { Class } from '../models/Class.model';
import { Component } from '@angular/core';
import { ClasseProgramService } from '../shared/classe-program.service';
import { Router } from '@angular/router';
import { QuizesService } from '../shared/quizes.service';
import {} from 'jquery';
import { ExamService } from '../shared/exam.service';
import { Poll } from '../models/Poll.model';
import { PollService } from '../shared/poll.service';
import { UserService } from '../shared/user.service';

declare const M;
declare let $ : any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  myclasses : any;
  myquizes : any;
  myExams : any;
  myPolls:any;


  modalPoll : Poll;
   optionsName = [];
   datas = [];
  
  
  
  constructor( private classeProgramService: ClasseProgramService,private examenService: ExamService,
     private router: Router,userService: UserService,private quizesService:QuizesService, private pollSerivce : PollService, 
     private piech : PieChartService) {
      this.modalPoll = new Poll();
   
  }

  ngOnInit() {

    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();
      $('select').formSelect();
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems, {
        direction: 'left'
      });
    });
      
    
    this.refrech()
    
  }

  /**
   * Select a questionnaire and save it in the service.
   * @param {any} quiz - selected questionnaire.
   */
  onSelect(quiz){
    this.quizesService.storage = quiz;
    this.router.navigateByUrl('/QuizDetails');
  }

  /**
   * Choose an exam and save it in the service.
   * @param {any} exam - choosed exam.
   */
  onChoose(exam){
    this.examenService.data = exam;
    this.router.navigateByUrl('/ExamDetail')
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

  refrech(){
    this.fetchAllClasses();
    this.fetchAllQuiz();
    this.fetchAllExams();
    this.fetchAllPolls();


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

  fetchAllQuiz(){
    this.quizesService.getQuiz().subscribe(

      res => {
        this.myquizes = res;

      
        
      },
      err => { 
        console.log(err);
        
      }

    );
  }

  fetchAllExams(){
    this.examenService.getAllExamen().subscribe(

      res => {
        this.myExams = res;
        //console.log(this.myExams);  
      },
      err => { 
        console.log(err);
        
      }

    );
  }

  fetchAllPolls(){
    this.pollSerivce.getMyPolls().subscribe(

      res => {
        this.myPolls = res;
        console.log(res);
     
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
