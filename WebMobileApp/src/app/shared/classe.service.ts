import { Class } from "../models/Class.model";

export class ClasseService {
    private Classe: Class;

    addClasse(title: string){
        this.Classe.title=title;
    }
}