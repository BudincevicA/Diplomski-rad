import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ForumMessage } from './forum-message.model';


@Injectable({
    providedIn: 'root'
})

export class ForumMessageService{

    private forumMessageUrl = "http://localhost:8080/forumMessage";

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<ForumMessage[]>(this.forumMessageUrl);
    }

    getOne(id: String) {
        return this.http.get<ForumMessage>(this.forumMessageUrl+`/${id}`);
      }
    
    
    delete(id: String) {
    return this.http.delete(this.forumMessageUrl+`/${id}`);
    }

    add(forumMessage:ForumMessage) {
    return this.http.post(this.forumMessageUrl+'/register', forumMessage);
    }

    update(id:String, forumMessage:ForumMessage) {
    return this.http.put(this.forumMessageUrl+`/${id}`, forumMessage)
    }


}