import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCustomComponent } from './components/button-custom/button-custom.component';
import { PlaceholderEmptyComponent } from './components/placeholder-empty/placeholder-empty.component';
import { CoreModule } from 'core/core.module';

@NgModule({
  declarations: [
    ButtonCustomComponent,
    PlaceholderEmptyComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    ButtonCustomComponent,
    PlaceholderEmptyComponent
  ]
})
export class SharedModule { }
