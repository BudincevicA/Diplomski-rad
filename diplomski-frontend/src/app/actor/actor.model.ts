import { Film } from "../film/film.model";

export class Actor{
    id:number;
    firstName:string;
    lastName: string;
    films: Film[];
    profilePicturePath:string;
    dateOfBirth: Date;
    biography: string;
    placeOfBirth : string;
}