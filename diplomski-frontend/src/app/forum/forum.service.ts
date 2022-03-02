import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Forum } from '../forum/forum.model';
import { ForumTopic } from './forum-topic/forum-topic.model';


@Injectable({
    providedIn: 'root'
})

export class ForumService{

    private forumUrl = "http://localhost:8080/forum";

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<Forum[]>(this.forumUrl);
    }

    getOne(id: String) {
        return this.http.get<Forum>(this.forumUrl+`/${id}`);
      }
    
    
    delete(id: String) {
    return this.http.delete(this.forumUrl+`/${id}`);
    }

    add(forum:Forum) {
    return this.http.post(this.forumUrl+'/register', forum);
    }

    update(id:String, forum:Forum) {
    return this.http.put(this.forumUrl+`/${id}`, forum)
    }

    getForumTopics(forum: number) {
        return this.http.get<ForumTopic[]>(this.forumUrl + `/forumtopics/${forum}`);
    }

}