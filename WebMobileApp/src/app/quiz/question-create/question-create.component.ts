import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Question } from '../../models/Question.model';
import { Quiz } from '../../models/Quiz.model';
import { QuizesService } from '../../shared/quizes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Proposition } from '../../models/Proposition.model';
import {} from 'jquery';

declare let $ : any;

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']

})

export class QuestionCreateComponent implements OnInit {
  myForm: FormGroup;
  ourQuiz: Quiz;
  dateNow: string = new Date().toDateString();

  tab =  this.Create2DArray(50);

  constructor(private formBuilder: FormBuilder, private data: QuizesService, private route: ActivatedRoute, private router: Router) {
    this.ourQuiz = new Quiz();
    this.getQuizData();

  }

  /**
   * Initialize the component.
   */
  ngOnInit(): void {

      $(document).ready(function () {
        $('.sidenav').sidenav();
        $('.modal').modal();
        $('select').formSelect();
        $('.collapsible').collapsible();
      });

    this.myForm = this.formBuilder.group({
      questions: this.formBuilder.array([this.createQuestion()])
    });
  }

  /**
   * Create a block of question Object.
   * @return {FormGroup} the block.
   */
  createQuestion(): FormGroup {
    return this.formBuilder.group({
      formuler: ['', [Validators.required, Validators.minLength(10)]],
      propositions: this.formBuilder.array([this.createProposition()])
    });
  }

  /**
   * Add a block of question Object.
   */
  addNewQuestion() {
    let control = <FormArray>this.myForm.controls.questions;
    control.push(
      this.formBuilder.group({
        formuler: ['', [Validators.required, Validators.minLength(10)]],
        propositions: this.formBuilder.array([this.createProposition()])
      })
    ); 
  }

  /**
   * Delete a block of question Object.
   * @param {any} index - block index to delete.
   */
  deleteQuestion(index) {
    let control = <FormArray>this.myForm.controls.questions;
    control.removeAt(index);
  }

  /**
   * Create a block of proposition Object.
   * @return {FormGroup} the block.
   */
  createProposition(): FormGroup {
    return this.formBuilder.group({
      choice: ['', Validators.required],
      isTrue: false,
      point: ['']
    });
  }

  /**
   * Add a block of proposition Object.
   * @param {any} control - the question Object.
   */
  addNewProposition(control) {
    control.push(
      this.formBuilder.group({
        choice: ['', Validators.required],
        isTrue: false,
        point: ['']
      })
    );
  }

  /**
   * Delete a block of proposition Object.
   * @param {any} control - block of proposition Object.
   * @param {any} index - block index to delete.
   */
  deleteProposition(control, index) {
    control.removeAt(index);
  }

  /**
   * Get the quiz data from the service.
   */
  getQuizData() {
    this.ourQuiz.dateCreation = this.dateNow;
    this.route.queryParams.subscribe(params => {
      this.ourQuiz.title = params.title;
      this.ourQuiz.description = params.comment; 
    });
  }

  /**
   * Save the quiz data into the service and navigate to the recapitulation page.
   */
  save() {
    const x = this.myForm.value;
    for (var i = 0; i < x.questions.length; i++) {
      const d = new Question();
      d.formuler = x.questions[i].formuler;
      d._id = null;
      for (var j = 0; j < x.questions[i].propositions.length; j++) {
        const e = new Proposition();
        e.choice = x.questions[i].propositions[j].choice;

        if (this.tab[i][j])
          e.isTrue = true;
        else
          e.isTrue = false;

        if (x.questions[i].propositions[j].point == '') {
          e.point = 0;
        } else {
          e.point = x.questions[i].propositions[j].point;
        }
        d.listProposition.push(e);
      }
      this.ourQuiz.listQuestion.push(d);
      this.ourQuiz._id = null;
    }
    //console.log(this.ourQuiz);
    this.data.storage = this.ourQuiz;
    this.router.navigate(['/recapitulation']);
  }

  /**
   * Check if the item is checked.
   * @param {any} event - Observed object.
   * @param {any} i - index of question Object. 
   * @param {any} j - index of proposition Object.
   */
  checkValue(event, i, j) {
   if(event.target.checked){
     this.tab[i][j] = true;
   }else {
     this.tab[i][j] = false;
   }
  }

  /**
   * Create a two-dimensional array.
   * @param {number} rows - arrays's length.
   * @return {any} return th array.
   */
  Create2DArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr[i] = [];
    }
    return arr;
  }

}
