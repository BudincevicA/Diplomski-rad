import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ForumTopic } from '../forum-topic/forum-topic.model';
import { ForumMessage } from './forum-message/forum-message.model';


@Injectable({
    providedIn: 'root'
})

export class ForumTopicService{

    private forumTopicUrl = "http://localhost:8080/forumTopic";

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<ForumTopic[]>(this.forumTopicUrl);
    }

    getOne(id: String) {
        return this.http.get<ForumTopic>(this.forumTopicUrl+`/${id}`);
      }
    
    
    delete(id: String) {
    return this.http.delete(this.forumTopicUrl+`/${id}`);
    }

    add(forumTopic:ForumTopic) {
    return this.http.post(this.forumTopicUrl+'/register', forumTopic);
    }

    update(id:String, forumTopic:ForumTopic) {
    return this.http.put(this.forumTopicUrl+`/${id}`, forumTopic)
    }

    getForumMessages(forumTopic: number) {
        return this.http.get<ForumMessage[]>(this.forumTopicUrl + `/forummessages/${forumTopic}`);
    }

}