export class Quiz {
    
    constructor(){
        this.title = '';
        this.listQuestion = new Array<any>();
        this.dateCreation = '';
        this.description = '';
    }
        public title: string;
        public listQuestion: Array<any>;
        public dateCreation: string;
        public description?: string;
        public _id:any;
}