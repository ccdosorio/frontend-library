import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@security';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Intro' },
  // Intre page
  { path: 'Intro', loadChildren: () => import('./modules/intro/intro.module').then(m => m.IntroModule), canActivate: [AuthGuard] },
  // Mantenimientos
  { path: 'Classrooms', loadChildren: () => import('./modules/classes/classes.module').then(m => m.ClassesModule), canActivate: [AuthGuard]  },
  { path: '**', redirectTo: '/NotFound/Main' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementsRouting { }
