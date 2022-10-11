import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { AppConfigService, ClassroomService } from '@services';

@Component({
  selector: 'app-pdf-viewer-classroom',
  templateUrl: './pdf-viewer-classroom.component.html',
  styleUrls: ['./pdf-viewer-classroom.component.scss']
})
export class PdfViewerClassroomComponent implements OnInit {

  bookId: number = 0;
  classroomId: number = 0;
  isFile: boolean = false;
  pdfSrc = '';

  // pdf
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;

  constructor(
    private appConfigService: AppConfigService,
    private route: ActivatedRoute,
    private classroomService: ClassroomService,
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
      this.classroomId = params['classroomId'];
      this.loadPdf();
    });
  }

  loadPdf(): void {
    this.spinner.show();
    this.isFile = false;
    this.classroomService.viewPdfFileClassroom(this.bookId, this.classroomId).subscribe({
      next: (resp) => {
        this.isFile = true;
        var file = new Blob([resp], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        this.pdfSrc = fileURL;
        console.log(this.pdfSrc);

        //this.getBook();
        this.spinner.hide();
      },
      error: () => {
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

}
