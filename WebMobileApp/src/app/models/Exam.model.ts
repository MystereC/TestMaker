import { Quiz } from "./Quiz.model";
import { Class } from "./Class.model";

export class Exam {
    constructor(){
        this.title = '';
        this.listQuiz = new Array<Quiz>();
        this.dateCreation = '';
        this.comment = '';
        this.class = new Class();
    }
    public title: string;
    public listQuiz: Array<Quiz>;
    public dateCreation: string;
    public class:Class;
    public comment?: string;
    public _id:string;
}