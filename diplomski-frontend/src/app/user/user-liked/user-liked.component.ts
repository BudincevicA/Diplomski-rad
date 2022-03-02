import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FilmService } from 'src/app/film/film.service';
import { Film } from 'src/app/film/film.model';
import { FileService } from 'src/app/file/file.service';
import { AccountDataService } from 'src/app/account-data/account-data.service';
import { AccountData } from 'src/app/account-data/account-data.model';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-liked',
  templateUrl: './user-liked.component.html',
  styleUrls: ['./user-liked.component.css']
})
export class UserLikedComponent implements OnInit {

  public fileUrl: string = this.fileService.fileUrl;
  films=[];
  akounts =[];
  message =""
  constructor(private userService : UserService, private accountDataService : AccountDataService, private fileService : FileService, private authSerive: AuthService, private filmService : FilmService) { }

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
    this.filmService.getUsersLikedFilms(id).subscribe((data: Film[]) => {
      this.films = data;
      if (this.films.length==0){
        this.message="There are no liked films"
      }else{
        this.message="Liked films : "
      }
    });
  }


}
