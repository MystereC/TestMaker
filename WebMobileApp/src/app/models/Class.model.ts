import { Student } from "./student.model";

export class Class {
    public title: string;
    public university : string;
    public arrayOfStudents: Array<Student>;
    public _id;
    
    constructor(){
        this.title = '';
        this.university = '';
        this.arrayOfStudents = new Array<Student>();
    }
}