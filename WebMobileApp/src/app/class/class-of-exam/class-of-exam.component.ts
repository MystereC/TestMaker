import { Component, OnInit } from '@angular/core';
import { Exam } from '../../models/Exam.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ExamService } from '../../shared/exam.service';
import { ClasseProgramService } from '../../shared/classe-program.service';

@Component({
  selector: 'app-class-of-exam',
  templateUrl: './class-of-exam.component.html',
  styleUrls: ['./class-of-exam.component.scss']
})
export class ClassOfExamComponent implements OnInit {
  myForm: FormGroup;
  ourExam: Exam;
  ClassesList: any;
  check = false;

  constructor(private classeProgramService:ClasseProgramService , private fb: FormBuilder, private _data: ExamService, private router: Router) {
    this.ourExam = new Exam();
    this.ourExam = this._data.data;
   }

  /**
   * Initialize the component.
   */
  ngOnInit() {
  this.ClassesList=new Array<any>();

    this.fetchAllClasses();
    this.initForm();
  }

  /**
   * Initialize the component's form.
   */
  initForm() {
    const formControls = this.ClassesList.map(control => new FormControl(false));

    this.myForm = this.fb.group({
      ClassesList: new FormArray(formControls, this.maxSelectedCheckboxes(1))
    });
  }

   /** 
   * Test whether the checked boxes are greater than the maximum.
   * @param {number} max - The maximum check box.
   * @return {ValidatorFn} The value of the test.
   */
  maxSelectedCheckboxes(max = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      return totalSelected > max ? { required: true } :null;

    };

    return validator;
  }

  /**
   * Back up the data and navigate to the destination page (recapitulation).
   */
  onSubmit() {
    this.myForm.value.ClassesList
      .map((checked, index) => checked ? this.ourExam.class=this.ClassesList[index] : null);

    this._data.data = this.ourExam;

    this.router.navigate(['/exam-recap']);
  }

 /** 
   * Retrieves class data from the database.
   */
  fetchAllClasses(){
    this.classeProgramService.getMyClasses().subscribe(
      res => {
        this.ClassesList = res;
        this.initForm();
       
      },
      err => { 
        console.log(err);
        
      }
    );
  }

}
