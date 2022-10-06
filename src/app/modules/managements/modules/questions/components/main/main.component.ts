import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import * as feather from 'feather-icons';

import { AppConfigService, BookService } from '@services';
import { Book } from '@models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  listBooks: Book[] = [];
  showEmptyMessage: boolean = false;

  displayedColumns: string[] = ['id', 'title', 'numberOfPages', 'actions'];
  dataSource = new MatTableDataSource<Book>([]);

  constructor(
    private appConfigService: AppConfigService,
    private spinner: NgxSpinnerService,
    private bookService: BookService
  ) {
    this.appConfigService.setConfig({
      layout: {
        generic_container: { visible: false },
        sidenav: { visible: true },
        toolbar: { visible: false }
      }
    });
  }

  ngOnInit(): void {
    feather.replace();
    this.getBooks();
  }

  getBooks(): void {
    this.spinner.show();
    this.bookService.getBooks()
      .subscribe({
        next: (resp) => {
          if (resp.length === 0) {
            this.showEmptyMessage = true;
          }
          this.dataSource = new MatTableDataSource<Book>(resp);
          this.listBooks = resp;
          this.spinner.hide();
        },
        error: () => {
          this.showEmptyMessage = false
          this.spinner.hide();
        }
      });
  }

}
