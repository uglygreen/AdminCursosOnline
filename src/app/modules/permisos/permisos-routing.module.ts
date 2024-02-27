import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisosComponent } from './permisos.component';
import { PermisoListComponent } from './permiso-list/permiso-list.component';

const routes: Routes = [
  {
    path: '',
    component: PermisosComponent,
    children: [
      {
        path: 'lista',
        component: PermisoListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisosRoutingModule { }
