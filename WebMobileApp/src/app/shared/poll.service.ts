import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Poll } from '../models/Poll.model';



@Injectable({
  providedIn: 'root'
})
export class PollService {
  poll: Poll;
  constructor(private http: HttpClient) { }

  /**
* a function to send post request to post a poll
* @param {Poll} poll - a poll.
* @returns {Observable<Object>} -  response of server
*/
  postPoll(poll: Poll) {
    return this.http.post(environment.apiBaseUrl + '/newPoll', poll);
  }


  /**
* a function to send get request to get all poll
* @param {Poll} poll - a poll.
* @returns {Observable<Object>} -  response of server
*/
  getMyPolls() {
    return this.http.get(environment.apiBaseUrl + '/getPollById');
  }
  /**
* a function to put post request to vote
* @param {any} pollVote - a poll.
* @returns {Observable<Object>} -  response of server
*/
  postVote(pollVote: any) {
    return this.http.put(environment.apiBaseUrl + '/vote', pollVote);
  }



}