import { ClasseProgramService } from '../../shared/classe-program.service';
import { Component, OnInit } from '@angular/core';

import {} from 'jquery';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../shared/exam.service';

declare let $ : any;

@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.css']
})
export class ClasseListComponent implements OnInit {

  myclasses: any;

  constructor(private classeProgramService: ClasseProgramService,private userService: UserService,private route: ActivatedRoute,private router: Router,private examenService : ExamService) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
    });
    
    this.fetchAllClasses();

    console.log(this.myclasses);

  }

  



  fetchAllClasses(){
                        
    this.myclasses = this.route.snapshot.data.classes;
    console.log()
    /*this.classeProgramService.getAllClasses().subscribe(
      res => {
        this.myclasses = res;
      
        console.log(this.myclasses);

      },
      err => { 
        console.log(err);
        
      }
    );*/
  }

  showStudents(item){
    this.classeProgramService.classe=item;
    this.router.navigate(['/student-list']);
  }

  showExams(item){
    console.log(item);
    this.classeProgramService.classe=item;
    this.router.navigate(['/examOfClass-list']);
  }

}
