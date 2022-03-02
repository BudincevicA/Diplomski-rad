import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Actor } from '../actor.model';
import { ActorService } from 'src/app/actor/actor.service'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  actors : Actor[] = [];
  actor : Actor = new Actor();
  displayedColumns: string[] = ['no', 'firstName','lastName','actions'];
  dataSource = new MatTableDataSource<Actor>(this.actors);

  @ViewChild(MatPaginator ,{static: true}) paginator: MatPaginator;

  constructor(private actorService: ActorService, public dialog: MatDialog, private snackBarService: SnackBarService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  getAll(){
    this.actorService.getAll().subscribe((data: Actor[]) => {
      this.actors = data;
      this.dataSource.data = data;
      this.dataSource.filterPredicate = function(data, filter): boolean {
        return data.firstName.toLowerCase().includes(filter) ||
        data.lastName.toLowerCase().includes(filter)
      };
    });
  }

  delete(id: String){
    this.actorService.delete(id).subscribe((data: any) => {
      this.getAll();
      this.snackBarService.openSnackBar("Successfully deleted actor", "X")
    });
  }

  update(id: string, actor: Actor){
    this.actorService.update(id, actor).subscribe((data: any) => {
      this.getAll();
    });
  }

  openDialog(id: String): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {title: "Delete actor", content: "Are you sure you want to delete this actor?"}
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
