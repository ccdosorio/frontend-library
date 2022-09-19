import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'Main' },
    { path: 'Main', component: MainComponent },
    { path: '**', redirectTo: '/NotFound/Main' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionsRouting { }
