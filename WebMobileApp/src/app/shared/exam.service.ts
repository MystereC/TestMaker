import { Exam } from "../models/Exam.model";
import { Subject, Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Class } from '../models/Class.model';


@Injectable({
  providedIn: 'root'
})
export class ExamService {

  public data: any;

  exam: Exam;



  constructor(private http: HttpClient) { }


  examSubject = new Subject<Exam>();

  emitExam() {
    this.examSubject.next(this.exam);
  }

  addExam(exam: Exam) {
    this.exam = exam;
    this.emitExam();
  }

  getData(): Observable<any> {
    return this.examSubject.asObservable();
  }

  /**
* a function to send post request for get an exam details
* @param {Exam} exam - an exam.
* @returns {Observable<Object>} -  response of server
*/
  getExams(exam: Exam) {
    return this.http.post(environment.apiBaseUrl + '/getExamById', exam);
  }
  
  /**
* a function to send post request for create an exam
* @param {Exam} exam - an exam.
* @returns {Observable<Object>} -  response of server
*/
  postExamen(exam: Exam) {
    return this.http.post(environment.apiBaseUrl + '/newExam', exam);
  }

  /**
 * a function to send get request to get all exam by user
 * @returns {Observable<Object>} -  response of server
  */
  getAllExamen() {
    return this.http.get(environment.apiBaseUrl + '/getAllExam');
  }

  /**
 * a function to send post request to get all exam by class
 * @param {Class} myClass - a class.
 * @returns {Observable<Object>} -  response of server
  */
  getExamsOfClass(myClass: Class) {
    return this.http.post(environment.apiBaseUrl + '/getExamsOfClass', myClass);
  }

  /**
* a function to send delete request for remove an exam 
* @param {Exam} exam - an exam.
* @returns {Observable<Object>} -  response of server
*/
  deleteExam(exam: Exam) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: exam
    };
    return this.http.delete(environment.apiBaseUrl + '/deleteExam', httpOptions);
  }
}