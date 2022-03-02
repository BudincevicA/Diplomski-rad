import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdministratorModule } from './administrator/administrator.module';
import { SharedModule } from './shared/shared.module';
import { GenreComponent } from './genre/genre.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FilmComponent } from './film/film.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { UrlSerializer } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LowerCaseUrlSerializer } from './lower-case-url-serializer';
import { LoginErrorDialogComponenet } from './login/loginErrorDialog.component';
import { DirectorComponent } from './director/director.component';
import { ReviewComponent } from './review/review.component';
import { FileComponent } from './file/file.component';
import {UserModule} from './user/user.module';
import {CriticModule} from './critic/critic.module';
import { MaterialModule } from './shared/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {StyleUtils,StylesheetMap,MediaMarshaller,ɵMatchMedia,BreakPointRegistry,PrintHook,LayoutStyleBuilder,FlexStyleBuilder,ShowHideStyleBuilder,FlexOrderStyleBuilder} from "@angular/flex-layout";
import { ActorComponent } from './actor/actor.component';
import { FilmsComponent } from './film/films/films.component';
import { FilmAddEditComponent } from './film/film-add-edit/film-add-edit.component';
import { ActorAddEditComponent } from './actor/actor-add-edit/actor-add-edit.component';
import { DirectorAddEditComponent } from './director/director-add-edit/director-add-edit.component';
import { GenreAddEditComponent } from './genre/genre-add-edit/genre-add-edit.component';
import { ActorsComponent } from './actor/actors/actors.component';
import { GenresComponent } from './genre/genres/genres.component';
import { DirectorsComponent } from './director/directors/directors.component';
import { ReviewAddEditComponent } from './review/review-add-edit/review-add-edit.component';
import { UserScoreComponent } from './film/user-score/user-score.component';
import { CriticScoreComponent } from './film/critic-score/critic-score.component';
import { ForumComponent } from './forum/forum.component';
import { ForumTopicComponent } from './forum/forum-topic/forum-topic.component';
import { ForumMessageComponent } from './forum/forum-topic/forum-message/forum-message.component';
import { ForumTopicAddEditComponent } from './forum/forum-topic-add-edit/forum-topic-add-edit.component';
import { InformationDialogComponent } from './forum/forum-topic/information-dialog/information-dialog.component';
import { ReviewsComponent } from './review/reviews/reviews.component';
import { FilmTopComponent } from './film/film-top/film-top.component';
import { DatePipe } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { OlMapComponent } from './ol-map/ol-map.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GenreComponent,
    LoginErrorDialogComponenet,
    ToolbarComponent,
    FilmComponent,
    DirectorComponent,
    ReviewComponent,
    FileComponent,
    ActorComponent,
    FilmsComponent,
    FilmAddEditComponent,
    ActorAddEditComponent,
    DirectorAddEditComponent,
    GenreAddEditComponent,
    ActorsComponent,
    GenresComponent,
    DirectorsComponent,
    ReviewAddEditComponent,
    UserScoreComponent,
    CriticScoreComponent,
    ForumComponent,
    ForumTopicComponent,
    ForumMessageComponent,
    ForumTopicAddEditComponent,
    InformationDialogComponent,
    ReviewsComponent,
    FilmTopComponent,
    ChatComponent,
    OlMapComponent
  ],
  imports: [
    BrowserModule,
    AdministratorModule,
    CriticModule,
    UserModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },[DatePipe],
    {provide: UrlSerializer, useClass: LowerCaseUrlSerializer},
    [StyleUtils,StylesheetMap,MediaMarshaller,ɵMatchMedia,BreakPointRegistry,PrintHook,LayoutStyleBuilder,FlexStyleBuilder,ShowHideStyleBuilder,FlexOrderStyleBuilder]
],
  entryComponents:[LoginErrorDialogComponenet,InformationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
