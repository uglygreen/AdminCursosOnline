import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionRoutingModule } from './ubicacion-routing.module';
import { UbicacionComponent } from './ubicacion.component';
import { UbicacionAddComponent } from './ubicacion-add/ubicacion-add.component';
import { UbicacionListComponent } from './ubicacion-list/ubicacion-list.component';
import { UbicacionEditComponent } from './ubicacion-edit/ubicacion-edit.component';
import { UbicacionDeleteComponent } from './ubicacion-delete/ubicacion-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    UbicacionComponent,
    UbicacionAddComponent,
    UbicacionListComponent,
    UbicacionEditComponent,
    UbicacionDeleteComponent
  ],
  imports: [
    CommonModule,
    UbicacionRoutingModule,


    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule
  ]
})
export class UbicacionModule { }
