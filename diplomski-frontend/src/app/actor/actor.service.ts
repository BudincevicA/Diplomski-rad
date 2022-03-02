import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actor } from '../actor/actor.model';
import { Film } from '../film/film.model';


@Injectable({
    providedIn: 'root'
})

export class ActorService{

    private actorUrl = "http://localhost:8080/actor";
    private path ="";
    private lista : string[];
    private poslednji = "";
    private praviPath ="";

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<Actor[]>(this.actorUrl);
    }

    getOne(id: String) {
        return this.http.get<Actor>(this.actorUrl+`/${id}`);
      }
    
    
    delete(id: String) {
    return this.http.delete(this.actorUrl+`/${id}`);
    }

    add(actor:Actor) {
        this.path=actor["profilePicturePath"];
        if(this.path==""){
            actor["profilePicturePath"]="images/actor_pictures/default.png"
        }else{
        this.lista = this.path.split("\\");
        this.poslednji = this.lista[this.lista.length-1];
        this.praviPath="images/actor_pictures/" +this.poslednji;
        actor["profilePicturePath"] = this.praviPath
        }
    return this.http.post(this.actorUrl+'/register', actor);
    }

    update(id:String, actor:Actor) {
        this.path=actor["profilePicturePath"];
        if(this.path==""){
            actor["profilePicturePath"]="images/actor_pictures/default.png"
        }else{
        this.lista = this.path.split("\\");
        this.poslednji = this.lista[this.lista.length-1];
        this.praviPath="images/actor_pictures/" +this.poslednji;
        actor["profilePicturePath"] = this.praviPath
        }
    return this.http.put(this.actorUrl+`/${id}`, actor)
    }

    getFilms(actor: number) {
        return this.http.get<Film[]>(this.actorUrl + `/films/${actor}`);
    }

}