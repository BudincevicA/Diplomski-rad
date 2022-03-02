import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FilmService } from 'src/app/film/film.service';
import { Film } from 'src/app/film/film.model';
import { FileService } from 'src/app/file/file.service';
import { AccountDataService } from 'src/app/account-data/account-data.service';
import { AccountData } from 'src/app/account-data/account-data.model';
import { UserService } from '../user.service';
import { User } from '../user.model';
import * as tf from '@tensorflow/tfjs'
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { SnackBarService } from 'src/app/shared/snack-bar.service';


@Component({
  selector: 'app-user-recommended',
  templateUrl: './user-recommended.component.html',
  styleUrls: ['./user-recommended.component.css']
})
export class UserRecommendedComponent implements OnInit {



  linearModel : tf.Sequential;
  prediction : any;
  public fileUrl: string = this.fileService.fileUrl;
  private juzer = new User;
  public trenutniUser = new User;
  public juzeri = [];
  likedFilms=[];
  dislikedFilms=[];
  allFilms=[];
  akounts =[];
  recommended=[];
  potRec=[];
  message =""
  constructor( private authService:AuthService ,private snackBarService : SnackBarService, private userService : UserService, private accountDataService : AccountDataService, private fileService : FileService, private authSerive: AuthService, private filmService : FilmService) { }

  ngOnInit() {
    
    let loggedUser = this.authSerive.getCurrentUser();
    this.userService.getAll().subscribe((data: User[])=>{
      this.userService.getAll().subscribe((data: User[])=>{
        this.juzeri=data;
      this.akounts=data;
      this.findUser(loggedUser);
      this.userService.getAll().subscribe((data: User[])=>{
        this.akounts=data;
        this.findUser(loggedUser);
      this.filmService.getAll().subscribe((allData: Film[]) => {
        this.allFilms = allData;
        this.recommend(2.5);
      });
    });
    });
    })
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
      this.likedFilms = data;
      this.filmService.getUsersDisLikedFilms(id).subscribe((dataD: Film[]) => {
        this.dislikedFilms = dataD;
      if (this.likedFilms.length==0){
        this.message="Go like some films"
      }else{
        this.message="Recommended based on liked films :"
      }
    });
    });
  }

  recommend(tresh : number){
    let titlovi =[];
    let titloviD = [];
    for (let a of this.likedFilms){
      titlovi.push(a.title);
      
    }

    for (let a of this.dislikedFilms){
      titloviD.push(a.title);
    }
    
    let indeksi=[];
    for (let b of this.allFilms){
      if (titlovi.includes(b.title) || titloviD.includes(b.title)){
        indeksi.push(this.allFilms.indexOf(b))
      }
    }
    for (var i = indeksi.length -1; i >= 0; i--){
      this.allFilms.splice(indeksi[i],1)
    }

    
    let inputs=[]
    let weights=[2,1,0.5]
    let reziseri=[]
    let zanrovi=[]
    let glumci =[]

    for (let r of this.likedFilms){
      reziseri.push(r.director["lastName"])
    }

    for (let z of this.likedFilms){
      zanrovi.push(z.genres["name"])
    }

    for (let g of this.likedFilms){
      glumci.push(g.actors["lastName"])
    }

    for (let f of this.allFilms){
      if (reziseri.includes(f.director.lastName)){
        inputs.push(1)
      }
      if (zanrovi.includes(f.genres.name)){
        inputs.push(1)
      }
      /*if (glumci.includes(f.actors.lastName)){
        inputs.push(1)
      }*/

      let sum = 0;
      for (let i = 0; i < inputs.length; i++) {
         sum += inputs[i] * weights[i];
        }
      if(sum>=tresh){
        this.potRec.push(f)
      }
      inputs =[];
      
    }

    this.recommended=this.potRec.slice(0,5);
    if(this.recommended.length==0){
      this.recommend(2)
      
    }    


  }

  removeFromRecommended(film:Film){
    
      const ulogovan = this.authService.getCurrentUser();
      for (let a of this.akounts){
        if(a.accountData.username==ulogovan){
          this.juzer=a;
        }
      }
      
      
      this.juzer.dislikes.push(film);
      this.userService.update(ulogovan, this.juzer).subscribe()
      this.snackBarService.openSnackBar("Film will not be recommended", "X")      

    
  }


}
