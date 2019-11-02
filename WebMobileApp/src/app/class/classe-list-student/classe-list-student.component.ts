import { Component, OnInit } from '@angular/core';
import { ClasseProgramService } from '../../shared/classe-program.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { QuizesService } from '../../shared/quizes.service';
import {} from 'jquery';

declare let $ : any;

@Component({
  selector: 'app-classe-list-student',
  templateUrl: './classe-list-student.component.html',
  styleUrls: ['./classe-list-student.component.css']
})
export class ClasseListStudentComponent implements OnInit {
  myclasses: any;

  constructor(private classeProgramService: ClasseProgramService, private router: Router,private userService: UserService,private quizesService:QuizesService) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
    });
    this.fetchAllClasses();

    console.log(this.myclasses);
  }


  fetchAllClasses(){
    this.userService.getClassesRegisterd().subscribe(
      res => {
        this.myclasses = res;
      
       
      },
      err => { 
        console.log(err);
        
      }
    );
  
  }

}
