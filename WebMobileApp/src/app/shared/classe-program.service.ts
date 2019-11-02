import { Class } from "../models/Class.model";
import { Subject } from "rxjs/internal/Subject";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ClasseProgramService {
    public storage: any;

    classe: Class;
    classeSubject = new Subject<Class>();

    constructor(private http: HttpClient) { }

    emitClasse() {
        this.classeSubject.next(this.classe);
    }

    addClasse(classe: Class) {
        this.classe = classe;
        this.emitClasse();
    }

    getData(): Observable<any> {
        return this.classeSubject.asObservable();
    }

    /**
    * a function to send post request for create class
    * @param {Class} myClass - a class.
    * @returns {Observable<Object>} -  response of server
     */
    createClass(myClass: Class) {
        return this.http.post(environment.apiBaseUrl + '/newClass', myClass);
    }

    /**
     * a function to send get request for get all class of user
    * @returns {Observable<Object>} -  response of server
    */
    getMyClasses() {
        return this.http.get(environment.apiBaseUrl + '/getMyClasses');
    }
    /**
     * a function to send get request for get all class 
    * @returns {Observable<Object>} -  response of server
    */
    getAllClasses() {
        return this.http.get(environment.apiBaseUrl + '/getAllClasses');
    }
  /**
    * a function to send post request for get all student of a class
    * @param {Class} myClass - a class.
    * @returns {Observable<Object>} -  response of server
     */
    getAllStudents(myClass: Class) {
        return this.http.post(environment.apiBaseUrl + '/getAllSutudentOfClass', myClass);
    }

  /**
    * a function to send post request for subscribe in class
    * @param {Class} myClass - a class.
    * @returns {Observable<Object>} -  response of server
     */
    rejoinClass(myClass: Class) {
        return this.http.post(environment.apiBaseUrl + '/rejoinClass', myClass);
    }
    /**
    * a function to send post request for unsubscribe in class
    * @param {any} myClass - a class.
    * @returns {Observable<Object>} -  response of server
     */
    unsubscribeInClass(myClass: any) {
        return this.http.put(environment.apiBaseUrl + '/unsubscribeInClass', myClass);
    }
}