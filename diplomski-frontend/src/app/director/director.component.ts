import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../film/film.model';
import { Director } from './director.model';
import { DirectorService } from './director.service';
import { FileService } from '../file/file.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  public director:Director;
  public films:Film[];
  public fileUrl: string = this.fileService.fileUrl;
  private date:string

  constructor(public datepipe: DatePipe,private fileService : FileService,private directorService : DirectorService ,private route : ActivatedRoute ) { }

  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      this.directorService.getOne(routeParams.id).subscribe((data: Director)=>{
        this.director=data;
        this.directorService.getFilms(routeParams.id).subscribe((dataFilms: Film[])=>{
          this.director.films=dataFilms;
          this.date= this.datepipe.transform(this.director.dateOfBirth, 'dd/MM/yyyy')
    });
  });
  });
  };

}
