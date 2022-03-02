import { Director } from "src/app/director/director.model";
import { Review } from "src/app/review/review.model";
import { Actor } from "src/app/actor/actor.model";
import { Genre } from "src/app/genre/genre.model";
import { UserScore } from "../user-score/user-score.model";
import { CriticScore } from "../critic-score/critic-score.model";
import { Forum } from "src/app/forum/forum.model";

export class FilmTop{
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
    avgUserScore:string;
    avgCriticScore:string;
}