import { Component, OnInit } from '@angular/core';
import { Film } from '../film.model';
import { FilmService } from '../film.service';
import { FileService } from 'src/app/file/file.service';
import { UserScore } from '../user-score/user-score.model';
import { CriticScore } from '../critic-score/critic-score.model';
import { UserScoreService } from '../user-score/user-score.service';
import { CriticScoreService } from '../critic-score/critic-score.service';
import { FilmTop } from './film-top.model';


@Component({
  selector: 'app-film-top',
  templateUrl: './film-top.component.html',
  styleUrls: ['./film-top.component.css']
})
export class FilmTopComponent implements OnInit {

  public fileUrl: string = this.fileService.fileUrl;
  public films : Film[] 
  public sorter = "avgCriticScore";
  public filmTop = new FilmTop;
  public filmTops :  FilmTop[] = [] ;
  public cs;
  public us;
  public checkMessage="Show user score"
  public userScoreShow = false;
  public criticScoreShow= true;
  public checked = false;
  public usButton = true;
  public csButton = false;
  public checkedcritic = false;

  constructor(private fileService : FileService,private filmService : FilmService) { }

  ngOnInit() {

    this.filmService.getAll().subscribe((data: Film[])=>{
      this.films=data;
      this.getScores();
    });
  }

  

  sortBy(prop: string) {
    let filmSort = this.filmTops.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    if(prop=="avgCriticScore"){
      if(this.checked==true){
        this.userScoreShow=true;
      }else{
        this.userScoreShow=false;
      }
      
      this.criticScoreShow=true;
      

      this.usButton = true;
      this.csButton = false;
    }else if (prop=="avgUserScore"){
      if(this.checkedcritic==true){
        this.criticScoreShow=true;
      }else{
      this.criticScoreShow=false;
      }
      this.userScoreShow=true;

      this.usButton =false;
      this.csButton =true;
    }
    return filmSort.reverse();
  }

  getScores(){
    for (let f of this.films){
      let noviFilm = new FilmTop;
      this.filmService.getCriticScores(f.id).subscribe((dataCS: CriticScore[])=>{
        noviFilm.criticScores=dataCS;
        this.filmService.getUserScores(f.id).subscribe((dataUS: UserScore[])=>{
          noviFilm.userScores=dataUS;
          noviFilm.id=f.id
          noviFilm.title = f.title;
          noviFilm.director=f.director;
          noviFilm.genres=f.genres;
          noviFilm.actors=f.actors;
          noviFilm.reviews=f.reviews
          noviFilm.forum=f.forum;
          noviFilm.profilePicturePath=f.profilePicturePath;
          noviFilm.avgCriticScore = this.getAvgCriticScore(noviFilm.criticScores);
          noviFilm.avgUserScore = this.getAvgUserScore(noviFilm.userScores);
          if (noviFilm.avgCriticScore=="No critic scores" || noviFilm.avgUserScore=="No user scores"){

          }else{
          this.filmTops.push(noviFilm)
          }
    });
  });
    }


  }

  getAvgCriticScore(cs:CriticScore[]){
    let lista =[]
    for(let a of Object.values(cs)){
        lista.push(a["value"]);
      }
    
    var sum = 0;
    for( var i = 0; i < lista.length; i++ ){
        sum += parseInt( lista[i], 10 ); //don't forget to add the base
    }
    
  
    var avg = sum/lista.length;
    
  
  
    if (isNaN(avg)){
      return "No critic scores"
    }else{
      let avgg = (Math.round(avg * 100) / 100).toFixed(1);
      let result = "Critic score : "+avgg +"/5";
      return result;
    }
  }



  getAvgUserScore(us: UserScore[]){
    let lista =[]

    for(let a of us){
        lista.push(a["value"]);
      }
    
    var sum = 0;
    for( var i = 0; i < lista.length; i++ ){
        sum += parseInt( lista[i], 10 ); //don't forget to add the base
    }
    
  
    var avg = sum/lista.length;
    
  
  
    if (isNaN(avg)){
      return "No user scores"
    }else{
      let avgg = (Math.round(avg * 100) / 100).toFixed(1);
      let result = "User score : "+avgg +"/5";
      return result;
    }
  }

  toggle(event){
    console.log(this.checked)
    if (this.checked ==true){
      this.userScoreShow=false;
    }else{
      this.userScoreShow=true
    }
  }

  togglecritic(event){
      if (this.checked ==true){
        this.criticScoreShow=false;
      }else{
        this.criticScoreShow=true
      }
          
        

  }
  
}
