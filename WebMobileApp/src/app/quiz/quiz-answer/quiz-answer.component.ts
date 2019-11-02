
import { ResultService } from '../../shared/result.services';
import { Answer } from '../../models/Answer.model';
import { Submission } from '../../models/Submission.model';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExamService } from '../../shared/exam.service';
import { Exam } from '../../models/Exam.model';
import { Choice } from '../../models/Choice.model';
import { SubmissionService } from '../../shared/submission.service';
import {} from 'jquery';
import { QuizesService } from '../../shared/quizes.service';

declare let $ : any;



@Component({
  selector: 'app-quiz-answer',
  templateUrl: './quiz-answer.component.html',
  styleUrls: ['./quiz-answer.component.css']
})
export class QuizAnswerComponent implements OnInit {

  resultQn: any[];

  myQuizSubscription: Subscription;
  lengthQn: number;
  submission: Submission;
  resultTest = new Array<Submission>();
  resultTestSubscription: Subscription;
  myExam: any;
  listAnswers

/**
 * Represents a quiz answer.
 * @constructor
 * @param {QuizesService} quizService - service of Quiz.
 * @param {Router} router - The router.
 *  @param {ResultService} resultservice - The service service of the test result.
 * @param {ExamService} examenService - The service of the Exam.
 * @param {SubmissionService} submissionSerivce - The service of answer submission.
 */
  constructor(private quizService: QuizesService, private router: Router, private resultservice: ResultService, private examenService: ExamService, private submissionSerivce: SubmissionService) {
  
    this.submission = new Submission();
    this.listAnswers = new Array<Answer>();

  }

  ngOnInit() {

    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
      $('.collapsible').collapsible();
    });

    this.myExam = new Exam();

    this.myExam._id = this.examenService.data._id;
    this.examenService.getExams(this.myExam).subscribe(res => {
      this.myExam = res;
      this.examenService.data =this.myExam;


     // this.myQuiz = this.myExam.listQuiz[0];
     this.quizService.listOfQuestion =new Array<any>();
      for (let i=0;i<this.myExam.listQuiz.length;i++){
        for(let j=0;j<this.myExam.listQuiz[i].listQuestion.length;j++){
          this.quizService.listOfQuestion.push(this.myExam.listQuiz[i].listQuestion[j]);
          
        }
        console.log(this.quizService.listOfQuestion);
      }
      //this.quizService.listOfQuestion=this.myQuiz.listQuestion;
     
      this.submission.Exam = this.myExam._id;
      this.submission.answersList = this.listAnswers;
      this.quizService.emitQuizSubject();
      this.quizService.seconds = 0;
      this.quizService.QuestionNumberProgress = 0;
     
      this.lengthQn = this.quizService.listOfQuestion.length - 1;
      console.log("nous avons " + (this.lengthQn + 1) + " questions  ");
      this.startTimer();
    },
      err => {
        console.log(err);

      }
    );

  }
/** increment the time bar. */
  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }
/** retrieves the values ​​of the user's choice, and sends them to the database
 *  @param {NgForm} form - array of form value.
 * @param {string} qnName - the name of the question.
 */
  onSubmit(form: NgForm, qnName: string) {
    var numberOfChoices = this.getNumberOfChoice(this.quizService.QuestionNumberProgress);
    // on va recupperer les questions 

    let answer = new Answer();
    answer.idQuestion = this.quizService.listOfQuestion[this.quizService.QuestionNumberProgress]._id;
    answer.listProposition = new Array<Choice>();

    for (var i = 0; i < numberOfChoices; i++) {
      answer.listProposition.push(this.addHischoice(form, i));
    }
    this.listAnswers.push(answer)




    // on test si c'est la derniere question 

    if (this.quizService.QuestionNumberProgress < this.lengthQn) {
      this.quizService.QuestionNumberProgress++;
    }
    else {
      console.log(this.listAnswers[0].listProposition);
      this.submissionSerivce.postSubmission(this.submission).subscribe(res => {
        console.log(res);
        alert("vous avez fini ");
       
        this.submissionSerivce.data=res;
        this.router.navigate(['/test-result']);
      },
        err => {

        }

      )


      // this.router.navigate(['/test-result']);
    }
  }



/** get the lenght of queston's option
 * @param {number} index - The index of the array of questions.
 */
  getNumberOfChoice(index: number) {
    return this.quizService.listOfQuestion[index].listProposition.length;
  }
/** get the option of student, set to true if this the answer of user
 * @param {NgForm} form -  array of form value.
 * @param {number} index - The index of the array of questions.
  */
  addHischoice(form: NgForm, index: number) {


    let choice = new Choice(index);

    if (form.value[index] == true) {
      choice.hisChoice = true;
    } else {
      choice.hisChoice = false;
    }
    return choice;
  }



}
