import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../genre/genre.model';


@Injectable({
    providedIn: 'root'
})

export class GenreService{

    private genreUrl = "http://localhost:8080/genre";

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<Genre[]>(this.genreUrl);
    }

    getOne(id: String) {
        return this.http.get<Genre>(this.genreUrl+`/${id}`);
      }
    
    
    delete(id: String) {
    return this.http.delete(this.genreUrl+`/${id}`);
    }

    add(genre:Genre) {
    return this.http.post(this.genreUrl+'/register', genre);
    }

    update(id:String, genre:Genre) {
    return this.http.put(this.genreUrl+`/${id}`, genre)
    }

}
