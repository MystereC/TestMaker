import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { UserService } from '../shared/user.service';
import {} from 'jquery';

declare let $ : any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

 
  emailPattern =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  passwordRepeat:string;

  constructor(private userService: UserService) { 

  }

  ngOnInit() {
    
  $(document).ready(function(){
    $('select').formSelect();
  });
     
   // this.resetForm();
  }

  /*resetForm(form?:NgForm)
  {
    if(form !=null)
    form.reset();
   
  }  */

  

 

  private save(): void {
    
  }
  /*
  addUser() {
    if(this.professor.email && this.professor.password){
      console.log(this.professor);
      this.signUpService.addProfessor(this.professor)
          .subscribe(result=>{
            if(!result)
            {
              alert('Wrong email or password');
            }
            else{
              this.router.navigate(['/home']);
            }
          });
    
    } else {
      alert('email and password required');
    }
  }*/

  onSubmit(form: NgForm) {
     
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
       
      
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>'); 
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
    console.log(this.userService.selectedUser);
  }


  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      firstName: '',
      lastName:'',
      email: '',
      password: '',
      role:'',
      _id:'',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
