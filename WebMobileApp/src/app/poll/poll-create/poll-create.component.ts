import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Poll } from '../../models/Poll.model';
import { QuizesService } from '../../shared/quizes.service';
import { Router } from '@angular/router';
import { Option } from 'src/app/models/Option.model';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.css']
})
export class PollCreateComponent implements OnInit {
  myForm: FormGroup;
  dateNow = new Date();
  poll: Poll;

  constructor(private fb: FormBuilder, private _data: QuizesService, private router: Router) {  
    this.poll = new Poll();
  }

   /**
   * Initialize the component.
   */
  ngOnInit() {
    this.initForm();
  }

   /**
   * Initialize the component's form.
   */
  initForm(){
    this.myForm = this.fb.group({
      formuler : ['', [Validators.required, Validators.minLength(5) ]],
      description : [],
      options : this.fb.array([this.createOption()])
    });
  }

   /**
   * Create a block of option Object.
   * @return {FormGroup} the block.
   */
  createOption(): FormGroup {
    return this.fb.group({
      choice: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

   /**
   * Add a block of option Object.
   */
  addNewOption() {
    let control = <FormArray>this.myForm.controls.options;
    control.push(
      this.fb.group({
        choice: ['', [Validators.required, Validators.minLength(2)]],
      })
    );
  }

   /**
   * Removes a block of option Object.
   * @param {any} index - block index to delete.
   */
  deleteOption(index) {
    let control = <FormArray>this.myForm.controls.options;
    control.removeAt(index);
  }

   /**
   * Back up the data in the service and navigate to the classes list page.
   */
  save(){
    const value = this.myForm.value;
    this.poll.question = value['formuler'];
    this.poll.dateCreation = this.dateNow;
    this.poll.description = value['description'];

   
    for(var i = 0; i< value.options.length; i++){
     const o = new Option();
      o.proposition = value.options[i].choice;
      o.vote = 0;
      this.poll.option.push(o);
    }

    this._data.storage = this.poll;
    this.router.navigate(['/class-of-poll']);
  }


}
