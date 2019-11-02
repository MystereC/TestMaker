import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/Quiz.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Question } from '../../models/Question.model';
import { Proposition } from '../../models/Proposition.model';
import { Router } from '@angular/router';
import { QuizesService } from '../../shared/quizes.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})
export class QuestionEditComponent implements OnInit {
  editQuiz: Quiz;
  dateNow: string = new Date().toDateString();
  myForm: FormGroup;

  newQuiz: Quiz;

  tab=this.Create2DArray(50);

  constructor(private formBuilder: FormBuilder, private router: Router, private quizesService : QuizesService) { 
    this.editQuiz = new Quiz();
    this.newQuiz = new Quiz();
    this.getData();
  }

  /**
   * Initialize the component.
   */
  ngOnInit() {   
    this.myForm = this.formBuilder.group({
      title: [this.editQuiz.title, [Validators.required, Validators.minLength(2)] ],
      description: this.editQuiz.description, 
      questions: this.formBuilder.array([ ])
    }); 
    this.setQuestions();
  }

    /**
   * Retrieves the quiz data saved in the service.
   */
  getData(){
    this.editQuiz = this.quizesService.storage;
    for(var i= 0; i< this.editQuiz.listQuestion.length; i++){
      for(var j=0; j< this.editQuiz.listQuestion[i].listProposition.length; j++){
        this.tab[i][j]= this.editQuiz.listQuestion[i].listProposition[j].isTrue;
      }
    }
  }

  /**
   * Retrieves the question data from the quiz retrieved from the service and puts them in the form.
   */
  setQuestions(){
    let control = <FormArray>this.myForm.controls.questions;
    this.editQuiz.listQuestion.forEach(element => {
      control.push(
        this.formBuilder.group({
          formuler: [element.formuler, [Validators.required, Validators.minLength(10)]],
          _id: element._id,
          propositions: this.setPropositions(element)
        })
      )
    })
  }

  /**
   * Retrieves the proposition data from the question retrieved from the service and puts them in the form.
   * @param {any} control - question Object.
   * @return {FormArray} block of proposition Object retrieved.
   */
  setPropositions(control){
    let arr = new FormArray([]);
    control.listProposition.forEach(element => 
        {
   
        arr.push(
          this.formBuilder.group({
            choice: [element.choice, Validators.required],
            isTrue: element.isTrue,
            point: element.point
          })
        )
     
    }
    );
    return arr;
  }

   /**
   * Create a block of question Object.
   * @return {FormGroup} the block.
   */
  createQuestion(): FormGroup{ 
    return this.formBuilder.group({
      formuler: ['', [Validators.required, Validators.minLength(10)]],
      _id: null,
      propositions: this.formBuilder.array([ this.createProposition() ])
    });
  }

  /**
   * Add a block of question Object.
   */
  addNewQuestion(){
    let control = <FormArray>this.myForm.controls.questions;
    control.push(
      this.formBuilder.group({
        formuler: ['', [Validators.required, Validators.minLength(10)]],
        _id: null,
        propositions: this.formBuilder.array([ this.createProposition() ])
      })
    );
  }

  /**
   * Delete a block of question Object.
   * @param {any} index - block index to delete.
   */
  deleteQuestion(index){
    let control = <FormArray>this.myForm.controls.questions;
    control.removeAt(index);
  } 

  /**
   * Create a block of proposition Object.
   * @return {FormGroup} the block.
   */
  createProposition() : FormGroup{
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
  addNewProposition(control){
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
  deleteProposition(control, index){
    control.removeAt(index);
  }

  /**
   * Save the quiz data into the service and navigate to the recapitulation page.
   */
  save(){
    const x = this.myForm.value;
    this.newQuiz.title = x['title'];
    this.newQuiz.description = x['description'];
    this.newQuiz.dateCreation = this.dateNow;

    for(var i=0; i < x.questions.length; i++){
      const d = new Question();
      d.formuler = x.questions[i].formuler;
      d._id = x.questions[i]._id;

      for(var j = 0; j < x.questions[i].propositions.length; j++){
        const e = new Proposition();
        e.choice =  x.questions[i].propositions[j].choice;
        
          if(this.tab[i][j]) 
          e.isTrue=true;
          else
          e.isTrue=false;

        if (x.questions[i].propositions[j].point == '') {
          e.point = 0;
        } else {
          e.point = x.questions[i].propositions[j].point;
        }
        d.listProposition.push(e);
      }
      this.newQuiz.listQuestion.push(d);
      this.newQuiz._id = this.editQuiz._id;
    } 
    //console.log(this.newQuiz);
    this.quizesService.storage = this.newQuiz; 

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
