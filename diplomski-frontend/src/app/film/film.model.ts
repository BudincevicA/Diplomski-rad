import { Director } from '../director/director.model';
import {Review} from '../review/review.model'
import {Actor} from '../actor/actor.model'
import {Genre} from '../genre/genre.model'
import { UserScore } from './user-score/user-score.model';
import { CriticScore } from './critic-score/critic-score.model';
import { Forum } from '../forum/forum.model';

export class Film{
    id:number;
    title:string;
    reviews: Review[];
    director:Director;
    actors:Actor[];
    genres:Genre[];
    profilePicturePath:string;
    userScores:UserScore[];
    criticScores:CriticScore[];
    forum:Forum;
}