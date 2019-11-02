import { Quiz } from './../models/Quiz.model';
import { Submission } from '../models/Submission.model';
import { Subject } from 'rxjs/internal/Subject';



export class ResultService {
    
    
    // resultQuestion : any[] = [];
   resultTest: Submission;
   // myQuiz : Quiz;
   // resultTestSubject = new Subject<Submition[]>();
   bareme : number = 0;
    


    constructor() { 
      this.resultTest= new Submission();
     //  this.resultTest.idQuiz = 12;
      /* this.resultTest.answersList=[{
                                  idPropostion : 0,
                                  idQuestion: 1,
                                  hisChoice : false,
                                   note :0,
                                 },
                                 {
                                  idPropostion : 1,
                                  idQuestion: 1,
                                  hisChoice : false,
                                   note :1,
                                 },
                                 {
                                  idPropostion : 2,
                                  idQuestion: 1,
                                  hisChoice : false,
                                   note :0,
                                 },
                                 {
                                  idPropostion : 0,
                                  idQuestion: 2,
                                  hisChoice : false,
                                   note :0,
                                 },
                                 {
                                  idPropostion : 1,
                                  idQuestion: 2,
                                  hisChoice : false,
                                   note :3,
                                 },
                                 
                                 {
                                  idPropostion : 0,
                                  idQuestion: 3,
                                  hisChoice : false,
                                   note :0,
                                 },
                                 {
                                  idPropostion : 1,
                                  idQuestion: 3,
                                  hisChoice : false,
                                   note :1,
                                 },
                                 {
                                  idPropostion : 2,
                                  idQuestion: 3,
                                  hisChoice : false,
                                   note :0,
                                 },
                       ];*/
    
    }
    ngOnInit(){
   
    }

  
    
    /*  addResponse(listResponse:[] , qName: string){
    
        const reponse = {   
          formuler :'',
          listProposition : [],
        };
        reponse.formuler =qName;
        reponse.listProposition=listResponse;
       
        
        this.resultQuestion.push(reponse);
        console.log(this.resultQuestion);
        
    
      }*/

   //  emitResultSubject() {
    //    this.resultTestSubject.next(this.resultTest.slice());
     // }
    

      
   findOptions(question : string){
 /*  for (var key in this.resultQuestion){
     if (this.resultQuestion[key].formuler == question) {
     console.log(this.resultQuestion[key].listProposition);
     return this.resultQuestion[key].listProposition;
     break
    }
     else return false;
   }*/

  
// this.resultQuestion.find((Qn) =>  Qn.formuler === question);

  }
}