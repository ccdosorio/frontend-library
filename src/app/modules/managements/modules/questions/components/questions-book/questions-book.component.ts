import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { AppConfigService, BookService } from '@services';
import { BookMultipleChoiceQuestion } from '@models';

@Component({
  selector: 'app-questions-book',
  templateUrl: './questions-book.component.html',
  styleUrls: ['./questions-book.component.scss']
})
export class QuestionsBookComponent implements OnInit {

  numberOfPages: number = 0;
  bookId: number = 0;
  PAGE_DEFAULT: number = 1;
  showEmptyMessage: boolean = false;
  listQuestions: BookMultipleChoiceQuestion[] = [];
  titleBook: string = '';

  // tabs paginator
  tabs: any[] = [];

  constructor(
    private appConfigService: AppConfigService,
    private bookService: BookService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        this.numberOfPages = Number(params['numberPages']);
        this.bookId = Number(params['id']);
        this.getPaginator();
        this.getBook();
        this.getQuestions(this.PAGE_DEFAULT);
      }
    });
  }

  getQuestions(page: number): void {
    this.listQuestions = [];
    this.showEmptyMessage = false;
    this.spinner.show();
    this.bookService.getUserBookQuestions(this.bookId, page)
      .subscribe({
        next: (resp) => {
          if (resp.book_multiple_choice_questions.length === 0) {
            this.showEmptyMessage = true;
          }
          this.listQuestions = resp.book_multiple_choice_questions;
          this.spinner.hide();
        },
        error: _ => {
          this.listQuestions = [];
          this.showEmptyMessage = true;
          this.spinner.hide();
        }
      });
  }

  getBook(): void {
    this.bookService.getBookById(this.bookId).subscribe({
      next: (resp) => this.titleBook = resp.book.title
    });
  }

  getPaginator(): void {
    for (let index = 1; index <= this.numberOfPages; index++) {
      if (index === 1) {
        this.tabs.push({
          tabIndex: index,
          current: true
        })
      } else {
        this.tabs.push({
          tabIndex: index,
          current: false
        })
      }
    }
  }

  changeTab(index: number) {
    this.tabs = this.tabs.map((tab) => tab.tabIndex === index ? { ...tab, current: true } : { ...tab, current: false });
    this.getQuestions(index)
  }

}
