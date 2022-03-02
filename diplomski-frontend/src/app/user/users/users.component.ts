import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { User } from '../user.model';
import { UserService } from 'src/app/user/user.service'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : User[] = [];
  user : User = new User();
  displayedColumns: string[] = ['no', 'username','firstName','lastName', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator ,{static: true}) paginator: MatPaginator;

  constructor(private userService: UserService, public dialog: MatDialog, private snackBarService: SnackBarService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  getAll(){
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
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
    this.userService.delete(id).subscribe((data: any) => {
      this.getAll();
      this.snackBarService.openSnackBar("Successfully deleted user", "X")
    });
  }

  update(id: string, user: User){
    this.userService.update(id, user).subscribe((data: any) => {
      this.getAll();
    });
  }

  openDialog(id: String): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {title: "Delete user", content: "Are you sure you want to delete this user?"}
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
