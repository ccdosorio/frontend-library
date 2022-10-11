import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { CreateClassroomComponent } from './components/create-classroom/create-classroom.component';
import { DetailClassroomComponent } from './components/detail-classroom/detail-classroom.component';
import { MainComponent } from "./components/main/main.component";
import { PdfViewerClassroomComponent } from './components/pdf-viewer-classroom/pdf-viewer-classroom.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'Main' },
    { path: 'Main', component: MainComponent },
    { path: 'Create', component: CreateClassroomComponent },
    { path: 'Edit/:id', component: CreateClassroomComponent },
    { path: 'Detail/:id', component: DetailClassroomComponent },
    { path: 'PdfViewerClassroom/:classroomId/:bookId', component: PdfViewerClassroomComponent },
    { path: '**', redirectTo: '/NotFound/Main' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassesRouting { }
