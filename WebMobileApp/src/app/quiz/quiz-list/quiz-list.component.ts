import { Component, OnInit } from '@angular/core';
import { Exam } from '../../models/Exam.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ExamService } from '../../shared/exam.service';
import { QuizesService } from '../../shared/quizes.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  myForm: FormGroup;
  ourExam: Exam;
  dateNow: string = new Date().toDateString();

  lQuiz: any;

  constructor(private route: ActivatedRoute,private quizesService:QuizesService, private fb: FormBuilder, private _data: ExamService, private router: Router) {
    this.ourExam = new Exam();
    this.getExamData();
  }

   /** 
   * Initialize the component.
   */
  ngOnInit() {
    this.lQuiz=new Array<any>();
    this.fetchAllQuiz(); 
    this.initForm();
  }
 
 /** 
   * Retrieves the exam data in the service.
   */
  getExamData() {
    this.ourExam.dateCreation = this.dateNow;
    this.route.queryParams.subscribe(params => {
      this.ourExam.title = params.title;
      this.ourExam.comment = params.comment;
    });
  }

   /** 
   * Initialize the component's form.
   */
  initForm() {
    const formControls = this.lQuiz.map(control => new FormControl(false));

    const selectAllControl = new FormControl(false);

    this.myForm = this.fb.group({
      selectAll: selectAllControl,
      lQuiz: new FormArray(formControls, this.minSelectedCheckboxes(1))
    });
    this.onChanges();
  }

   /** 
   * Check if checked boxes are below minimum.
   * @param {number} min - minimum check box.
   * @return {ValidatorFn} value of the test.
   */
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  /**
   * Change the state of the checkboxes.
   */
  onChanges() {
    this.myForm.get('selectAll').valueChanges.subscribe(bool => {
      this.myForm
        .get('lQuiz')
        .patchValue(Array(this.lQuiz.length).fill(bool), {
          emitEvent: false
        })
    });

    this.myForm.get('lQuiz').valueChanges.subscribe(val => {
      const allSelected = val.every(bool => bool);
      if (this.myForm.get('selectAll').value !== allSelected) {
        this.myForm.get('selectAll').patchValue(allSelected, {
          emitEvent: false
        });
      }
    });
  }

  /**
   * Saves the data and navigates to the class list page.
   */
  onSubmit() {
    this.myForm.value.lQuiz
      .map((checked, index) => checked ? this.ourExam.listQuiz.push(this.lQuiz[index]) : null)
      .filter(value => value !== null);

    //console.log(this.ourExam);
    this._data.data = this.ourExam;
    this.router.navigate(['/ClassOfExam']);
  }

/**
   * Get the quizes data from the database.
   */
  fetchAllQuiz(){
    this.quizesService.getQuiz().subscribe(

      res => {
        //this.lQuiz= new Array<Quiz>()
        this.lQuiz = res;
        this.initForm();
      
        
      },
      err => { 
        console.log(err);
        
      }

    );
  }
}
