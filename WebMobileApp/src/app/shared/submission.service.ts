import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Class } from '../models/Class.model';
import { Question } from '../models/Question.model';
import { Submission } from '../models/Submission.model';
import { Answer } from '../models/Answer.model';
import { Observable, Subject } from 'rxjs';
import { Exam } from '../models/Exam.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {


  public data: any;
  private submission: Submission;


    constructor(private http: HttpClient) { }
     /**
    * a function to send post request to create submission
    * @param {Submission} submission - a submission.
    * @returns {Observable<Object>} -  response of server
     */
     postSubmission (submission: Submission){
      return  this.http.post(environment.apiBaseUrl+'/newSubmission',submission);
    }
  

 
   /**
    * a function to send post request to get submission by id
    * @param {Submission} submission - a submission.
    * @returns {Observable<Object>} -  response of server
     */
    getSubmissionById(submission: Submission){
      return  this.http.post(environment.apiBaseUrl+'/getSubmissionById',submission);
    }
   /**
    * a function to send post request to get submissions by exam
    * @param {Exam} exam - an exam.
    * @returns {Observable<Object>} -  response of server
     */
    getSubmissionByExam(exam: Exam){
      return  this.http.post(environment.apiBaseUrl+'/getSubmissionByExam',exam);
    }

    SubmissionSubject = new Subject<Submission>();
    
    getData(): Observable<any> {
      return this.SubmissionSubject .asObservable();
  }
  emitExam(){
    this.SubmissionSubject.next(this.submission);
}

  
   
   
}