import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../film/film.model';
import { Actor } from './actor.model';
import { ActorService } from './actor.service';
import { FileService } from '../file/file.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {


  public actor:Actor;
  public films:Film[];
  public fileUrl: string = this.fileService.fileUrl;
  private date:string

  constructor(public datepipe: DatePipe,private fileService : FileService,private actorService : ActorService ,private route : ActivatedRoute ) { }

  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      this.actorService.getOne(routeParams.id).subscribe((data: Actor)=>{
        this.actor=data;
        this.actorService.getFilms(routeParams.id).subscribe((dataFilms: Film[])=>{
          this.actor.films=dataFilms;
          this.date= this.datepipe.transform(this.actor.dateOfBirth, 'dd/MM/yyyy')
    });
  });
  });
  };
}
