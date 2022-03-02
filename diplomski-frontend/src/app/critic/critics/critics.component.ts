import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Critic } from '../critic.model';
import { CriticService } from '../critic.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-critics',
  templateUrl: './critics.component.html',
  styleUrls: ['./critics.component.css']
})
export class CriticsComponent implements OnInit {

  critics : Critic[] = [];
  critic : Critic = new Critic();
  displayedColumns: string[] = ['no', 'username','firstName','lastName', 'actions'];
  dataSource = new MatTableDataSource<Critic>(this.critics);

  @ViewChild(MatPaginator ,{static: true}) paginator: MatPaginator;

  constructor(private criticService: CriticService, public dialog: MatDialog, private snackBarService: SnackBarService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  getAll(){
    this.criticService.getAll().subscribe((data: Critic[]) => {
      this.critics = data;
      this.dataSource.data = data;
      this.dataSource.filterPredicate = function(data, filter): boolean {
        return data.accountData.email.toLowerCase().includes(filter) || 
                data.lastName.toLowerCase().includes(filter) || 
                data.firstName.toLowerCase().includes(filter) ||
                data.accountData.username.toLowerCase().includes(filter);
      };
    });
  }

  delete(id: String){
    this.criticService.delete(id).subscribe((data: any) => {
      this.getAll();
      this.snackBarService.openSnackBar("Successfully deleted critic", "X")
    });
  }

  update(id: string, critic: Critic){
    this.criticService.update(id, critic).subscribe((data: any) => {
      this.getAll();
    });
  }

  openDialog(id: String): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {title: "Delete critic", content: "Are you sure you want to delete this critic?"}
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
