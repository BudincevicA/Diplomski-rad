import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FilmService } from 'src/app/film/film.service';
import { Film } from 'src/app/film/film.model';
import { FileService } from 'src/app/file/file.service';
import { AccountDataService } from 'src/app/account-data/account-data.service';
import { AccountData } from 'src/app/account-data/account-data.model';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-user-disliked',
  templateUrl: './user-disliked.component.html',
  styleUrls: ['./user-disliked.component.css']
})
export class UserDislikedComponent implements OnInit {
  public fileUrl: string = this.fileService.fileUrl;
  films=[];
  akounts =[];
  message =""
  private juzer = new User;
  constructor(private snackBarService : SnackBarService,private authService :AuthService,private userService : UserService, private accountDataService : AccountDataService, private fileService : FileService, private authSerive: AuthService, private filmService : FilmService) { }

  ngOnInit() {
    
    let loggedUser = this.authSerive.getCurrentUser();
    this.userService.getAll().subscribe((data: User[])=>{
      this.akounts=data;
      this.findUser(loggedUser);
    });

  }

  findUser(logovan : String){
    for (let a of this.akounts){
      if (a["accountData"]["username"]==logovan){
        this.getLikedFilms(a["id"])
        break;
      };
    }
  }

  getLikedFilms(id: String){
    this.filmService.getUsersDisLikedFilms(id).subscribe((data: Film[]) => {
      this.films = data;
      if (this.films.length==0){
        this.message="There are no disliked films"
      }else{
        this.message="Films you don't want to be recommended: "
      }
    });
  }

  removeFromDislike(film:Film){
    const ulogovan = this.authService.getCurrentUser();
    for (let a of this.akounts){
      if(a.accountData.username==ulogovan){
        this.juzer=a;
      }
    }


    for (let f of this.juzer.dislikes){
      if(f.id==film.id){
        this.juzer.dislikes.splice(this.juzer.dislikes.indexOf(f),1)
      }
    }

    this.userService.update(ulogovan, this.juzer).subscribe()
    this.snackBarService.openSnackBar("Film will be recommended again", "X")      
  }
}
