import { Film } from "../film/film.model";
import { ForumTopic } from "./forum-topic/forum-topic.model";

export class Forum {
    id:number;
    forumTopics:ForumTopic[];
    film:Film;
}