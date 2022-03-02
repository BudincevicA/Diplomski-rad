import { Film } from "../film.model";

export class UserScore{
    id:number;
    usernameOfScore:string;
    value:string;
    film:Film;
}