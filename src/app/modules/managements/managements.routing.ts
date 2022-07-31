import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Intro' },
  // Intre page
  { path: 'Intro', loadChildren: () => import('./modules/intro/intro.module').then(m => m.IntroModule) },
  // Mantenimientos
  { path: '**', redirectTo: '/NotFound/Main' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementsRouting { }
