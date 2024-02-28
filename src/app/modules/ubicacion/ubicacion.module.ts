import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionRoutingModule } from './ubicacion-routing.module';
import { UbicacionComponent } from './ubicacion.component';
import { UbicacionAddComponent } from './ubicacion-add/ubicacion-add.component';
import { UbicacionListComponent } from './ubicacion-list/ubicacion-list.component';
import { UbicacionEditComponent } from './ubicacion-edit/ubicacion-edit.component';
import { UbicacionDeleteComponent } from './ubicacion-delete/ubicacion-delete.component';


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
    UbicacionRoutingModule
  ]
})
export class UbicacionModule { }
