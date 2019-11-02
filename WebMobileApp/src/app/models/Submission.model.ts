import { Answer } from './Answer.model';
import { Exam } from './Exam.model';


export class Submission{
 
      
       constructor(){
    
          
       
       }
       public Exam: Exam;
       public answersList : Array<Answer>;
       public score :number;
       public _id : any;
}
