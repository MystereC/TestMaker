import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../shared/exam.service';
import { Exam } from '../../models/Exam.model';
import {} from 'jquery';
import { Router } from '@angular/router';

declare let $ : any;

@Component({
  selector: 'app-detail-exam',
  templateUrl: './detail-exam.component.html',
  styleUrls: ['./detail-exam.component.css']
})
export class DetailExamComponent implements OnInit {
  exam : Exam;

  constructor( private examService: ExamService, private route: Router) {
    this.exam = new Exam();
    this.exam = this.examService.data;
   }

   /**
    * Initialize the component.
    */
  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();
      $('select').formSelect();
      $('.collapsible').collapsible();
    });
  }

  /**
   * Return to the destination home.
   */
  returnHome(){
    this.route.navigate(['/home']);
  }

}
