import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentBook } from '@models';

@Component({
  selector: 'app-modal-book',
  templateUrl: './modal-book.component.html',
  styleUrls: ['./modal-book.component.scss']
})
export class ModalBookComponent implements OnInit {

  book: ContentBook | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: ContentBook, action: any },
  ) { }

  ngOnInit(): void {
    this.book = this.data.data;    
  }

  closeModal(): void {
    this.data.action.dialogReference.close();
  }

}
