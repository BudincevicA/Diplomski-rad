import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CriticScore } from './critic-score.model';


@Injectable({
    providedIn: 'root'
})

export class CriticScoreService {

    private criticScoreUrl = "http://localhost:8080/criticScore";

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<CriticScore[]>(this.criticScoreUrl);
    }

    getOne(id: String) {
        return this.http.get<CriticScore>(this.criticScoreUrl + `/${id}`);
    }

    delete(id: String) {
        return this.http.delete(this.criticScoreUrl + `/${id}`);
    }

    add(criticScore: CriticScore) {
        return this.http.post(this.criticScoreUrl + '/register', criticScore);
    }

    update(id: String, criticScore: CriticScore) {
        return this.http.put(this.criticScoreUrl + `/${id}`, criticScore)
    }

}