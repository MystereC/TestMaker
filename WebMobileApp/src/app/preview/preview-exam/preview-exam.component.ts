import { Component, OnInit } from '@angular/core';
import { Exam } from '../../models/Exam.model';
import { ExamService } from '../../shared/exam.service';
import { } from 'jquery';

declare let $: any;

@Component({
  selector: 'app-preview-exam',
  templateUrl: './preview-exam.component.html',
  styleUrls: ['./preview-exam.component.scss']
})
export class PreviewExamComponent implements OnInit {
  exam: Exam;
  dateNow = new Date();

  constructor(private _data: ExamService) { 
    this.exam = new Exam();
    this.exam = this._data.data;
  }

   /**
   * Initialize the component.
   */
  ngOnInit() {
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
