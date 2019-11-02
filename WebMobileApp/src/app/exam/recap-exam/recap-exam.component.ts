import { Component, OnInit } from '@angular/core';
import { Exam } from '../../models/Exam.model';
import { ExamService } from '../../shared/exam.service';
import { Router} from '@angular/router';
import {} from 'jquery';

declare let $ : any;

@Component({
  selector: 'app-recap-exam',
  templateUrl: './recap-exam.component.html',
  styleUrls: ['./recap-exam.component.css']
})
export class RecapExamComponent implements OnInit {
  exam: Exam;

  constructor(private _data: ExamService, private route: Router) {
    this.exam = new Exam();
    this.exam = this._data.data;
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
   * Save the exam data and redirect to the home page.
   */
  validate() {
    

    this._data.postExamen(this.exam).subscribe(   res => {
      
      alert('La création est enregistrée !');
      this.route.navigate(['/home']);

     },
     err => {
       console.log( err.error);
       if (err.status === 422) {
       //  this.serverErrorMessages = err.error.join('<br/>'); 
       }
       else{}
       //  this.serverErrorMessages = 'Something went wrong.Please contact admin.';
     });

  }
 /**
   * Navigate to the edit page.
   */
  modify() {
    this.route.navigate(['/exam-edit']);
  }

   /**
   * Discard the created exam data and navigate to the home page.
   */
  discard() {
    if (confirm('Etes-vous sûr de vouloir annuler ? Toutes créations seront perdues!')) {
      this.exam = null;
  
      this.route.navigate(['/home']);
    } else {
      return null;
    }
  }
}
