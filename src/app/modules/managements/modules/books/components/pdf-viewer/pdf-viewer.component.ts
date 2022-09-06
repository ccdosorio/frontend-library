import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AppConfigService, BookService } from '@services';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { Book } from '@models';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  pdfSrc = '';
  bookId: number = 0;
  isFile: boolean = false;

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
        generic_container: { visible: false },
        sidenav: { visible: true },
        toolbar: { visible: false }
      }
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
        this.spinner.hide();
      },
      error: (error) => {
        this.isFile = false;
        this.spinner.hide();
      }
    })
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  openDialogFile(): void {
    this.dialog.open(UploadFileComponent, {
      width: '500px',
      data: { bookId: this.bookId, action: this }
    });
  }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['bookId'];
      this.loadPdf();
    });
  }

}
