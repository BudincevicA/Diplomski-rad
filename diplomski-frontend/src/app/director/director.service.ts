import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Director } from '../director/director.model';
import { Film } from '../film/film.model';

@Injectable({
    providedIn: 'root'
})

export class DirectorService{

    private path ="";
    private lista : string[];
    private poslednji = "";
    private praviPath ="";

    private directorUrl = "http://localhost:8080/director";

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<Director[]>(this.directorUrl);
    }

    getOne(id: String) {
        return this.http.get<Director>(this.directorUrl+`/${id}`);
      }
    
    
    delete(id: String) {
    return this.http.delete(this.directorUrl+`/${id}`);
    }

    add(director:Director) {
        this.path=director["profilePicturePath"];
        if(this.path==""){
            director["profilePicturePath"]="images/director_pictures/default.png"
        }else{
        this.lista = this.path.split("\\");
        this.poslednji = this.lista[this.lista.length-1];
        this.praviPath="images/director_pictures/" +this.poslednji;
        director["profilePicturePath"] = this.praviPath
        }
    return this.http.post(this.directorUrl+'/register', director);
    }

    update(id:String, director:Director) {
        this.path=director["profilePicturePath"];
        if(this.path==""){
            director["profilePicturePath"]="images/director_pictures/default.png"
        }else{
        this.lista = this.path.split("\\");
        this.poslednji = this.lista[this.lista.length-1];
        this.praviPath="images/director_pictures/" +this.poslednji;
        director["profilePicturePath"] = this.praviPath
        }
    return this.http.put(this.directorUrl+`/${id}`, director)
    }

    getFilms(director: number) {
        return this.http.get<Film[]>(this.directorUrl + `/films/${director}`);
    }

}