import { Director } from '../../director/director.model';
import {Review} from '../../review/review.model'
import {Actor} from '../../actor/actor.model'
import {Genre} from '../../genre/genre.model'
import { UserScore } from 'src/app/film/user-score/user-score.model';
import { CriticScore } from 'src/app/film/critic-score/critic-score.model';

export class recommend{
    id:number;
    title:string;
    reviews: Review[];
    director:Director;
    actors:Actor[];
    genres:Genre[];
    profilePicturePath:string;
    userScores:UserScore[];
    criticScores:CriticScore[];
    klasa:string;

}