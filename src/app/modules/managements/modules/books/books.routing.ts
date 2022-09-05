import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBookComponent } from './components/create-book/create-book.component';
import { MainComponent } from "./components/main/main.component";
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { SearchBookComponent } from './components/search-book/search-book.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Main' },
  { path: 'Main', component: MainComponent },
  { path: 'Create', component: CreateBookComponent },
  { path: 'Search', component: SearchBookComponent },
  { path: 'PdfViewer', component: PdfViewerComponent },
  { path: '**', redirectTo: '/NotFound/Main' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRouting { }
