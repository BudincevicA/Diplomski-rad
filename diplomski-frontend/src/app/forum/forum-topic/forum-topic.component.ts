import { Component, OnInit } from '@angular/core';
import { ForumTopic } from './forum-topic.model';
import { ForumTopicService } from './forum-topic.service';
import { ActivatedRoute } from '@angular/router';
import { ForumMessageService } from './forum-message/forum-message.service';
import { ForumMessage } from './forum-message/forum-message.model';
import { FileService } from 'src/app/file/file.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AccountDataService } from 'src/app/account-data/account-data.service';
import { AccountData } from 'src/app/account-data/account-data.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from './information-dialog/information-dialog.component';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs'
import * as toxicity from '@tensorflow-models/toxicity';

@Component({
  selector: 'app-forum-topic',
  templateUrl: './forum-topic.component.html',
  styleUrls: ['./forum-topic.component.css']
})
export class ForumTopicComponent implements OnInit {


  public forumTopic = new ForumTopic;
  public forumMessages : ForumMessage[] = [];
  public fileUrl: string = this.fileService.fileUrl;
  public isLogged=false;
  public newMessage="";
  public newForumMessage= new ForumMessage;
  private accs:AccountData[]=[];
  private ulogovan;
  public isAdmin=false;
  private loggedUserRoles: String[];

  constructor(public dialog: MatDialog,private snackBarService : SnackBarService,private accService :AccountDataService,private authService : AuthService,private fileService : FileService,private forumMessageService :ForumMessageService,private route : ActivatedRoute,private forumTopicService : ForumTopicService) { }

  ngOnInit() {
    console.log('Using TensorFlow backend: ', tf.getBackend());
    this.isLogged = this.authService.isLoggedIn();
    this.loggedAdmin();
    this.route.params.subscribe(routeParams => {
      this.forumTopicService.getOne(routeParams.id).subscribe((data: ForumTopic)=>{
        this.forumTopic=data;
        this.forumTopicService.getForumMessages(routeParams.id).subscribe((dataMessages: ForumMessage[])=>{
          this.forumMessages=dataMessages;
          this.accService.getAll().subscribe((dataAcc: AccountData[])=>{
            this.accs=dataAcc;
            
      });
    });
    });
  });
}

loggedAdmin(){
  this.loggedUserRoles = this.authService.getCurrentRoles();
  this.loggedUserRoles.forEach(role => {
    if(role == "ROLE_ADMINISTRATOR"){
      this.isAdmin=true;
    }
  });
}

submitMessage(){
  this.ulogovan=this.authService.getCurrentUser();
  for (let a of Object.values(this.accs)){
    if(a.username==this.ulogovan){
      this.newForumMessage.accountData=a;
      this.newForumMessage.message=this.newMessage
      this.newForumMessage.forumTopic=this.forumTopic;
    }
  
}

this.messageDetector(this.newForumMessage.message);

}

openDialog(id: String): void {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '250px',
    data: {title: "Delete forum message", content: "Are you sure you want to delete this forum message?"}
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.delete(id);
    };
  });
}

delete(id: String){
  this.forumMessageService.delete(id).subscribe((data: any) => {
    this.ngOnInit();
    this.snackBarService.openSnackBar("Successfully deleted forum message", "X")
  });
}

async messageDetector(message : string){
  const treshold = 0.9;
  const labels = ["insult"]
  toxicity.load(treshold,labels).then(model=>{
    const sentence =message;

    model.classify(sentence).then(predictions=>{
      for (let p of predictions){
        for (let z of p.results){
          if(z.match){
            const dialogRef = this.dialog.open(InformationDialogComponent, {
              width: '250px',
              data: {title: "Inappropriate message", content: "Your message has been deemed inappropriate (toxic, insulting) , please be nice"}
            });
          }else{
            this.forumMessageService.add(this.newForumMessage).subscribe(_ => {
  
              this.snackBarService.openSnackBar("Successfully added message", "X")
              this.ngOnInit();
            });
          }
          
        }
      }
    });

  });


}


}
