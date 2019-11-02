import { ClasseProgramService } from '../../shared/classe-program.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

import {} from 'jquery';

declare let $ : any;
@Component({
  selector: 'app-search-classe',
  templateUrl: './search-classe.component.html',
  styleUrls: ['./search-classe.component.css']
})
export class SearchClasseComponent implements OnInit {


  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Classe','firstName','email','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

myList : any;
  constructor(private classeProgramService: ClasseProgramService,private router: Router, ) { 



  
  
  }

  
  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.modal').modal();//active le modal 
      $('select').formSelect();
      $('.collapsible').collapsible();
    });

    this.myList = new Array<any>();

    this.classeProgramService.getAllClasses().subscribe(
      res => {
        this.myList = res;
        let array =this.myList;
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
     this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          console.log(ele);
          console.log(data);
          console.log(data[ele]);
          if(ele=='Classe'){ele='title'
           return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        }
        });
     };
      
       
      },
      err => { 
        console.log(err);
        
      }
    );

   
    
  }

   /**
    * a function to clear the search bar
     */
  onSearchClear() {
    this.searchKey =  "";
    this.applyFilter();
  }

  /**
    * a function to filter on the table
     */
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  inscrire(rejoinClass){
    console.log(rejoinClass);
    
    this.classeProgramService.rejoinClass(rejoinClass).subscribe(
      res => {
        this.router.navigate(['/home-student']);
       
      },
      err => { 
        console.log(err);
        
      }
    );

  }
}
