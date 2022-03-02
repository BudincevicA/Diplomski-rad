import { Component, OnInit } from '@angular/core';
import { FileService } from '../file/file.service';
import { Film } from '../film/film.model';
import { FilmService } from '../film/film.service';
import { Genre } from '../genre/genre.model';
import { GenreService } from '../genre/genre.service';
import { Actor } from '../actor/actor.model';
import { ActorService } from '../actor/actor.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public fileUrl: string = this.fileService.fileUrl;
  public homeImageUrl: string = "images/home/filmoteka.jpg";
  films = [];
  genres = [];
  actors = [];
  genresForm = new FormControl();
  actorsForm = new FormControl();
  public selected = "all";
  temp = [];
  public glumac = "";
  public nadjen = "";
  public nadjenGlumac="";
  public sorter ='id';


  constructor(private fileService: FileService, private filmService: FilmService, private genreService: GenreService, private actorService: ActorService) { }

  ngOnInit() {
    this.filmService.getAll().subscribe((data: Film[]) => {
      this.films = data;
    });
    this.filmService.getAll().subscribe((data: Film[]) => {
      this.temp = data;
    });
    this.genreService.getAll().subscribe((data: Genre[]) => {
      this.genres = data;
    });
    this.actorService.getAll().subscribe((data: Actor[]) => {
      this.actors = data;
    });
  }

  loadFilms() {
    if (this.selected == "All" || this.selected == "all") {
      this.filmService.getAll().subscribe((data: Film[]) => {
        this.films = data;
      
      });
    }
    else {
      this.films = []

      for (let a of this.temp) {
        for (let b of Object.values(a["genres"])) {
          if (b["name"] == this.selected) {
            this.films.push(a)
            break;
          }
        }
      }
      
    }
  }

  searchFilm(glumac: string) {
    
    if (glumac == "") {
      this.filmService.getAll().subscribe((data: Film[]) => {
        this.films = data;
      });
    }

    else {
      this.films = []


      for (let a of this.temp){
            for(let b of Object.values(a["actors"])){
              this.nadjen=b["firstName"]+" "+b["lastName"]
              if (this.nadjen.toLocaleLowerCase().includes(glumac.toLowerCase()))
              {this.films.push(a)}
            }
      }

      for (let a of this.temp){
        this.nadjen = a["director"]["firstName"] + " "+a["director"]["lastName"]
        if(this.nadjen.toLocaleLowerCase().includes(glumac.toLowerCase())){
          this.films.push(a);
        }
      }

      for (let a of this.temp){
        this.nadjen=a["title"]
        if(this.nadjen.toLocaleLowerCase().includes(glumac.toLowerCase()))
        this.films.push(a)
      }

    }

  }


  loadSort(){

  }

  sortBy(prop: string) {
    return this.films.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

}
