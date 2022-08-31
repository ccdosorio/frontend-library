import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";

import { AppConfigService, BookService } from "@services";
import { Book } from "@models";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  listBooks: Book[] = [];
  isData: boolean = false;

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

  getBooks(): void {
    this.spinner.show();
    this.bookService.getBooks()
      .subscribe({
        next: (resp) => {
          this.listBooks = resp;
          this.isData = true;
          this.spinner.hide();
        },
        error: () => {
          this.isData = true;
          this.spinner.hide();
        }
      });
  }

  ngOnInit(): void {
    this.getBooks();
  }

}
