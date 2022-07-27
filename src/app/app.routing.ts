import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Home' },
  { path: 'Home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'Login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  {
    path: 'Managements',
    loadChildren: () => import('./modules/managements/managements.module').then(m => m.ManagementsModule),
  },
  { path: 'NotFound', loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '**', redirectTo: 'NotFound' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRouting { }
