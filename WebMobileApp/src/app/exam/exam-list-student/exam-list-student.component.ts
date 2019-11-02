import { Exam } from '../../models/Exam.model';
import { ExamService } from '../../shared/exam.service';
import { Component, OnInit } from '@angular/core';
import {} from 'jquery';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { Submission } from '../../models/Submission.model';
import { SubmissionService } from '../../shared/submission.service';

declare let $ : any;

@Component({
  selector: 'app-exam-list-student',
  templateUrl: './exam-list-student.component.html',
  styleUrls: ['./exam-list-student.component.css']
})
export class ExamListStudentComponent implements OnInit {


  myListExamAFaire : Array <Exam>;
  myListExamEffectue : Array <Exam>;
  myclasses :any;
  mySubmission;
  constructor(private examService : ExamService,private userService: UserService,private route: Router,private submissionSerivce: SubmissionService) { 

  

   
    this.myListExamAFaire = new Array<Exam>();

    this.myListExamEffectue = new Array<Exam>();


  }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
    });

    this.fetchAllClasses();
    this.fetchAllsubmission();
    //console.log(this.myExam1);
  }





  fetchAllClasses(){
    this.userService.getClassesRegisterd().subscribe(
      res => {
        this.myclasses = res;
        console.log(this.myclasses)
        for(var i=0;i<this.myclasses.length;i++){

          for(var j=0;j<this.myclasses[i].arrayOfExams.length;j++){
            this.myListExamAFaire.push( this.myclasses[i].arrayOfExams[j] ); 
          }
          
        }
      
       
      },
      err => { 
        console.log(err);
        
      }
    );
  

  }

  start(exam:any){
    this.examService.data=exam;
    this.route.navigate(['/start-exam']);
  }


  fetchAllsubmission(){
    this.userService.getSubmissions().subscribe(
      res => {
        this.mySubmission = res;
        console.log(this.mySubmission)
        for(var i=0;i<this.mySubmission.length;i++){

            this.myListExamEffectue.push( this.mySubmission[i].Exam ); 
          

          
        }
        console.log(this.myListExamEffectue)
      
       
      },
      err => { 
        console.log(err);
        
      }
    );
  

  }

  showDetail(item:Submission){
    this.submissionSerivce.data= new Submission();
    this.submissionSerivce.data._id=item._id
    this.route.navigate(['/test-result']);
  }
}
