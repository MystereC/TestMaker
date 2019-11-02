import { Class } from '../../models/Class.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ClasseProgramService} from '../../shared/classe-program.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-classe-program',
  templateUrl: './classe-program.component.html',
  styleUrls: ['./classe-program.component.css']
})
export class ClasseProgramComponent implements OnInit {

  classeForm: FormGroup;
  classe: Class;

  constructor(private formBuilder: FormBuilder, private classeProgramService: ClasseProgramService, private router: Router,userService: UserService ) {
    this.classe = new Class();
   }
   ngOnInit() {
    this.initClasseForm();
  }

  //initialise le formulaire
  initClasseForm(){
    this.classeForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      comment: new FormControl()
    });
  }

  /*navigate(){
    const data = this.classeForm.value;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        title: data['title'],
        comment: data['comment']
      }
    }
  }*/


  getTitles(): FormArray{
    return this.classeForm.get('titles') as FormArray;
  }

  onAddTitle(){
    const newTitleControl = this.formBuilder.control(null, Validators.required);
    
    this.classeProgramService.createClass(this.classe).subscribe(
      res => {

        console.log(this.classe);
        window.history.go(0);
     //   this.showSucessMessage = true;
       // setTimeout(() => this.showSucessMessage = false, 4000);
      
       // this.resetForm(form);
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

