import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Film } from '../film.model';
import { FilmService } from 'src/app/film/film.service'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  films : Film[] = [];
  film : Film = new Film();
  displayedColumns: string[] = ['no', 'title','actions'];
  dataSource = new MatTableDataSource<Film>(this.films);

  @ViewChild(MatPaginator ,{static: true}) paginator: MatPaginator;

  constructor(private filmService: FilmService, public dialog: MatDialog, private snackBarService: SnackBarService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  getAll(){
    this.filmService.getAll().subscribe((data: Film[]) => {
      this.films = data;
      this.dataSource.data = data;
      this.dataSource.filterPredicate = function(data, filter): boolean {
        return data.title.toLowerCase().includes(filter)
      };
    });
  }

  delete(id: String){
    this.filmService.delete(id).subscribe((data: any) => {
      this.getAll();
      this.snackBarService.openSnackBar("Successfully deleted film", "X")
    });
  }

  update(id: string, film: Film){
    this.filmService.update(id, film).subscribe((data: any) => {
      this.getAll();
    });
  }

  openDialog(id: String): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {title: "Delete film", content: "Are you sure you want to delete this film?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete(id);
      };
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
