import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceholderEmptyComponent } from './components/placeholder-empty/placeholder-empty.component';
import { CoreModule } from 'core/core.module';

@NgModule({
  declarations: [
    PlaceholderEmptyComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    PlaceholderEmptyComponent
  ]
})
export class SharedModule { }
