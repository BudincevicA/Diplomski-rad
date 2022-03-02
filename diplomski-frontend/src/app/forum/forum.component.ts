import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../film/film.service';
import { Forum } from './forum.model';
import { ForumService } from './forum.service';
import { Film } from '../film/film.model';
import { ForumTopic } from './forum-topic/forum-topic.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ForumTopicService } from './forum-topic/forum-topic.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  public forum:Forum;
  public films:Film[];
  public film:Film;
  public forumTopics:ForumTopic[] = [];
  public message="";
  private isLogged=false;
  private isAdmin=false
  private loggedUserRoles: String[];

  forumTopic : ForumTopic = new ForumTopic();
  displayedColumns: string[] = ['title','description', 'actions'];
  dataSource = new MatTableDataSource<ForumTopic>(this.forumTopics);
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  constructor(private authService :AuthService,private snackBarService : SnackBarService,public dialog: MatDialog,private forumTopicService : ForumTopicService,private route :ActivatedRoute,private forumService: ForumService,private filmService: FilmService) { }

  ngOnInit() {
    this.dataSource.paginator=this.paginator;
    this.isLogged = this.authService.isLoggedIn();
    this.getAll();
  }


  getAll(){
    this.route.params.subscribe(routeParams => {
      this.loggedAdmin();
      this.forumService.getOne(routeParams.id).subscribe((data: Forum)=>{
        this.forum=data;
        this.filmService.getAll().subscribe((dataFilms: Film[])=>{
          this.films=dataFilms;
          this.findFilm();
          this.forumService.getForumTopics(data.id).subscribe((dataTopics: ForumTopic[])=>{
            this.forumTopics=dataTopics;
            this.noTopics();
            this.dataSource.data=dataTopics;
            this.dataSource.filterPredicate = function(data, filter): boolean {
              return data.title.toLowerCase().includes(filter) || 
                      data.description.toLowerCase().includes(filter);
            };

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

  findFilm(){
    for (let a of Object.values(this.films)){
        if(a.forum.id==this.forum.id){
          this.film=a;
        }
    }
  }

  noTopics(){
    if(this.forumTopics.length==0){
      this.message="There are no topics in this forum"
    }
  };

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  openDialog(id: String): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {title: "Delete forum topic", content: "Are you sure you want to delete this forum topic?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete(id);
      };
    });
  }

  delete(id: String){
    this.forumTopicService.delete(id).subscribe((data: any) => {
      this.getAll();
      this.snackBarService.openSnackBar("Successfully deleted forum topic", "X")
    });
  }

}
