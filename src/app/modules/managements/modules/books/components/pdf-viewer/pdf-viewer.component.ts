import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { NgxSpinnerService } from 'ngx-spinner';

import { Book } from '@models';
import { AppConfigService, BookService } from '@services';
import { UploadFileComponent } from '../upload-file/upload-file.component';

const FileSaver = require('file-saver');

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  pdfSrc = '';
  bookId: number = 0;
  isFile: boolean = false;
  book: Book | undefined;

  // pdf
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;

  constructor(
    private appConfigService: AppConfigService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {
    this.appConfigService.setConfig({
      layout: {
        generic_container: { visible: true },
        sidenav: { visible: false },
        toolbar: { visible: false }
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['bookId'];
      this.loadPdf();
    });
  }

  loadPdf(): void {
    this.spinner.show();
    this.isFile = false;
    this.bookService.viewPdfFile(this.bookId).subscribe({
      next: (resp) => {
        this.isFile = true;
        var file = new Blob([resp], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        this.pdfSrc = fileURL;
        this.getBook();
        this.spinner.hide();
      },
      error: () => {
        this.isFile = false;
        this.spinner.hide();
      }
    })
  }

  getBook(): void {
    this.bookService.getBookById(this.bookId).subscribe({
      next: (resp) => this.book = resp
    });
  }

  afterLoadComplete(pdfData: any): void {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage(): void {
    this.page++;
  }

  prevPage(): void {
    this.page--;
  }

  openDialogFile(): void {
    this.dialog.open(UploadFileComponent, {
      width: '500px',
      data: { bookId: this.bookId, action: this }
    });
  }

  download(): void {
    FileSaver.saveAs(this.pdfSrc, this.book?.book.title);
  }

  updatePage(): void {
    const PAYLOAD = {
      book_page: this.page
    };
    this.bookService.updateBookPage(this.bookId, PAYLOAD)
      .subscribe({
        next: _ => {
          //this.getProgress();
          if (this.page === this.totalPages) {
            //this.router.navigate(['/Managements/Classrooms/Detail/', this.classroomId]);
          }
        }
      });
  }

}
