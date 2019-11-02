import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/Quiz.model';
import { Router} from '@angular/router';
import { Question } from '../../models/Question.model';
import { QuizesService } from '../../shared/quizes.service';
import {} from 'jquery';

declare let $ : any;

@Component({
  selector: 'app-detail-quiz',
  templateUrl: './detail-quiz.component.html',
  styleUrls: ['./detail-quiz.component.css']
})
export class DetailQuizComponent implements OnInit {

  quiz = new Quiz() ;
  submitted = false;
  message: string;
  listQuestion :Array<Question>;
  q:Question ;

  constructor(private quizS: QuizesService,private route: Router) {
        this.quiz = this.quizS.storage;
  }
  
 /** 
   * Initialize the component.
   */
  ngOnInit() {
      $(document).ready(function () {
        $('.sidenav').sidenav();
        $('.modal').modal(); 
        $('select').formSelect();
        $('.collapsible').collapsible();
      });
  }

  /** 
   * Return to the home page.
   */
  returnHome(){
    this.route.navigate(['/home']);
  }

  /** 
   * Navigate to the quiz edit page.
   */
  goToModify(){
    this.route.navigate(['/editQuestion']);
  }

}
