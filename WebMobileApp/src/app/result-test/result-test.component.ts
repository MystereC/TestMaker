import { Quiz } from './../models/Quiz.model';
import { Component, OnInit } from '@angular/core';
import { Submission } from '../models/Submission.model';
import { Subscription } from 'rxjs';
import { ResultService } from '../shared/result.services';
import { } from 'jquery';
import { SubmissionService } from '../shared/submission.service';
import { Exam } from '../models/Exam.model';
import { ExamService } from '../shared/exam.service';
import { QuizesService } from '../shared/quizes.service';
import { User } from './../models/user.model';
import { UserService } from '../shared/user.service';


declare let $: any
@Component({
  selector: 'app-result-test',
  templateUrl: './result-test.component.html',
  styleUrls: ['./result-test.component.css']
})
export class ResultTestComponent implements OnInit {

  resultQuestions : any;
  questionSubsciption: Subscription;
  resultTestSubscription: Subscription;
  listOfQuestion;

  myQuiz: Quiz;
  myQuizSubscription: Subscription;
  myExam: Exam;
  user : User;


  constructor(private quizesService: QuizesService, private resultservice: ResultService, private submissionSerivce: SubmissionService, private examSerivce: ExamService, private userService: UserService,) {
    this.user = new User();

  }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
      $('.collapsible').collapsible();
    });
    this.resultQuestions = new Submission();
    this.resultQuestions._id=this.submissionSerivce.data._id;
    console.log(this.resultQuestions);
    this.submissionSerivce.getSubmissionById(this.resultQuestions).subscribe(res => {
      this.resultQuestions = res;
      this.myExam = this.resultQuestions.Exam;

      this.userService.getUserProfile().subscribe(
        res => {
          this.user = res['user'];
        },
        err => { 
          console.log(err);
        }
      );


      this.listOfQuestion =new Array<any>();
  
      for (let i=0;i<this.myExam.listQuiz.length;i++){
        for(let j=0;j<this.myExam.listQuiz[i].listQuestion.length;j++){
          this.listOfQuestion.push(this.myExam.listQuiz[i].listQuestion[j]);
          
        }
      }
      console.log(this.myExam)
      
  
  
  
      console.log(this.resultQuestions);

    }
      
      
      ,err=>{

        console.log(err);
      });




    
  }

  //getChoice(indexQuestion : number, indexChoice : number){
  //this.resultQuestions.choices[indexQuestion].
  //}

  testCorrectOrNot(correction:String){
    if(correction.toString()==="correct")
    return "Votre réponse est correcte.";
    else if((correction.toString()==="incorrect"))
    return "Votre réponse est incorrecte.";
    else
    return "Votre réponse est incomplete.";
  }

}
