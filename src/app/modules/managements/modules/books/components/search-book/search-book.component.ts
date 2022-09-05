import { Component, OnInit } from '@angular/core';

import * as feather from 'feather-icons';

import { AppConfigService, BookService } from '@services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ElasticSearch } from '@models';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss']
})
export class SearchBookComponent implements OnInit {

  currentSearch: ElasticSearch | undefined;
  showEmptyMessage: boolean = false;

  formSearch: FormGroup = this.fb.group({
    title: [''],
    author_name: [''],
    publisher: [''],
    place_name: [''],
    character_name: [''],
    subject: [''],
    isbn: [''],
    page: ['']
  });

  constructor(
    private appConfigService: AppConfigService,
    private bookService: BookService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {
    this.appConfigService.setConfig({
      layout: {
        generic_container: { visible: false },
        sidenav: { visible: true },
        toolbar: { visible: false }
      }
    });
  }

  search(): void {
    this.currentSearch = undefined;
    this.spinner.show();

    this.bookService.searchElastic(this.formSearch.value)
      .subscribe({
        next: (resp) => {
          if (resp.total_hits === 0) {
            this.showEmptyMessage = true;
          } else {
            this.showEmptyMessage = false;
          }
          this.currentSearch = resp;
          this.spinner.hide();
        },
        error: () => {
          this.spinner.hide();
          this.showEmptyMessage = true;
        }
      });
  }

  ngOnInit(): void {
    feather.replace();
  }

}
