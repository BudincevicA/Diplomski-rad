import { Film } from "../film.model";

export class CriticScore {
    id:number;
    usernameOfScore:string;
    value:string;
    film:Film;
}