import { Component } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Professor } from '../models/professor.model';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})


export class LoginComponent {
 

  constructor(private userService: UserService,private router: Router) {
    
  }

 


  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;



  ngOnInit() {   
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/home');
  }

  
  onSubmit(form : NgForm){
    this.router.navigateByUrl('/home') ;
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);


     
        this.userService.setRole(res['userRole'].toString())

        if(this.userService.getRole()=="Professeur"){
          this.router.navigateByUrl('/home') ;
        }else {
          this.router.navigateByUrl('/home-student') ;
        }
        

      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
 
}