import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCustomComponent } from './components/button-custom/button-custom.component';



@NgModule({
  declarations: [
    ButtonCustomComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonCustomComponent
  ]
})
export class SharedModule { }
