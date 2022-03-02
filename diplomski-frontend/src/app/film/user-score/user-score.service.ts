import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserScore } from './user-score.model';


@Injectable({
    providedIn: 'root'
})

export class UserScoreService {

    private userScoreUrl = "http://localhost:8080/userScore";

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<UserScore[]>(this.userScoreUrl);
    }

    getOne(id: String) {
        return this.http.get<UserScore>(this.userScoreUrl + `/${id}`);
    }

    delete(id: String) {
        return this.http.delete(this.userScoreUrl + `/${id}`);
    }

    add(userScore: UserScore) {
        return this.http.post(this.userScoreUrl + '/register', userScore);
    }

    update(id: String, userScore: UserScore) {
        return this.http.put(this.userScoreUrl + `/${id}`, userScore)
    }

}