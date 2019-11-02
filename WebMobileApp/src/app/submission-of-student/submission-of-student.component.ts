import { Exam } from './../models/Exam.model';
import { ExamService } from '../shared/exam.service';
import { Component, OnInit } from '@angular/core';
import { } from 'jquery';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { Submission } from '../models/Submission.model';
import { SubmissionService } from '../shared/submission.service';
import { ClasseProgramService } from '../shared/classe-program.service';
import { User } from '../models/user.model';

declare let $: any;
@Component({
  selector: 'app-submission-of-student',
  templateUrl: './submission-of-student.component.html',
  styleUrls: ['./submission-of-student.component.css']
})
export class SubmissionOfStudentComponent implements OnInit {


  myListExamAFaire: Array<Exam>;
  myListExamEffectue: Array<Exam>;
  myclasses: any;
  mySubmission;

  constructor(private examService: ExamService, private userService: UserService,private classeProgramService:ClasseProgramService, private route: Router, private submissionSerivce: SubmissionService) {




    this.myListExamAFaire = new Array<Exam>();

    this.myListExamEffectue = new Array<Exam>();


  }




  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
    });

    this.fetchAllsubmission();
    //console.log(this.myExam1);
  }

  

  fetchAllsubmission() {

    
    this.submissionSerivce.getSubmissionByExam(this.examService.exam).subscribe(
      res => {
        this.mySubmission = res;
        console.log(this.mySubmission)
        for (var i = 0; i < this.mySubmission.length; i++) {

          this.myListExamEffectue.push(this.mySubmission[i].Exam);



        }
        console.log(this.myListExamEffectue)


      },
      err => {
        console.log(err);

      }
    );


  }

  showDetail(item: Submission) {
    this.submissionSerivce.data = new Submission();
    this.submissionSerivce.data._id = item._id
    this.route.navigate(['/test-result']);
  }

}
