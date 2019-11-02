import { ClasseProgramService } from './../../shared/classe-program.service';
import { QuizesService } from './../../shared/quizes.service';
import { PollService } from 'src/app/shared/poll.service';
import { Poll } from './../../models/Poll.model';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { } from 'jquery';
import { routerNgProbeToken } from '@angular/router/src/router_module';
declare const M;
import {} from 'jquery';

declare let $ : any;

@Component({
  selector: 'app-sondage-list-student',
  templateUrl: './sondage-list-student.component.html',
  styleUrls: ['./sondage-list-student.component.css']
})
export class SondageListStudentComponent implements OnInit {

  myclasses : any;
  modalPoll:Poll;

  constructor(private pollService:PollService,private classeProgramService: ClasseProgramService, private router: Router,private userService: UserService,private quizesService:QuizesService) { 
}


ngOnInit() {
  $(document).ready(function () {
  $('.sidenav').sidenav();
  $('.modal').modal();//active le modal 
  $('select').formSelect();
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
