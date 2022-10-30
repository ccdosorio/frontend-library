import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AssignmentsComponent } from './components/assignments/assignments.component';

import { CreateClassroomComponent } from './components/create-classroom/create-classroom.component';
import { DetailAssignmentComponent } from './components/detail-assignment/detail-assignment.component';
import { DetailClassroomComponent } from './components/detail-classroom/detail-classroom.component';
import { ListClassroomBookStudentsComponent } from './components/list-classroom-book-students/list-classroom-book-students.component';
import { MainComponent } from "./components/main/main.component";
import { PdfViewerClassroomComponent } from './components/pdf-viewer-classroom/pdf-viewer-classroom.component';
import { StudentsAnswersComponent } from './components/students-answers/students-answers.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'Main' },
    { path: 'Main', component: MainComponent },
    { path: 'Create', component: CreateClassroomComponent },
    { path: 'Edit/:id', component: CreateClassroomComponent },
    { path: 'Detail/:id', component: DetailClassroomComponent },
    { path: 'Detail/Assignment/:id', component: DetailAssignmentComponent },
    { path: 'PdfViewerClassroom/:classroomId/:bookId', component: PdfViewerClassroomComponent },
    { path: 'PdfViewerAsignment/:classroomId/:bookId', component: PdfViewerClassroomComponent },
    { path: 'Students/:classroomId/:bookId', component: ListClassroomBookStudentsComponent },
    { path: 'Students/Answers/:classroomId/:userId/:bookId', component: StudentsAnswersComponent },
    { path: 'Assignments', component: AssignmentsComponent },
    { path: '**', redirectTo: '/NotFound/Main' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassesRouting { }
