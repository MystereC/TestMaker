import { Proposition } from "./Proposition.model";

export class Question {
        //public idQuestion: number,
    public formuler: string;
    public listProposition: Array<Proposition>;
    public _id:any;
    constructor(){
        this.formuler = '';
        this.listProposition = new Array<Proposition>();
    }

}