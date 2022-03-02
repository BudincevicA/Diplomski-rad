import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  title = "Filmoteka";
  isLoggedIn = false;
  public loggedUserUsername: String;
  private loggedUserRoles: String[];
  public loggedUserType: String;

  private loggedInSubcription : Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loggedInSubcription = this.authService.loggedInStatusChanged.subscribe(
      (status: boolean)=>{
        this.isLoggedIn = status;
        this.setUserForEditProfile(); // on log in
      }
    );
    this.setUserForEditProfile(); // when refresh page while the user is logged in
  }

  setUserForEditProfile(){
    this.loggedUserUsername = this.authService.getCurrentUser();
    this.loggedUserRoles = this.authService.getCurrentRoles();
    this.loggedUserRoles.forEach(role => {
      if(role == "ROLE_ADMINISTRATOR"){
        this.loggedUserType = "administrator";
      }
      else if(role == "ROLE_CRITIC"){
        this.loggedUserType = "critic";
      }
      else if(role == "ROLE_USER"){
        this.loggedUserType = "user";
      }
    });
  }

  onLogout(){
    this.authService.logout();
  }
  
  ngOnDestroy(){
    this.loggedInSubcription.unsubscribe();
  }

}
