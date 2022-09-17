import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './components/main/main.component';
import { ClassesRouting } from './classes.routing';
import { CoreModule } from 'core/core.module';
import { CardClassComponent } from './components/card-class/card-class.component';
import { SharedModule } from '@shared';
import { CreateClassroomComponent } from './components/create-classroom/create-classroom.component';
import { SendInvitationComponent } from './components/send-invitation/send-invitation.component';

@NgModule({
  declarations: [
    MainComponent,
    CardClassComponent,
    CreateClassroomComponent,
    SendInvitationComponent
  ],
  imports: [
    CommonModule,
    ClassesRouting,
    CoreModule,
    SharedModule
  ]
})
export class ClassesModule { }
