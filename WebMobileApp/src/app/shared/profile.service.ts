import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Professor } from '../models/professor.model';
import { Observable } from 'rxjs';
 
const httpOptions={
    headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private professorUrl = 'http://localhost:8080/api/professors';
    constructor(private http: HttpClient){
 
    }

}

