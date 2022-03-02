import { Film } from "../film/film.model";

export class Director {

    id:number;
    firstName:string;
    lastName:string;
    profilePicturePath:string;
    films:Film[];
    dateOfBirth: Date;
    biography: string;
    placeOfBirth : string;
}