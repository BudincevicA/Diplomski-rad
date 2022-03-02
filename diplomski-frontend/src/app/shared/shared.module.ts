import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from '../app-routing.module';

import {FlexLayoutModule} from "@angular/flex-layout";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AccountDataComponent } from '../account-data/account-data.component';
import { AdminSidenavComponent } from '../administrator/admin-sidenav/admin-sidenav.component';
import { UserSidenavComponent } from '../user/user-sidenav/user-sidenav.component';
import { CriticSidenavComponent } from '../critic/critic-sidenav/critic-sidenav.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AdminSidenavComponent,
    AccountDataComponent,
    UserSidenavComponent,
    CriticSidenavComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AdminSidenavComponent,
    AccountDataComponent,
    UserSidenavComponent,
    CriticSidenavComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [ ConfirmationDialogComponent ]
})
export class SharedModule { }
