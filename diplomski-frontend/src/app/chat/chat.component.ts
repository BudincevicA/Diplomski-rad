import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs'
import { Message } from './message.model';
import { AuthService } from '../auth/auth.service';
import { MessageService } from './message.service';
import { FileService } from '../file/file.service';
import { Critic } from '../critic/critic.model';
import { CriticService } from '../critic/critic.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { AccountDataService } from '../account-data/account-data.service';
import { Administrator } from '../administrator/administrator.model';
import { AdministratorService } from '../administrator/administrator.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public fileUrl: string = this.fileService.fileUrl;
  private wc;
  public messages: Message[] = [];
  public groupedMessages: Person[] = [];
  public groupedMessagesUsernames: string[] = [];
  public conversation: Message[] = [];
  public msg: string;
  private message:Message;
  public loggedUser: string = this.authService.getCurrentUser();
  public recipient: Person = null;
  public critics: Critic[] = [];
  public users: User[] = [];
  public admins : Administrator[]=[];
  public newMessage = false;
  public loggedPerson: Person;

  myControl = new FormControl();
  options: Person[] = [];
  filteredOptions: Person[] = [];

  displayedColumns = ['recipient'];
  dataSource = new MatTableDataSource<Message>(this.conversation);


  constructor(private administratorService : AdministratorService,private accountDataService : AccountDataService,private authService : AuthService, private messageService: MessageService, private fileService : FileService, private userService: UserService, private criticService: CriticService) {
    this.wc = Stomp.client("ws://localhost:8080/ws");
    this.wc.connect({}, ()=>{
      this.wc.subscribe("/topic/ws", (msg)=>{
        this.messages.push(JSON.parse(msg.body));
        if(JSON.parse(msg.body).recipient == this.authService.getCurrentUser() || JSON.parse(msg.body).sender == this.authService.getCurrentUser()){
          this.conversation.push(JSON.parse(msg.body));
          this.dataSource.data = this.conversation;
          if(document.getElementsByName('bottom').length > 1){
            document.getElementsByName('bottom').item(document.getElementsByName('bottom').length-1).scrollIntoView(true);
          }
        }
      })
    })
   }

  ngOnInit() {
    this.getAllConversations();
    //this.getAllCritics();
    //this.getAllUsers();
    this.getAllAdministrators();
    this.getLoggedUser();

  }

  private _filter(value: string): Person[] {
    let filteredOptions: Person[] = [];
    const filterValue = value.toLowerCase();
    this.options.forEach(person => {
      if(person.username.toLowerCase().includes(filterValue)){
        filteredOptions.push(person);
      }
    })
    return filteredOptions;
}

onInputChanged(searchStr: string): void {
  this.filteredOptions = this._filter(searchStr);
}

send(){
  if(this.msg && this.msg.trim() != ''){
    this.message = new Message(this.msg, new Date(), this.recipient.username, this.authService.getCurrentUser(), []);
    this.wc.send("/app/ws", {}, JSON.stringify(this.message));
    this.msg = '';
  }
}

showConversation(person: Person){
  this.recipient = person;
  this.messages.forEach(message => {
    if(message.recipient == person.username || message.sender == person.username){
      this.conversation.push(message);
      this.dataSource.data = this.conversation;
    }
  })
}

getAllConversations(){
  this.messageService.getAllByUser(this.authService.getCurrentUser()).subscribe(data => {
    this.messages = data;
    data.forEach(message => {
      if(message.recipient != this.authService.getCurrentUser()){
        this.accountDataService.getOneByUsername(message.recipient).subscribe(data => {
          if(!this.groupedMessagesUsernames.includes(message.recipient)){
            this.groupedMessages.push(new Person(message.recipient, data.profilePicturePath));
            this.groupedMessagesUsernames.push(message.recipient);
          }
        })
      }
      if(message.sender != this.authService.getCurrentUser()){
        this.accountDataService.getOneByUsername(message.sender).subscribe(data => {
          if(!this.groupedMessagesUsernames.includes(message.sender)){
            this.groupedMessages.push(new Person(message.sender, data.profilePicturePath));
            this.groupedMessagesUsernames.push(message.sender);
          }
        })
      }
    })
  });
}

getAllUsers(){
  this.userService.getAll().subscribe(data => {
    this.users = data;
    data.forEach(user => {
      if(user.accountData.username != this.authService.getCurrentUser()){
        this.options.push(new Person(user.accountData.username, user.accountData.profilePicturePath));
        this.filteredOptions.push(new Person(user.accountData.username, user.accountData.profilePicturePath));
      }
    })
  })
}

getAllAdministrators(){
  this.administratorService.getAll().subscribe(data => {
    this.admins = data;
    data.forEach(admin => {
      if(admin.accountData.username != this.authService.getCurrentUser()){
        this.options.push(new Person(admin.accountData.username, admin.accountData.profilePicturePath));
        this.filteredOptions.push(new Person(admin.accountData.username, admin.accountData.profilePicturePath));
      }
    })
  })
}

getAllCritics(){
  this.criticService.getAll().subscribe(data => {
    this.critics = data;
    data.forEach(critic => {
      if(critic.accountData.username != this.authService.getCurrentUser()){
        this.options.push(new Person(critic.accountData.username, critic.accountData.profilePicturePath));
        this.filteredOptions.push(new Person(critic.accountData.username, critic.accountData.profilePicturePath));
      }
    })
  })
}

getLoggedUser(){
  this.accountDataService.getOneByUsername(this.authService.getCurrentUser()).subscribe(data => {
    this.loggedPerson = new Person(this.authService.getCurrentUser(), data.profilePicturePath);
  })
}

}

export class Person {
  username: string;
  profilePicturePath: string;

  constructor(username: string, profilePicturePath: string){
    this.username = username;
    this.profilePicturePath = profilePicturePath;
  }

}