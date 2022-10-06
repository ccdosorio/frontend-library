import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { QuestionsBookComponent } from './components/questions-book/questions-book.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'Main' },
    { path: 'Main', component: MainComponent },
    { path: 'Book/:id/:numberPages', component: QuestionsBookComponent },
    { path: '**', redirectTo: '/NotFound/Main' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionsRouting { }
