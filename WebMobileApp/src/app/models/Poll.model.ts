import { Class } from "./Class.model";
import { Option } from "./Option.model";
export class Poll {

    constructor(){
        this.question = '';
        this.dateCreation = new Date();
        this.option = new Array<Option>();
        this.class = new Class();
        this.description = '';
    }
    public question: string;
    public dateCreation: Date;
   public option : Array<Option>;
    /*public option: [{ proposition:String;
     vote :Number;}]*/
    public class: Class;
    public description? : string;
    public _id: any;
}