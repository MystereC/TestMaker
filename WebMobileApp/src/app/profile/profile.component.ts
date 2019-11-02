import { Student } from './../models/student.model';
import { Component, OnInit } from '@angular/core';
import { User} from '../models/user.model'
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import {} from 'jquery';

declare let $ : any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : User;

  constructor(private userService: UserService, private router: Router) { 
    this.user = new User();

  }



  ngOnInit() {

      $(document).ready(function () {
        $('.sidenav').sidenav();
        $('.modal').modal();//active le modal 
        $('select').formSelect();
        $('.collapsible').collapsible();
      });

    this.userService.getUserProfile().subscribe(
      res => {
        this.user = res['user'];
      },
      err => { 
        console.log(err);
      }
    );
  }

  

}
