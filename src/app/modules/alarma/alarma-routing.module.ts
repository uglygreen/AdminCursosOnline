import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmaComponent } from './alarma.component';
import { AlarmaListComponent } from './alarma-list/alarma-list.component';

const routes: Routes = [
  {
    path: '',
    component: AlarmaComponent,
    // children: [
    //   {
    //     path: 'lista',
    //     component: AlarmaListComponent
    //   }
    // ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlarmaRoutingModule { }
