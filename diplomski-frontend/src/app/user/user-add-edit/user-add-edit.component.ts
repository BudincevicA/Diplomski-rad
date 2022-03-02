import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { FormErrorService } from 'src/app/shared/formError.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { Router } from '@angular/router';
import { Film } from 'src/app/film/film.model';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {

  private username: string;
  private edit = false;
  public user = new User();
  public form = new FormGroup({});
  public likedFilms : Film[];
  public dislikes : Film[];
  private path ="";
  private lista : string[];
  private poslednji = "";
  private praviPath ="";

  constructor(private ruter : Router,private UserService: UserService, private route: ActivatedRoute, public formErrorService: FormErrorService, private snackBarService : SnackBarService) { }

  ngOnInit() {

    this.form = new FormGroup({
      firstName : new FormControl(''),
      lastName : new FormControl('')
    });
    if (this.route.snapshot.paramMap.get("username")) {
      this.edit = true;
      this.username = this.route.snapshot.paramMap.get("username");
      this.UserService.getOneByUsername(this.username).subscribe((data: User) => {
        this.user = data;
        this.user.accountData.profilePicturePath=""
        this.likedFilms=this.user.films;
        this.dislikes=this.user.dislikes
        this.form.patchValue(this.user);
      });
    }
  }

  onSave() {
    if (this.form.invalid) {
      this.formErrorService.markFormGroupTouched(this.form);
    } else {
      const user = this.form.value;
      delete user['accountData']['confirmPassword'];
      if (this.edit) {
        user.accountData.id = this.user.accountData.id;
        this.user = user;
        this.user.films=this.likedFilms;
        this.user.dislikes=this.dislikes;
        this.path=user.accountData.profilePicturePath;
        if(this.path==""){
          user["accountData"]["profilePicturePath"]="images/profile_images/default.png"
        }else{
          user.accountData.profilePicturePath="";
          this.lista = this.path.split("\\");
          this.poslednji = this.lista[this.lista.length-1];
          this.praviPath="images/profile_images/" +this.poslednji;
          user["accountData"]["profilePicturePath"] = this.praviPath
        }


        this.UserService.updateU(this.username, this.user).subscribe();
        this.snackBarService.openSnackBar("Updated profile", "X")
        this.ruter.navigate(['/']);
      } else {
        this.snackBarService.openSnackBar("Added user", "X")
        this.user = user;
        this.UserService.add(this.user).subscribe(_ => {
          this.form.reset();
        });
      }
    }
  }
}
