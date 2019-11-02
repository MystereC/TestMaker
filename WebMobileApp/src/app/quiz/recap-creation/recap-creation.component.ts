import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../../models/Quiz.model';
import { QuizesService } from '../../shared/quizes.service';
import {} from 'jquery';

declare let $ : any;

@Component({
  selector: 'app-recap-creation',
  templateUrl: './recap-creation.component.html',
  styleUrls: ['./recap-creation.component.css']
})
export class RecapCreationComponent implements OnInit {
quiz: Quiz;

listOfIdQuesstion : Array<String>;

  constructor(private router: Router,private quizesService : QuizesService) {
    this.quiz = new Quiz();
    this.listOfIdQuesstion =new Array<String>();
    this.quiz = this.quizesService.storage; 
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
   * Save the quiz and navigate to home page.
   */
  validate(){
  
    if(this.quiz._id != null){
      this.quizesService.putQuiz(this.quiz).subscribe(   res => {
      
        alert('questionnaire modifié avec succès');
        this.router.navigate(['/home']);
       },
       err => {
         console.log( err.error);
         if (err.status === 422) {
         //  this.serverErrorMessages = err.error.join('<br/>'); 
         }
         else{}
         //  this.serverErrorMessages = 'Something went wrong.Please contact admin.';
       });

    }else{
    this.quizesService.postQuiz(this.quiz).subscribe(   res => {
      
      this.router.navigate(['/home']);

     },
     err => {
       console.log( err.error);
       if (err.status === 422) {
       //  this.serverErrorMessages = err.error.join('<br/>'); 
       }
       else{}
       //  this.serverErrorMessages = 'Something went wrong.Please contact admin.';
     });
    }
 
  }

  /**
   * Discard the created exam data and navigate to the home page.
   */
  discard(){
    if(confirm('Etes-vous sûr de vouloir annuler ? Toutes créations seront perdues!')){
      this.quiz = null;
      this.router.navigate(['/home']);
    } else {
      return null;
    }
  }

  /**
   * Navigate to the edit page.
   */
  goToModify(){
    this.router.navigate(['/editQuestion']); 
  }

}
