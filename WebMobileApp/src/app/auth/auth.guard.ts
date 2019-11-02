import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/');
      this.userService.deleteToken();
      this.userService.deleteRole();
      return false;
    }

    const role = next.data['roles'];

    
    if (role) {
          let isProfessor = true;
          let isStudent = true;
          isProfessor = this.userService.isProfessor();
           isStudent = this.userService.isStudent();
            


      if (isProfessor===true)
        if (role == "Etudiant"){
          this.router.navigateByUrl('/');
         this.userService.deleteRole();
          return false;

        }
            
     if (isStudent===true)
        if (role == "Professeur")
         { this.router.navigateByUrl('/');
         this.userService.deleteRole();
          return false;}

 
  
  }
    return true;
}
}