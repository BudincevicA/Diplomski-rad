import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../file/file.service';
import { Film } from '../film/film.model';
import { Genre } from '../genre/genre.model';
import { Actor } from '../actor/actor.model';
import { Director } from '../director/director.model';
import {Review} from '../review/review.model';
import {FilmService} from '../film/film.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ReviewService } from '../review/review.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { AccountData } from '../account-data/account-data.model';
import decode from 'jwt-decode';
import { AccountDataService } from '../account-data/account-data.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { UserScore } from './user-score/user-score.model';
import { CriticScore } from './critic-score/critic-score.model';
import { UserScoreService } from './user-score/user-score.service';
import { CriticScoreService } from './critic-score/critic-score.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  
  isLoggedIn = false;
  public loggedUserUsername: String;
  private loggedUserRoles: String[];
  public loggedUserType: String;
  private loggedInSubcription : Subscription;
  isCritic=false;
  isAdmin=false;
  isUser=false;
  notReviewd=true;
  notLiked=true;
  private reviewSubmit="";
  myReview:any;
  userNotVoted=true;
  criticNotVoted=true;
  


  public fileUrl: string = this.fileService.fileUrl;

  likedFilms=[];
  public akounts = [];
  private review = new Review;
  public film: Film;
  public reviewovi : Review[] = [];
  public imena = [];
  public juzer= new User;
  public juzeri = [];
  public trenutniUser = new User;
  public userScoreNew = new UserScore;
  public criticScoreNew = new CriticScore;
  public criticScore = new CriticScore;
  public avgUserScore="";
  public myUserScore;
  public avgCriticScore="";
  public myCriticScore;

  constructor(private criticScoreService : CriticScoreService ,private userScoreService : UserScoreService ,private userService :UserService,private ruter : Router,
    public dialog: MatDialog,private accountDataService: AccountDataService,
    private snackBarService: SnackBarService,private reviewService : ReviewService ,private fileService: FileService,private filmService : FilmService,
     private route :ActivatedRoute,private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.accountDataService.getAll().subscribe((data: AccountData[])=>{
      this.akounts=data;

    this.userService.getAll().subscribe((data: User[])=>{
      this.juzeri=data;

    
    this.route.params.subscribe(routeParams => {
      this.filmService.getOne(routeParams.id).subscribe((data: Film)=>{
        this.film=data;
        
        this.filmService.getUserScores(data.id).subscribe((dataUS: UserScore[])=>{
          this.film.userScores=dataUS;
          this.filmService.getCriticScores(data.id).subscribe((dataCS: CriticScore[])=>{
            this.film.criticScores=dataCS;
          this.filmService.getReviews(data.id).subscribe((dataReview: Review[])=>{
            this.film.reviews=dataReview;
            this.reviewovi=dataReview;
            this.myReview=this.authService.getCurrentUser();
            this.loggedCritic();
        });
        });
        });
      });
    });
  });
});
    this.loggedInSubcription = this.authService.loggedInStatusChanged.subscribe(
      (status: boolean)=>{
        this.isLoggedIn = status;
        this.loggedCritic();
      }
    );
    this.loggedCritic();

    // when refresh page while the user is logged in
  }

  loggedCritic(){
    this.averageUserScore();
    this.averageCriticScore();
    this.loggedUserUsername = this.authService.getCurrentUser();
    this.loggedUserRoles = this.authService.getCurrentRoles();
    this.loggedUserRoles.forEach(role => {
      if(role == "ROLE_ADMINISTRATOR"){
        this.loggedUserType = "administrator";
        this.isAdmin=true;
        return this.isAdmin;
      }
      else if(role == "ROLE_CRITIC"){
        this.loggedUserType = "critic";
        this.isCritic=true;
        this.alreadyReviewd();
        this.criticVoteStatus();
        return this.isCritic;
      }
      else if(role == "ROLE_USER"){
        this.loggedUserType = "user";
        this.isUser=true;
        this.likeStatus();
        this.userVoteStatus();
        return this.isUser;
      }
    });
  }

  submitReview(){
    const ulogovan = this.authService.getCurrentUser();
    for (let a of this.akounts){
      if(a["username"]==ulogovan){
        this.review.accountData=a;
      }
    }
    this.review.film=this.film;
    this.review.reviewText=this.reviewSubmit;
    this.reviewService.add(this.review).subscribe(_ => {
      this.snackBarService.openSnackBar("Successfully submitted review", "X")
      this.ngOnInit();
  });
  }

  alreadyReviewd(){
    for (let a of this.reviewovi.values()){
        this.imena.push(a["accountData"]["username"])
      }
    this.findCritic();
  }

  findCritic(){
    for(let a of this.imena){
      if (a == this.authService.getCurrentUser().toString()){
        this.notReviewd=false;
      }
    }
  }

  ngOnDestroy(){
    this.loggedInSubcription.unsubscribe();
  }

  openDialog(id: String): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {title: "Delete review", content: "Are you sure you want to delete this review?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteReview(id);
      };
    });
  }

  deleteReview(id: String){
    this.reviewService.delete(id).subscribe((data: any) => {
      this.snackBarService.openSnackBar("Successfully deleted review", "X")
      this.ngOnInit();
    });
  }

  openDialogFilm(id: String): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {title: "Delete film", content: "Are you sure you want to delete this film?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteFilm(id);
      };
    });
  }

  deleteFilm(id: String){
    this.filmService.delete(id).subscribe((data: any) => {
      this.snackBarService.openSnackBar("Successfully deleted film", "X")
      this.ruter.navigate(['/']);
    });
  }

  likeFilm(film:Film){
    const ulogovan = this.authService.getCurrentUser();
    for (let a of this.akounts){
      if(a["username"]==ulogovan){
        this.juzer=a;
      }
    }
    
    for (let a of this.juzeri){
      if(a["accountData"]["id"]==this.juzer["id"]){
        this.trenutniUser=a;
      }
    }

    this.trenutniUser.films.push(film);
    this.userService.update(ulogovan, this.trenutniUser).subscribe()
    this.snackBarService.openSnackBar("Film added to likes", "X")
    this.ngOnInit();
    
  }

  likeStatus(){
    let ulogovan = this.authService.getCurrentUser();
    for (let b of this.juzeri){
      
      if (b["accountData"]["username"]==ulogovan){
        this.getLikedFilms(b["id"])
        break;
      };
    }
  }

  getLikedFilms(id: String){
    this.filmService.getUsersLikedFilms(id).subscribe((data: Film[]) => {
      this.likedFilms = data;
      this.isItLiked();
    });
  }

  isItLiked(){
    for(let a of this.likedFilms){
      if(a["title"]==this.film.title){
        this.notLiked=false;
        break;
      }
    }
  }

  deleteLike(id :string){
    let ulogovan = this.authService.getCurrentUser();
    for (let b of this.juzeri){
      
      if (b["accountData"]["username"]==ulogovan){
        this.upUser(b,id);
        break;
      };
    }
  }

  upUser(user : User,id:string){

    for (let f of user.films){
      if(f["id"].toString()==id){
        user.films.splice(user.films.indexOf(f),1)
      }
    }
    
    this.userService.update(user.accountData.username, user).subscribe();
    this.snackBarService.openSnackBar("Film removed from likes", "X")
    this.ngOnInit();
  }

  submitUserScore(value:string){
    let ulogovan = this.authService.getCurrentUser();
      
    for (let b of this.juzeri){
      if (b["accountData"]["username"]==ulogovan){
        this.userScoreNew.usernameOfScore =b["accountData"]["username"];
        this.userScoreNew.value=value;
        break;
      };
    }

    this.userScoreNew.film=this.film
    
    this.userScoreService.add(this.userScoreNew).subscribe(_ => {
      this.snackBarService.openSnackBar("Successfully submitted score", "X")
      this.ngOnInit();
  });
  }

  submitCriticScore(value:string){

    this.criticScoreNew.usernameOfScore = this.authService.getCurrentUser();
    this.criticScoreNew.value=value;
    this.criticScoreNew.film=this.film
    

    this.criticScoreService.add(this.criticScoreNew).subscribe(_ => {
      this.snackBarService.openSnackBar("Successfully submitted score", "X")
      this.ngOnInit();
  });
  }


