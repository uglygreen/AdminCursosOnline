import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  //MIS MODULOS
  {
    path: 'users',
    loadChildren: () =>
    import('../modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'categorias',
    loadChildren: () =>
    import('../modules/categorie/categorie.module').then((m) => m.CategorieModule),
  },
  {
    path: 'permisos',
    loadChildren: () =>
    import('../modules/permisos/permisos.module').then((m) => m.PermisosModule),
  },
  {
    path: 'alarma',
    loadChildren: () =>
    import('../modules/alarma/alarma.module').then((m) => m.AlarmaModule),
  },
  {
    path: 'ubicacion',
    loadChildren: () =>
    import('../modules/ubicacion/ubicacion.module').then((m) => m.UbicacionModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },

];

export { Routing };
