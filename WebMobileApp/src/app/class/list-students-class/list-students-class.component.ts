import { ClasseProgramService } from '../../shared/classe-program.service';
import { Component, OnInit } from '@angular/core';

import {} from 'jquery';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

declare let $ : any;
@Component({
  selector: 'app-list-students-class',
  templateUrl: './list-students-class.component.html',
  styleUrls: ['./list-students-class.component.css']
})
export class ListStudentsClassComponent  implements OnInit {


  myStudents: any;

  constructor(private classeProgramService: ClasseProgramService,private userService: UserService,private route: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
    });

    this.fetchAllStudents();

    console.log(this.myStudents);

  }

  



  fetchAllStudents(){
                          
    this.classeProgramService.getAllStudents(this.classeProgramService.classe).subscribe(
      res => {
        this.myStudents = res;
      
        console.log(this.myStudents);

      },
      err => { 
        console.log(err);
        
      }
    );
  }

  showSubmission(item){
    this.userService.student=item;
    this.route.navigate(['/SubmissionOfStudentComponent']);
  }

  deleteStudent(item){

     class ClassAndStudent {

     public student: number;
      public class : number;
    };
    var objet = new ClassAndStudent();
    objet.student=item._id;
    objet.class=this.classeProgramService.classe._id;

    console.log(objet);
    this.classeProgramService.unsubscribeInClass(objet).subscribe(
      res => {
       alert("etudiant supprimé")
       window.location.reload();
     

      },
      err => { 
        console.log(err);
        
      }
    );
  }
}