averageUserScore(){
  let lista =[]
  if(this.film ===undefined){
    
  }else{
  for(let a of this.film.userScores){
      lista.push(a["value"]);
    }
  }
  var sum = 0;
  for( var i = 0; i < lista.length; i++ ){
      sum += parseInt( lista[i], 10 ); //don't forget to add the base
  }
  

  var avg = sum/lista.length;
  if (isNaN(avg)){
    this.avgUserScore="No user scores"
  }else{
    let avgg = (Math.round(avg * 100) / 100).toFixed(1);
    this.avgUserScore="Average user score : "+avgg +"/5";
  }
}

averageCriticScore(){
  let lista =[]
  if(this.film ===undefined){
    
  }else{
  for(let a of this.film.criticScores){
      lista.push(a["value"]);
    }
  }
  var sum = 0;
  for( var i = 0; i < lista.length; i++ ){
      sum += parseInt( lista[i], 10 ); //don't forget to add the base
  }
  

  var avg = sum/lista.length;
  


  if (isNaN(avg)){
    this.avgCriticScore="No critic scores"
  }else{
    let avgg = (Math.round(avg * 100) / 100).toFixed(1);
    this.avgCriticScore="Average critic score : "+avgg +"/5";
  }
}

userVoteStatus(){

  let ulogovan = this.authService.getCurrentUser();
  if(this.film ===undefined){
    
  }else{
  for(let a of this.film.userScores){
      if (a["usernameOfScore"] == ulogovan){
        this.myUserScore = a["value"];
        this.userNotVoted=false;
      }
    }
  }
}

criticVoteStatus(){

  let ulogovan = this.authService.getCurrentUser();
  if(this.film ===undefined){
    
  }else{
  for(let a of this.film.criticScores){
      if (a["usernameOfScore"] == ulogovan){
        this.myCriticScore = a["value"];
        this.criticNotVoted=false;
      }
    }
  }
}

deleteUserScore(){
  let ulogovan = this.authService.getCurrentUser();
  if(this.film ===undefined){
    
  }else{
  for(let a of this.film.userScores){
      if (a["usernameOfScore"] == ulogovan){
        this.userScoreService.delete(a.id.toString()).subscribe((data: any) => {
          this.snackBarService.openSnackBar("Successfully removed score", "X")
          
        });
        this.ngOnInit();
        break;
      }
    }
  }
}

deleteCriticScore(){
  let ulogovan = this.authService.getCurrentUser();
  if(this.film ===undefined){
    
  }else{
  for(let a of this.film.criticScores){
      if (a["usernameOfScore"] == ulogovan){
        this.criticScoreService.delete(a.id.toString()).subscribe((data: any) => {
          this.snackBarService.openSnackBar("Successfully removed score", "X")
          
        });
        this.ngOnInit();
        break;
      }
    }
  }
}


}
