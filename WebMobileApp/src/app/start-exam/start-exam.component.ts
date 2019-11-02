import { Component, OnInit } from '@angular/core';
import { Exam } from '../models/Exam.model';
import { ExamService } from '../shared/exam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements OnInit {
  exam: Exam;

  staticXam: Exam;
  dateNow = new Date();

  constructor(private _data : ExamService,private route: Router) {
    this.exam = new Exam();
    this.staticXam = this.exam;
    this.staticXam.title = this._data.data.title
    this.staticXam.comment = this._data.data.comment
    this.staticXam.dateCreation = '16 Février 2019';
    this.staticXam.class = {
      _id:0,
      title: 'm1 reseau',
      university: 'Upec',
      arrayOfStudents: []
    };
    this.staticXam.listQuiz = [];
  }

  /**
   * Initialize the component.
   */
  ngOnInit() {
  }

  /**
   * Retrieves the exam data from the service.
   */
  getData(){
    this.exam = this._data.data;
  }

  /**
   * Navigate to the quiz answer page.
   */
  start(){
    this.route.navigate(['/quiz-answer']);
  }

}
