import {Component, Input, OnInit} from '@angular/core';
import {Book, BookISBN} from "@models";

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.scss']
})
export class CardBookComponent implements OnInit {

  @Input() book: Book | undefined;

  constructor() { }

  upload(): void {
    console.log('upload');
    
  }

  ngOnInit(): void {
  }

}
