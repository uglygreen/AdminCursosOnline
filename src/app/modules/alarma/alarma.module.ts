import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlarmaRoutingModule } from './alarma-routing.module';
import { AlarmaComponent } from './alarma.component';
import { AlarmaAddComponent } from './alarma-add/alarma-add.component';
import { AlarmaListComponent } from './alarma-list/alarma-list.component';
import { AlarmaEditComponent } from './alarma-edit/alarma-edit.component';
import { AlarmaDelelteComponent } from './alarma-delete/alarma-delete.component';


@NgModule({
  declarations: [
    AlarmaComponent,
    AlarmaAddComponent,
    AlarmaListComponent,
    AlarmaEditComponent,
    AlarmaDelelteComponent
  ],
  imports: [
    CommonModule,
    AlarmaRoutingModule
  ]
})
export class AlarmaModule { }
