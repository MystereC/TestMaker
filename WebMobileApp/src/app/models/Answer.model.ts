import { Choice } from './Choice.model';

export class Answer{

    constructor(){
        

        this.score = 0;
    }
    
    public listProposition : Array<Choice>;
    public idQuestion: number;
    
    public score :number;
    
}


