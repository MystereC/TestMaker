import { Component, OnInit } from '@angular/core';

import { ClasseProgramService } from '../shared/classe-program.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { QuizesService } from '../shared/quizes.service';

import { } from 'jquery';
import { PollService } from '../shared/poll.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Poll } from '../models/Poll.model';
declare const M;
declare let $ : any;

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {
  myclasses : any;
  modalPoll:Poll;
  constructor(private pollService:PollService,private classeProgramService: ClasseProgramService, private router: Router,private userService: UserService,private quizesService:QuizesService) { }

  ngOnInit() {
      $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
      $('.collapsible').collapsible();
    });
    this.fetchAllClasses();
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems, {
        direction: 'left'
      });
    });
  }


  fetchAllClasses(){
    this.userService.getClassesRegisterd().subscribe(
      res => {
        this.myclasses = res;
      console.log(this.myclasses);
       
      },
      err => { 
        console.log(err);
        
      }
    );
  

  }
  onSelectPoll(poll){
    
    this.pollService.poll=poll;
    this.router.navigateByUrl('/poll-answer');
  }
}
