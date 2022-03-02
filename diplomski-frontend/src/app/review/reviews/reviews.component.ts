import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Review } from '../review.model';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {



  reviews : Review[] = [];
  reviewsAll : Review[]=[];
  review : Review = new Review();
  displayedColumns: string[] = ['no', 'title','reviewtext','actions'];
  dataSource = new MatTableDataSource<Review>(this.reviews);

  @ViewChild(MatPaginator ,{static: true}) paginator: MatPaginator;

  constructor(private authService : AuthService,private userScoreService: ReviewService, public dialog: MatDialog, private snackBarService: SnackBarService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  getAll(){
    this.userScoreService.getAll().subscribe((data: Review[]) => {
      this.reviewsAll = data;
      this.getMyScore();
      this.dataSource.data = this.reviews;
      this.dataSource.filterPredicate = function(data, filter): boolean {
        return data.reviewText.toLowerCase().includes(filter) ||
              data.film.title.toLowerCase().includes(filter)
      };
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getMyScore(){
    const ulogovan = this.authService.getCurrentUser()

    for (let a of this.reviewsAll){
      if(a.accountData.username==ulogovan){
        this.reviews.push(a);
      }
    }

  }

}
