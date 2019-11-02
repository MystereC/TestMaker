import { NgForm } from '@angular/forms';
import { Poll } from '../../models/Poll.model';
import { Component, OnInit } from '@angular/core';
import { PollService } from '../../shared/poll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-answer',
  templateUrl: './poll-answer.component.html',
  styleUrls: ['./poll-answer.component.css']
})
export class PollAnswerComponent implements OnInit {  


  poll : Poll;
  arrayOfAnwser = [];
  lengthQ : number;
  idOfChoice : number ;
   
  constructor(private pollService: PollService, private router: Router) { }

  ngOnInit() {
      this.poll = this.pollService.poll; 
      this.lengthQ = this.poll.option.length;
      this.idOfChoice=0;
 
  }

  onSubmit(form: NgForm) {
    this.idOfChoice = 0;
    for(var i=0; i<this.lengthQ;i++){
      this.arrayOfAnwser.push(form.value[i]);
    
    }
    this.idOfChoice = this.arrayOfAnwser.indexOf(true)+1;

    console.log(this.arrayOfAnwser);
    console.log(this.idOfChoice);

  }

  onSelectionChange(entry){
    let SubmissionPoll;
    SubmissionPoll = new Object();
    SubmissionPoll.poll=this.poll._id;
    SubmissionPoll.choice=entry;
    this.pollService.postVote(SubmissionPoll).subscribe(res=>{

      alert("Vous avez voté pour : "+ this.poll.option[entry].proposition+ ". Merci !")
      this.router.navigateByUrl('/home-student');
    },err=>{
      console.log(err);
    });

    

  }

  



}


