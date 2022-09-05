import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './components/main/main.component';
import { CoreModule } from "../../../../../core/core.module";
import { SharedModule } from "@shared";
import { BooksRouting } from "./books.routing";
import { CardBookComponent } from './components/card-book/card-book.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { ImgBookComponent } from './components/img-book/img-book.component';
import { SearchBookComponent } from './components/search-book/search-book.component';

@NgModule({
  declarations: [
    MainComponent,
    CardBookComponent,
    CreateBookComponent,
    UploadFileComponent,
    ImgBookComponent,
    SearchBookComponent
  ],
  imports: [
    CommonModule,
    BooksRouting,
    CoreModule,
    SharedModule
  ]
})
export class BooksModule { }
