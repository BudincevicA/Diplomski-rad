import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from './film.model';
import { Genre } from '../genre/genre.model';
import { Actor } from '../actor/actor.model';
import { Director } from '../director/director.model';
import { Review } from '../review/review.model'
import { UserScore } from './user-score/user-score.model';
import { CriticScore } from './critic-score/critic-score.model';
import { ForumService } from '../forum/forum.service';
import { Forum } from '../forum/forum.model';


@Injectable({
    providedIn: 'root'
})

export class FilmService {

    private filmUrl = "http://localhost:8080/film";
    private userUrl = "http://localhost:8080/user";
    private forumUrl ="http://localhost:8080/forum";
    private path ="";
    private lista : string[];
    private poslednji = "";
    private praviPath ="";
    constructor(private forumService: ForumService ,private http: HttpClient) {
    }

    getAll() {
        return this.http.get<Film[]>(this.filmUrl);
    }

    getOne(id: String) {
        return this.http.get<Film>(this.filmUrl + `/${id}`);
    }

    delete(id: String) {
        return this.http.delete(this.filmUrl + `/${id}`);
    }

    add(film: Film) {
        this.path=film["profilePicturePath"];
        if(this.path==""){
            film["profilePicturePath"]="images/film_posters/filmdefault.png"
        }else{
        this.lista = this.path.split("\\");
        this.poslednji = this.lista[this.lista.length-1];
        this.praviPath="images/film_posters/" +this.poslednji;
        film["profilePicturePath"] = this.praviPath
        }
        film.forum = new Forum;
        
        return this.http.post(this.filmUrl+'/register', film);
    }

    update(id: string, film: Film) {
        this.path=film["profilePicturePath"];
        console.log(this.path)
        if(this.path==""){
            film["profilePicturePath"]="images/film_posters/filmdefault.png"
        }else{
        this.lista = this.path.split("\\");
        this.poslednji = this.lista[this.lista.length-1];
        this.praviPath="images/film_posters/" +this.poslednji;
        film["profilePicturePath"] = this.praviPath
        }
        return this.http.put(this.filmUrl + `/${id}`, film)
    }

    addScore(id: string, film: Film) {
        return this.http.put(this.filmUrl + `/${id}`, film)
    }

    getActors(film: number) {
        return this.http.get<Actor[]>(this.filmUrl + `/actors/${film}`);
    }

    getGenres(film: number) {
        return this.http.get<Genre[]>(this.filmUrl + `/genres/${film}`);
    }

    getReviews(film: number) {
        return this.http.get<Review[]>(this.filmUrl + `/reviews/${film}`);
    }

    getUserScores(film: number) {
        return this.http.get<UserScore[]>(this.filmUrl + `/userscores/${film}`);
    }

    getCriticScores(film: number) {
        return this.http.get<CriticScore[]>(this.filmUrl + `/criticscores/${film}`);
    }

    getDirector(film: number) {
        return this.http.get<Director>(this.filmUrl + `/director/${film}`);
    }

    getUsersLikedFilms(id:String){
        return this.http.get<Film[]>(this.userUrl+`/films/${id}`)
    }

    getUsersDisLikedFilms(id:String){
        return this.http.get<Film[]>(this.userUrl+`/filmsdislike/${id}`)
    }


}