import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/Quiz.model.js';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
   
  @Injectable({
    providedIn: 'root'
  })

  export class DetailQuizService   {

    private quizUrl = 'http://localhost:8080/api/quiz';

    constructor(private http: HttpClient){

    }
    
    getQuiz(id: string): Observable<Quiz> {
        const url = `${this.quizUrl}/${id}`;
        return this.http.get<Quiz>(url);
      }

      getQuizs (): Observable<Quiz[]> {
        return this.http.get<Quiz[]>(this.quizUrl)
      }
  }