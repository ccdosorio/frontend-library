import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Book } from "@models";
import { BookService } from '@services';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.scss']
})
export class CardBookComponent implements OnInit {

  @Input() book: Book | undefined;

  constructor(
    private dialog: MatDialog,
    private bookService: BookService
  ) { }

  openDialogFile(book: Book): void {
    this.dialog.open(UploadFileComponent, {
      width: '500px',
      data: { data: book, action: this }
    });
  }

  downloadPdf(book: Book): void {
    this.bookService.downloadFile(book.id)
    .subscribe({
      next: (resp) => {
        console.log(resp);
        
      },
      error: (error) => {
        console.log(error);
        
      }
    });
    
  }

  ngOnInit(): void { }

}
