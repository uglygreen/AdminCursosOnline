import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlarmaRoutingModule } from './alarma-routing.module';
import { AlarmaComponent } from './alarma.component';
import { AlarmaAddComponent } from './alarma-add/alarma-add.component';
import { AlarmaListComponent } from './alarma-list/alarma-list.component';
import { AlarmaEditComponent } from './alarma-edit/alarma-edit.component';
import { AlarmaDeleteComponent } from './alarma-delete/alarma-delete.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    AlarmaComponent,
    AlarmaAddComponent,
    AlarmaListComponent,
    AlarmaEditComponent,
    AlarmaDeleteComponent
  ],
  imports: [
    CommonModule,
    AlarmaRoutingModule,

    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule
  ]
})
export class AlarmaModule { }
