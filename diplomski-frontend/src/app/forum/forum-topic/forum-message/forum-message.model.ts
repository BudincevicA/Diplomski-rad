import { AccountData } from "src/app/account-data/account-data.model";
import { ForumTopic } from "../forum-topic.model";

export class ForumMessage{

    id:number;
    forumTopic :ForumTopic;
    accountData :AccountData;
    message:string;

}