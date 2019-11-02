import { Component, OnInit } from '@angular/core';
import { ClasseProgramService } from '../../shared/classe-program.service';
import { FormGroup, FormBuilder, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Poll } from '../../models/Poll.model';
import { QuizesService } from '../../shared/quizes.service';
import { Router } from '@angular/router';
import { PollService } from 'src/app/shared/poll.service';

@Component({
  selector: 'app-class-of-poll',
  templateUrl: './class-of-poll.component.html',
  styleUrls: ['./class-of-poll.component.scss']
})
export class ClassOfPollComponent implements OnInit {
  ClassesList: any;
  myForm : FormGroup;
  poll: Poll;

  constructor(private classeProgramService:ClasseProgramService, private fb: FormBuilder, private _data: QuizesService, private router: Router, private pollSerivce : PollService) {
    this.poll = new Poll();
    this.poll = _data.storage;
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
   * Check if checked boxes are greater than maximum.
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

  /**
   * Save the data in the database and navigate to the destination (home).
   */
  onSubmit() {
    this.myForm.value.ClassesList
      .map((checked, index) => checked ? this.poll.class=this.ClassesList[index] : null);

    this._data.storage = this.poll;


    this.pollSerivce.postPoll(this.poll).subscribe(
      res => {

      
       this.router.navigate(['/home']);
 
      },
      err => {
        console.log( err.error);
        if (err.status === 422) {
        //  this.serverErrorMessages = err.error.join('<br/>'); 
        }
        else{}
        //  this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
 
  }

}
