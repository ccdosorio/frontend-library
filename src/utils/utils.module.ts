import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitSpacePipe } from './pipes/split-space.pipe';
import { EmptyValuePipe } from './pipes/empty-value.pipe';

@NgModule({
  declarations: [
    SplitSpacePipe,
    EmptyValuePipe
  ],
  imports: [
    CommonModule
  ]
})
export class UtilsModule { }
