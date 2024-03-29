import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@security';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Intro' },
  // Intro page
  { path: 'Intro', loadChildren: () => import('./modules/intro/intro.module').then(m => m.IntroModule), canActivate: [AuthGuard] },
  // Maintenances
  { path: 'Classrooms', loadChildren: () => import('./modules/classes/classes.module').then(m => m.ClassesModule), canActivate: [AuthGuard] },
  { path: 'Profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
  { path: 'Questions', loadChildren: () => import('./modules/questions/questions.module').then(m => m.QuestionsModule), canActivate: [AuthGuard] },
  { path: 'Books', loadChildren: () => import('./modules/books/books.module').then(m => m.BooksModule), canActivate: [AuthGuard] },
  { path: 'Games', loadChildren: () => import('./modules/games/games.module').then(m => m.GamesModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/NotFound/Main' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementsRouting { }
