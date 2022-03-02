import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Genre } from '../genre.model';
import { GenreService } from 'src/app/genre/genre.service'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  genres : Genre[] = [];
  genre : Genre = new Genre();
  displayedColumns: string[] = ['no', 'name','description','actions'];
  dataSource = new MatTableDataSource<Genre>(this.genres);

  @ViewChild(MatPaginator ,{static: true}) paginator: MatPaginator;

  constructor(private genreService: GenreService, public dialog: MatDialog, private snackBarService: SnackBarService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  getAll(){
    this.genreService.getAll().subscribe((data: Genre[]) => {
      this.genres = data;
      this.dataSource.data = data;
      this.dataSource.filterPredicate = function(data, filter): boolean {
        return data.name.toLowerCase().includes(filter) ||
        data.description.toLowerCase().includes(filter)
      };
    });
  }

  delete(id: String){
    this.genreService.delete(id).subscribe((data: any) => {
      this.getAll();
      this.snackBarService.openSnackBar("Successfully deleted genre", "X")
    });
  }

  update(id: string, genre: Genre){
    this.genreService.update(id, genre).subscribe((data: any) => {
      this.getAll();
    });
  }

  openDialog(id: String): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {title: "Delete genre", content: "Are you sure you want to delete this genre?"}
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
