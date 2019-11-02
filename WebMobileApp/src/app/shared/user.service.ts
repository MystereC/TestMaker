import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Class } from '../models/Class.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  student;
  UserRole;

    selectedUser: User = {
      firstName: '',
      lastName:'',
      email: '',
      role:'',
      password: '',
      _id:'',
      
    };

    noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

    constructor(private http: HttpClient) { }
   /**
    * a function to send post request to  register
    * @param {User} user - a submission.
    * @returns {Observable<Object>} -  response of server
     */
    postUser(user: User){
      return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
    }
     /**
    * a function to send post request to get sign in
    * @param {any} authCredentials - email and password.
    * @returns {Observable<Object>} -  response of server
     */
    login(authCredentials) {
      return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
    }
  
         /**
    * a function to send get request to get user details
    * @returns {Observable<Object>} -  response of server
     */
    getUserProfile() {
      return this.http.get(environment.apiBaseUrl + '/userProfile');
    }

       /**
    * a function to send get request to get his classes
    * @returns {Observable<Object>} -  response of server
     */
    getClassesRegisterd() {
      return this.http.get(environment.apiBaseUrl + '/getClassesRegisterd');
    }
    
    /**
    * a function to send get request to get his submissions
    * @returns {Observable<Object>} -  response of server
     */
    getSubmissions() {
      return this.http.get(environment.apiBaseUrl + '/getSubmissions');
    }
   /**
    * a function to send post request to  get all student's submissions
    * @param {User} user - a user.
    * @returns {Observable<Object>} -  response of server
     */
    getSubmissionsByStudent(user:User) {
      return this.http.post(environment.apiBaseUrl + '/getSubmissionsByStudent',user);
    }
   
  
   

    setRole(userRole:string){
    localStorage.setItem('role',userRole );
    }

    deleteRole() {
      localStorage.removeItem('role');
    }
    getRole(){
      return localStorage.getItem('role');
    }
    setToken(token: string) {
      localStorage.setItem('token', token);
    }
  
    deleteToken() {
      localStorage.removeItem('token');
    }
  
    getToken() {
      return localStorage.getItem('token');
    }
  
    getUserPayload() {
      var token = this.getToken();
      if (token) {
        var userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      }
      else
        return null;
    }
  
    isLoggedIn() {
      var userPayload = this.getUserPayload();
      if (userPayload)
        return userPayload.exp > Date.now() / 1000;
      else
        return false;
    }

    isProfessor(){

      if(this.getRole().toString()=="Professeur")
      return true;
      else
      return false;
    }

    isStudent(){
      
      if(this.getRole().toString()=="Etudiant")
      return true;
      else
      return false;
    }
    

   
}
