import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Main' },
  { path: 'Main', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRouting { }
