import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Quiz } from '../../models/Quiz.model';

@Component({
  selector: 'app-quiz-program',
  templateUrl: './quiz-program.component.html',
  styleUrls: ['./quiz-program.component.css']
})
export class QuizProgramComponent implements OnInit {
  quizForm: FormGroup;
  quiz: Quiz;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.quiz = new Quiz();
   }

  /** 
   * Initialize the component.
   */
  ngOnInit() {
    this.initQuizForm();
  }

  /** 
   * Initialize the component's form.
   */
  initQuizForm(){
    this.quizForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      comment: new FormControl()
    });
  }

  /** 
   * Sends data and navigates to the destination (question creation).
   */
  navigate(){

    const data = this.quizForm.value;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        title: data['title'],
        comment: data['comment']
      }
    } 
    this.router.navigate(['/createQuestion'], navigationExtras);
  }

}
