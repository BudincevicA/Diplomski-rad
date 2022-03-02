import { Component, OnInit } from '@angular/core';
import { Film } from '../film.model';
import { FilmService } from '../film.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { FormErrorService } from 'src/app/shared/formError.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { GenreService } from 'src/app/genre/genre.service';
import { Genre } from 'src/app/genre/genre.model';
import { ActorService } from 'src/app/actor/actor.service';
import {Actor} from '../../actor/actor.model';
import { Director } from 'src/app/director/director.model';
import { DirectorService } from 'src/app/director/director.service';
import { Forum } from 'src/app/forum/forum.model';
import { ForumService } from 'src/app/forum/forum.service';

@Component({
  selector: 'app-film-add-edit',
  templateUrl: './film-add-edit.component.html',
  styleUrls: ['./film-add-edit.component.css']
})
export class FilmAddEditComponent implements OnInit {

  public filmAddEdit :FormGroup;
  zanrovi = [];
  glumci = [];
  reziseri =[];
  public form = new FormGroup({});
  private id: string;
  private edit = false;
  public film = new Film;
  public forum = new Forum; 

  constructor(private forumService : ForumService,private fb: FormBuilder,private genreService: GenreService,private filmService :FilmService, private directorService : DirectorService,private actorService : ActorService
    , private route: ActivatedRoute, public formErrorService: FormErrorService, private snackBarService : SnackBarService) { }

  ngOnInit() {
    this.genreService.getAll().subscribe((data: Genre[]) => {
      this.zanrovi = data;
    });
    this.actorService.getAll().subscribe((data: Actor[]) => {
      this.glumci = data;
    });
    this.directorService.getAll().subscribe((data: Director[]) => {
      this.reziseri = data;
    });



    this.form = this.fb.group({
      title: ['', {validators: [Validators.required]}],
      genres: ['', {validators: [Validators.required]}],
      actors: ['', {validators: [Validators.required]}],
      director: ['', {validators: [Validators.required]}],
      profilePicturePath: ['', {validators: [Validators.required]}]
    });
    if(this.route.snapshot.paramMap.get("id")){
      this.edit = true;
      this.id = this.route.snapshot.paramMap.get("id");
      this.filmService.getOne(this.id).subscribe((data: Film) => {
        this.film = data;
        this.forum=this.film.forum;
        this.film.profilePicturePath="";
        this.form.patchValue(this.film);
      
      })
    }
    else {
    }

  }

  onSave() {
  const s = this.form.value;
  this.film = s;
  this.film.forum=this.forum;
  if(this.edit){
    this.filmService.update(this.id, this.film).subscribe(_ => {
      this.snackBarService.openSnackBar("Successfully edited film", "X")
    });
  }
  else{
    this.filmService.add(this.film).subscribe(_ => {
      this.form.reset();
      this.snackBarService.openSnackBar("Successfully added new film", "X")
  });
  }
}

}
