import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user : User;

  constructor(private userService: UserService, private router: Router) { 
  this.user = new User();
  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.user = res['user'];
      },
      err => { 
        console.log(err);
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.userService.deleteRole();
    this.router.navigate(['/']);
  }

  

  
        

}
