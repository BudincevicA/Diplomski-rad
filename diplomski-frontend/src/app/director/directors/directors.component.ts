import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Director } from '../director.model';
import { DirectorService } from 'src/app/director/director.service'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css']
})
export class DirectorsComponent implements OnInit {

  directors : Director[] = [];
  director : Director = new Director();
  displayedColumns: string[] = ['no', 'firstName','lastName','actions'];
  dataSource = new MatTableDataSource<Director>(this.directors);

  @ViewChild(MatPaginator ,{static: true}) paginator: MatPaginator;

  constructor(private directorService: DirectorService, public dialog: MatDialog, private snackBarService: SnackBarService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  getAll(){
    this.directorService.getAll().subscribe((data: Director[]) => {
      this.directors = data;
      this.dataSource.data = data;
      this.dataSource.filterPredicate = function(data, filter): boolean {
        return data.firstName.toLowerCase().includes(filter) ||
        data.lastName.toLowerCase().includes(filter)
      };
    });
  }

  delete(id: String){
    this.directorService.delete(id).subscribe((data: any) => {
      this.getAll();
      this.snackBarService.openSnackBar("Successfully deleted director", "X")
    });
  }

  update(id: string, director: Director){
    this.directorService.update(id, director).subscribe((data: any) => {
      this.getAll();
    });
  }

  openDialog(id: String): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {title: "Delete director", content: "Are you sure you want to delete this director?"}
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
