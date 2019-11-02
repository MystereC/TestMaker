import { ExamService } from '../../shared/exam.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {} from 'jquery';
import { Exam } from '../../models/Exam.model';


declare let $ : any;

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  myExams : any ;

  constructor(private examenService : ExamService,private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
    });

    this.fetchAllExams();
    
  }

  fetchAllExams(){
    this.examenService.getAllExamen().subscribe(

      res => {
        this.myExams = res;
        console.log(this.myExams);  
      },
      err => { 
        console.log(err);
        
      }

    );
  }

  deleteExam(item:Exam){

    this.examenService.deleteExam(item).subscribe(

      res => {
        alert("L'examen a été supprimé avec succés");
        window.location.reload();
      },
      err => { 
        console.log(err);
        
      }

    );
  }

  showExam(item:Exam){
    this.examenService.data = item;
    this.router.navigateByUrl('/ExamDetail')
  }
  

}
