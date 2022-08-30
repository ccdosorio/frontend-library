import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Book } from "@models";
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.scss']
})
export class CardBookComponent implements OnInit {

  @Input() book: Book | undefined;

  constructor(
    private dialog: MatDialog
  ) { }

  openDialogFile(book: Book): void {
    this.dialog.open(UploadFileComponent, {
      width: '500px',
      data: { data: book, action: this }
    });
  }

  ngOnInit(): void {
  }

}
