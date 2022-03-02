import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CriticAddEditComponent } from './critic-add-edit/critic-add-edit.component';
import { CriticsComponent } from './critics/critics.component';
import { CriticScoresComponent } from './critic-scores/critic-scores.component';

@NgModule({
  declarations: [
    CriticAddEditComponent,
    CriticsComponent,
    CriticScoresComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class CriticModule { }
