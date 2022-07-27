import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GenericContainerComponent } from './components/generic-container/generic-container.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AngularMaterialModule } from 'core/angular-material/angular-material.module';


@NgModule({
  declarations: [
    GenericContainerComponent,
    SidenavComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ],
  exports: [
    GenericContainerComponent,
    SidenavComponent,
    ToolbarComponent
  ]
})
export class LayoutModule { }
