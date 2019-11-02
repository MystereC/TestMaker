import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Professor } from '../models/professor.model';
import { Observable } from 'rxjs';
 
const httpOptions={
    headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class SignUpService {
 
    private professorUrl = 'http://localhost:8080/api/professors';
    constructor(private http: HttpClient){
 
    }


    addProfessor(professor:Professor):Observable<Professor>{
        return this.http.post<Professor>(this.professorUrl,professor,httpOptions);
    }

}