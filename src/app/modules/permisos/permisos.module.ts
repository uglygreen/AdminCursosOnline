import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisosRoutingModule } from './permisos-routing.module';
import { PermisosComponent } from './permisos.component';
import { PermisoListComponent } from './permiso-list/permiso-list.component';
import { PermisoAddComponent } from './permiso-add/permiso-add.component';
import { PermisoEditComponent } from './permiso-edit/permiso-edit.component';
import { PermisoDeleteComponent } from './permiso-delete/permiso-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    PermisosComponent,
    PermisoListComponent,
    PermisoAddComponent,
    PermisoEditComponent,
    PermisoDeleteComponent
  ],
  imports: [
    CommonModule,
    PermisosRoutingModule,

    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule
  ]
})
export class PermisosModule { }
