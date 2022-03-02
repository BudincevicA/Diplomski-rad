import { AccountData } from "../account-data/account-data.model";
import { Film } from "../film/film.model";

export class Review{

    id:number;
    reviewText:string;
    accountData:AccountData;
    film:Film;

}