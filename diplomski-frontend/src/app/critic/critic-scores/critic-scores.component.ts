import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CriticScore } from 'src/app/film/critic-score/critic-score.model';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { CriticScoreService } from 'src/app/film/critic-score/critic-score.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-critic-scores',
  templateUrl: './critic-scores.component.html',
  styleUrls: ['./critic-scores.component.css']
})
export class CriticScoresComponent implements OnInit {

  criticsscores : CriticScore[] = [];
  criticsscoresAll : CriticScore[]=[];
  userscore : CriticScore = new CriticScore();
  displayedColumns: string[] = ['no', 'title','value','actions'];
  dataSource = new MatTableDataSource<CriticScore>(this.criticsscores);

  @ViewChild(MatPaginator ,{static: true}) paginator: MatPaginator;

  constructor(private authService : AuthService,private criticScoreService: CriticScoreService, public dialog: MatDialog, private snackBarService: SnackBarService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  getAll(){
    this.criticScoreService.getAll().subscribe((data: CriticScore[]) => {
      this.criticsscoresAll = data;
      this.getMyScore();
      this.dataSource.data = this.criticsscores;
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

    for (let a of this.criticsscoresAll){
      if(a.usernameOfScore==ulogovan){
        this.criticsscores.push(a);
      }
    }

  }

}
