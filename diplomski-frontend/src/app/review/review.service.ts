import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../review/review.model';


@Injectable({
    providedIn: 'root'
})

export class ReviewService {

    private reviewUrl = "http://localhost:8080/review";

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<Review[]>(this.reviewUrl);
    }

    getOne(id: String) {
        return this.http.get<Review>(this.reviewUrl + `/${id}`);
    }

    delete(id: String) {
        return this.http.delete(this.reviewUrl + `/${id}`);
    }

    add(review: Review) {
        return this.http.post(this.reviewUrl + '/register', review);
    }

    update(id: String, review: Review) {
        return this.http.put(this.reviewUrl + `/${id}`, review)
    }

}