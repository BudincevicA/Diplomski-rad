import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from './auth/role.guard';
import { UserAddEditComponent } from './user/user-add-edit/user-add-edit.component';
import { CriticAddEditComponent } from './critic/critic-add-edit/critic-add-edit.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './user/users/users.component';
import { CriticsComponent } from './critic/critics/critics.component';
import { LoginComponent } from './login/login.component';
import { AdministratorsComponent } from './administrator/administrators/administrators.component';
import { AdministratorAddEditComponent } from './administrator/administrator-add-edit/administrator-add-edit.component';
import { FilmComponent } from './film/film.component';
import { FilmAddEditComponent } from './film/film-add-edit/film-add-edit.component';
import { ActorComponent } from './actor/actor.component';
import { ActorAddEditComponent } from './actor/actor-add-edit/actor-add-edit.component';
import { DirectorComponent } from './director/director.component';
import { DirectorAddEditComponent } from './director/director-add-edit/director-add-edit.component';
import { GenreComponent } from './genre/genre.component';
import { GenreAddEditComponent } from './genre/genre-add-edit/genre-add-edit.component';
import { FilmsComponent } from './film/films/films.component';
import { DirectorsComponent } from './director/directors/directors.component';
import { ActorsComponent } from './actor/actors/actors.component';
import { GenresComponent } from './genre/genres/genres.component';
import { ReviewComponent } from './review/review.component';
import { ReviewAddEditComponent } from './review/review-add-edit/review-add-edit.component';
import { UserLikedComponent } from './user/user-liked/user-liked.component';
import { UserRecommendedComponent } from './user/user-recommended/user-recommended.component';
import { ForumComponent } from './forum/forum.component';
import { ForumTopicAddEditComponent } from './forum/forum-topic-add-edit/forum-topic-add-edit.component';
import { ForumTopicComponent } from './forum/forum-topic/forum-topic.component';
import { UserScoresComponent } from './user/user-scores/user-scores.component';
import { CriticScoresComponent } from './critic/critic-scores/critic-scores.component';
import { ReviewsComponent } from './review/reviews/reviews.component';
import { FilmTopComponent } from './film/film-top/film-top.component';
import { UserDislikedComponent } from './user/user-disliked/user-disliked.component';
import { ChatComponent } from './chat/chat.component';
import { OlMapComponent } from './ol-map/ol-map.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  { path: 'users', component: UsersComponent },
  { path: 'liked', component:UserLikedComponent},
  { path: 'disliked',component:UserDislikedComponent},
  { path: 'recommended', component:UserRecommendedComponent},
  { path: 'userscores',component:UserScoresComponent},
  { path: 'criticscores',component:CriticScoresComponent},
  { path: 'criticreviews',component:ReviewsComponent},
  { path: 'edit/user/:username', component: UserAddEditComponent },
  { path: 'register/user', component: UserAddEditComponent },
  { path: 'filmtop', component:FilmTopComponent},

  { path: 'critics', component: CriticsComponent },
  { path: 'edit/critic/:username', component: CriticAddEditComponent },
  {
        path: 'register/critic', component: CriticAddEditComponent,
        canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_ADMINISTRATOR'] }
  },


  { path: 'administrators', component: AdministratorsComponent },
  { path: 'edit/administrator/:username', component: AdministratorAddEditComponent },
  {
        path: 'register/administrator', component: AdministratorAddEditComponent,
        canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_ADMINISTRATOR'] }
  },

  {path:'films',component: FilmsComponent},
  {path :'edit/film/:id', component : FilmAddEditComponent},
  {path:'film/:id',component:FilmComponent},
  {
          path: 'register/film', component: FilmAddEditComponent,
        canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_ADMINISTRATOR'] }
  },

  {path:'forum/:id',component:ForumComponent},
  {path:'forumtopic/:id',component:ForumTopicComponent},
  {path:'register/forumtopic/:id',component:ForumTopicAddEditComponent},

  {path:'actors',component:ActorsComponent},
  {path:'actor/:id',component:ActorComponent},
  {path:'edit/actor/:id',component:ActorAddEditComponent},
  {
          path: 'register/actor', component: ActorAddEditComponent,
        canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_ADMINISTRATOR'] }
  },

  
  {path:'review/:id',component:ReviewComponent},
  {path:'edit/review/:id',component:ReviewAddEditComponent},
  
      {path: 'register/review', component: ReviewAddEditComponent},


  {path:'directors',component:DirectorsComponent},
  {path:'director/:id',component:DirectorComponent},
  {path:'edit/director/:id',component:DirectorAddEditComponent},
  {
          path: 'register/director', component: DirectorAddEditComponent,
        canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_ADMINISTRATOR'] }
  },

  {path:'genres',component:GenresComponent},
  {path:'genre/:id',component:GenreComponent},
  {path:'edit/genre/:id',component:GenreAddEditComponent},
  {
          path: 'register/genre', component: GenreAddEditComponent,
        canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_ADMINISTRATOR'] }
  },

  //{ path: 'users', component: UsersComponent, outlet: "adminSidenav"},
  { path: 'chat', component: ChatComponent },
  { path: 'map/:id', component:OlMapComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
