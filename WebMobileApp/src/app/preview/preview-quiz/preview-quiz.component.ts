import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/Quiz.model';
import { QuizesService } from '../../shared/quizes.service';
import { } from 'jquery';

declare let $: any;

@Component({
  selector: 'app-preview-quiz',
  templateUrl: './preview-quiz.component.html',
  styleUrls: ['./preview-quiz.component.scss']
})
export class PreviewQuizComponent implements OnInit {
  quiz: Quiz;
  dateNow = new Date();

  constructor(private _data: QuizesService) {
    this.quiz = new Quiz();   
  }

  /**
   * Initialize the component.
   */
  ngOnInit() {
    this.quiz = this._data.storage;
  }

  /**
   * Generates the HTML page as a PDF, can be printed too.
   */
  generatePdf(){ 
    
    var divContents = $("#to_pdf").html();
    var printWindow = window.open('', '', 'height=500,width=800');
            printWindow.document.write('<html><head><title>UPEC</title>');
            printWindow.document.write('</head><body >');
            printWindow.document.write(divContents);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        
  } 
}
