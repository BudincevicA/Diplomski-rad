import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UsersComponent } from './users/users.component';
import { UserLikedComponent } from './user-liked/user-liked.component';
import { UserRecommendedComponent } from './user-recommended/user-recommended.component';
import { UserScoresComponent } from './user-scores/user-scores.component';
import { UserDislikedComponent } from './user-disliked/user-disliked.component';


@NgModule({
  declarations: [
    UserAddEditComponent,
    UsersComponent,
    UserLikedComponent,
    UserRecommendedComponent,
    UserScoresComponent,
    UserDislikedComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UserModule { }