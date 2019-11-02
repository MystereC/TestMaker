import { Component, OnInit } from '@angular/core';
import { QuizesService } from 'src/app/shared/quizes.service';
import { Router } from '@angular/router';
import {} from 'jquery';
import { Quiz } from 'src/app/models/Quiz.model';

declare let $ : any;

@Component({
  selector: 'app-show-list-quiz',
  templateUrl: './show-list-quiz.component.html',
  styleUrls: ['./show-list-quiz.component.scss']
})
export class ShowListQuizComponent implements OnInit {

  myQuizes:any;
  constructor(private router: Router,private quizesService : QuizesService) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
    });

    this.fetchAllQuiz();
    
  }

  fetchAllQuiz(){
    this.quizesService.getQuiz().subscribe(

      res => {
        //this.lQuiz= new Array<Quiz>()
        this.myQuizes = res;
      
        
      },
      err => { 
        console.log(err);
        
      }

    );
  }



  showExam(item:Quiz){
    this.quizesService.storage = item;
    this.router.navigateByUrl('/QuizDetails')
  }
  
}
