
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ClasseProgramService } from '../../shared/classe-program.service';


@Injectable()
export class ResolverForClass implements Resolve<Observable<Object>> {
  constructor(private classeProgramService: ClasseProgramService ) { }

  resolve() {
    return this.classeProgramService.getAllClasses();
  }
}