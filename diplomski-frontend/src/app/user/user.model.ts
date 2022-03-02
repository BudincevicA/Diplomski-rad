import { AccountData } from '../account-data/account-data.model';
import { Film } from '../film/film.model';

export class User {
    id:number;
    accountData:AccountData;
    firstName:String;
    lastName:String;
    films:Film[];
    dislikes:Film[];
}