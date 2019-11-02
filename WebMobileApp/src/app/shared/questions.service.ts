import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Class } from '../models/Class.model';
import { Question } from '../models/Question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {






    constructor(private http: HttpClient) { }
  
     postQuestion(question: Question){
      return  this.http.post(environment.apiBaseUrl+'/newQuestion',question);
    }
  
  /*  login(authCredentials) {
      return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
    }
  
    getUserProfile() {
      return this.http.get(environment.apiBaseUrl + '/userProfile');
    }*/
  
   
   
}
