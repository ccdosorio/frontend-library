import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './components/main/main.component';
import { ClassesRouting } from './classes.routing';
import { CoreModule } from 'core/core.module';
import { CardClassComponent } from './components/card-class/card-class.component';
import { SharedModule } from '@shared';
import { CreateClassroomComponent } from './components/create-classroom/create-classroom.component';
import { SendInvitationComponent } from './components/send-invitation/send-invitation.component';
import { DetailClassroomComponent } from './components/detail-classroom/detail-classroom.component';
import { ListClassroomBooksComponent } from './components/list-classroom-books/list-classroom-books.component';
import { CreateClassroomBookComponent } from './components/create-classroom-book/create-classroom-book.component';
import { ListClassroomStudentsComponent } from './components/list-classroom-students/list-classroom-students.component';
import { PdfViewerClassroomComponent } from './components/pdf-viewer-classroom/pdf-viewer-classroom.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SplitPipe, SplitSpacePipe } from '@pipes';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { ListClassroomBookStudentsComponent } from './components/list-classroom-book-students/list-classroom-book-students.component';
import { StudentsAnswersComponent } from './components/students-answers/students-answers.component';
import { DetailAssignmentComponent } from './components/detail-assignment/detail-assignment.component';

@NgModule({
  declarations: [
    MainComponent,
    CardClassComponent,
    CreateClassroomComponent,
    SendInvitationComponent,
    DetailClassroomComponent,
    ListClassroomBooksComponent,
    CreateClassroomBookComponent,
    ListClassroomStudentsComponent,
    PdfViewerClassroomComponent,
    SplitPipe,
    SplitSpacePipe,
    AssignmentsComponent,
    ListClassroomBookStudentsComponent,
    StudentsAnswersComponent,
    DetailAssignmentComponent
  ],
  imports: [
    CommonModule,
    ClassesRouting,
    CoreModule,
    SharedModule,
    PdfViewerModule,
  ]
})
export class ClassesModule { }
