import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Exam } from '../../models/Exam.model';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {
  myForm: FormGroup;
  exam: Exam;

  constructor(private fb: FormBuilder, private router: Router) {
    this.exam = new Exam();
  }

  /**
   * Initialize the component.
   */
  ngOnInit() {
    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['']
    });
  }

   /**
   * Saves the data into the NavigationExtras and navigates to the target page (list of quiz).
   */
  navigate(){
    const data = this.myForm.value;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        title: data['title'],
        comment: data['comment']
      }
    }
    this.router.navigate(['/quiz-list'], navigationExtras);
  }

}
