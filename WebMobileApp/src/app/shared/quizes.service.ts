import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Quiz } from '../models/Quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizesService {

  public storage: any;
  listOfQuestion;
  myQuiz : Quiz;
 
  seconds: number;
  timer;
  QuestionNumberProgress: number;
  correctAnswerCount: number = 0;
  myQuizSubject = new Subject<Quiz>();

    constructor(private http: HttpClient) { }
    /**
    * a function to send post request to create quiz
    * @param {Quiz} quiz - a quiz.
    * @returns {Observable<Object>} -  response of server
     */
    postQuiz(quiz: Quiz){
      return this.http.post(environment.apiBaseUrl+'/newQuiz',quiz);
    }
   /**
    * a function to send post request to get all quiz
    * @returns {Observable<Object>} -  response of server
     */
    getQuiz(){
      return this.http.get(environment.apiBaseUrl+'/getQuizes');
    }

       /**
    * a function to send put request to update quiz
    * @param {Quiz} quiz - a quiz.
    * @returns {Observable<Object>} -  response of server
     */
    putQuiz(quiz:Quiz){
      return this.http.put(environment.apiBaseUrl+'/UpdateQuiz',quiz);
    }

    getData(): Observable<any> {
      return this.myQuizSubject.asObservable();
    }
  
    emitQuizSubject() {
      this.myQuizSubject.next(this.myQuiz);
    };
  
    
    displayTimeElapsed() {
      return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
    }
   
   
}
