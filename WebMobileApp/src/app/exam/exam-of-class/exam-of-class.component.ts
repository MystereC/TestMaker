
import { ExamService } from '../../shared/exam.service';
import { Component, OnInit } from '@angular/core';
import {} from 'jquery';
import { Class } from '../../models/Class.model';
import { ClasseProgramService } from '../../shared/classe-program.service';
import { Exam } from '../../models/Exam.model';
import { Router } from '@angular/router';

declare let $ : any;
@Component({
  selector: 'app-exam-of-class',
  templateUrl: './exam-of-class.component.html',
  styleUrls: ['./exam-of-class.component.css']
})
export class ExamOfClassComponent implements OnInit {


  myExams : any ;
  class : any;

  constructor(private examenService : ExamService,private classeProgramService: ClasseProgramService,private route: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
    });

    this.fetchAllExams();
    
  }

  fetchAllExams(){

    this.class = new Class();
   // this.class._id=this.classeProgramService.classe._id;
  
    this.examenService.getExamsOfClass(this.classeProgramService.classe).subscribe(

      res => {
        this.myExams = res;
        console.log("here");
        console.log(this.myExams);  
      },  
      err => { 
        console.log(err);
        console.log("here");
        
      }

    );
  }


  showSubmission(item:Exam){
    this.examenService.exam=item;
    this.route.navigate(['/SubmissionOfStudentComponent']);
  }
}
