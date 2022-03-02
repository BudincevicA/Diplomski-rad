import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserScore } from 'src/app/film/user-score/user-score.model';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { UserScoreService } from 'src/app/film/user-score/user-score.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-scores',
  templateUrl: './user-scores.component.html',
  styleUrls: ['./user-scores.component.css']
})
export class UserScoresComponent implements OnInit {

  userscores : UserScore[] = [];
  userscoresAll : UserScore[]=[];
  userscore : UserScore = new UserScore();
  displayedColumns: string[] = ['no', 'title','value','actions'];
  dataSource = new MatTableDataSource<UserScore>(this.userscores);

  @ViewChild(MatPaginator ,{static: true}) paginator: MatPaginator;

  constructor(private authService : AuthService,private userScoreService: UserScoreService, public dialog: MatDialog, private snackBarService: SnackBarService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  getAll(){
    this.userScoreService.getAll().subscribe((data: UserScore[]) => {
      this.userscoresAll = data;
      this.getMyScore();
      this.dataSource.data = this.userscores;
      this.dataSource.filterPredicate = function(data, filter): boolean {
        return data.value.toLowerCase().includes(filter) ||
              data.film.title.toLowerCase().includes(filter)
      };
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getMyScore(){
    const ulogovan = this.authService.getCurrentUser()

    for (let a of this.userscoresAll){
      if(a.usernameOfScore==ulogovan){
        this.userscores.push(a);
      }
    }

  }

}
