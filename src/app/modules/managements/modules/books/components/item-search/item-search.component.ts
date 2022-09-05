import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SearchHit } from '@models';
import { ModalBookComponent } from '../modal-book/modal-book.component';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements OnInit {

  @Input() book: SearchHit | undefined;

  constructor(
    private dialog: MatDialog,
    private dialogReference: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
  }

  moreInfo(): void {        
    this.dialogReference = this.dialog.open(ModalBookComponent, {
      width: '50%',
      maxHeight: '80vh',
      data: { data: this.book!.content, action: this }
    });
  }
}
