import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import * as feather from 'feather-icons';

import { AppConfigService, BookService, ClassroomService, UserService } from '@services';
import { ClassroomBook, BookMultipleChoiceQuestion, UserInfo, CreateStudentBookAnswer, Answer, UserBookComment } from '@models';
import { SplitPipe } from '@pipes';
import { SweetAlertMessage } from '@functions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pdf-viewer-classroom',
  templateUrl: './pdf-viewer-classroom.component.html',
  styleUrls: ['./pdf-viewer-classroom.component.scss']
})
export class PdfViewerClassroomComponent implements OnInit {

  bookId: number = 0;
  book: ClassroomBook | undefined;
  classroomId: number = 0;
  isFile: boolean = false;
  user: UserInfo | undefined;
  progress: number = 0;
  isAssignment: boolean = false;
  routeClassroom: string = '';

  // pdf
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;
  pdfSrc = '';

  // questions
  listQuestions: BookMultipleChoiceQuestion[] = [];
  isQuestions: boolean = false;

  // answers
  studentAnswers: CreateStudentBookAnswer[] = [];
  studentResults: Answer[] = [];
  isResults: boolean = false;

  // comments
  comments: UserBookComment[] = [];
  isComments: boolean = true;
  loading: boolean = false;

  formComment: FormGroup = this.fb.group({
    comment: [null, [Validators.required, Validators.minLength(10)]]
  });

  constructor(
    private appConfigService: AppConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private classroomService: ClassroomService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private bookService: BookService,
    private fb: FormBuilder
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
    feather.replace();
    this.route.params.subscribe((params) => {
      this.bookId = params['bookId'];
      this.classroomId = params['classroomId'];
      this.getUser();
      this.getBook();
      if (this.route.snapshot.routeConfig?.path === 'PdfViewerAsignment/:classroomId/:bookId') {
        this.isAssignment = true;
        this.routeClassroom = '/Managements/Classrooms/Detail/Assignment';
      } else {
        this.routeClassroom = '/Managements/Classrooms/Detail';
      }
      setTimeout(() => {
        this.loadPdf();
      }, 500);
    });
  }

  loadPdf(): void {
    this.isFile = false;
    this.classroomService.viewPdfFileClassroom(this.bookId, this.classroomId).subscribe({
      next: (resp) => {
        this.isFile = true;
        const file = new Blob([resp], { type: 'application/pdf' });
        this.pdfSrc = URL.createObjectURL(file);
        this.spinner.hide();
      },
      error: () => {
        this.isFile = false;
        this.spinner.hide();
      }
    })
  }

  getBook(): void {
    this.classroomService.getBookByClassroom(this.classroomId, this.bookId).subscribe({
      next: (resp) => {
        this.book = resp;
        this.getPage();
        this.getProgress();
      }
    });
  }

  getUser(): void {
    this.spinner.show();
    this.userService.getUser()
      .subscribe({
        next: resp => {
          this.user = resp;
        }
      });
  }

  getQuestions(): void {
    const splitPipe = new SplitPipe();
    this.listQuestions = [];
    this.spinner.show();
    this.bookService.getUserBookQuestions(this.book!.user_book.id, this.page)
      .subscribe({
        next: (resp) => {
          if (resp.book_multiple_choice_questions.length > 0) {
            this.isQuestions = true;
            this.listQuestions = resp.book_multiple_choice_questions;
            this.listQuestions.map((item, i) => {
              return this.listQuestions[i].options = splitPipe.transform(item.options);
            })
          }
          this.spinner.hide();
        },
        error: _ => {
          this.listQuestions = [];
          this.isQuestions = false;
          this.page++;
          this.spinner.hide();
        }
      });
  }

  getPage(): void {
    this.classroomService.getStudentBookPage(this.classroomId, this.user!.id, this.book!.user_book.book.id)
      .subscribe({
        next: resp => {
          this.page = resp.page_progress;
          this.getComments();
        }
      });
  }

  getProgress(): void {
    this.classroomService.getStudentBookProgressRate(this.classroomId, this.user!.id, this.book!.user_book.book.id)
      .subscribe({
        next: resp => this.progress = resp.book_progress_rate
      });
  }

  getComments(): void {
    this.bookService.getUserBookComments(this.book!.user_book.id, this.page).subscribe({
      next: resp => {
        if (resp.length === 0) this.isComments = false;
        this.comments = resp;
      },
      error: _ => this.isComments = false
    })
  }

  saveComment(): void {
    if (this.formComment.invalid) return;
    this.loading = true;
    const PAYLOAD = {
      comment: this.formComment.get('comment')!.value.replace("\n", " ").trim()
    }

    this.bookService.createComment(this.book!.user_book.id, this.page, PAYLOAD).subscribe({
      next: _ => {
        this.formComment.get('comment')!.setValue(null);
        this.getComments();
        this.loading = false;
      }, error: error => {
        SweetAlertMessage('error', 'Error', error.error.message);
        this.loading = false;
      }
    });
  }

  updatePage(): void {
    const PAYLOAD = {
      book_page: this.page
    };
    this.classroomService.updateStudentBookPage(this.classroomId, this.user!.id, this.book!.user_book.book.id, PAYLOAD)
      .subscribe({
        next: _ => {
          this.getProgress();
          this.getComments();
          if (this.page === this.totalPages) {
            this.router.navigate(['/Managements/Classrooms/Detail/', this.classroomId]);
          }
        }
      });
  }

  saveAnswers(): void {
    this.studentAnswers.shift();
    if (this.studentAnswers.length !== this.listQuestions.length) {
      SweetAlertMessage('error', 'Error', 'Por favor responde todas las preguntas para continuar.');
      return;
    }
    this.classroomService.createStudentBookAnswer(this.classroomId, this.user!.id, this.book!.user_book.book.id, this.studentAnswers)
      .subscribe({
        next: resp => {
          this.isQuestions = false;
          this.studentResults = resp;
          this.isResults = true;
          // reset
          this.listQuestions = [];
          this.studentAnswers = [];
          this.page++;
          this.updatePage();
        },
        error: error => {
          SweetAlertMessage('error', 'Error', error.error.message);
          this.isQuestions = false;
        }
      });
  }

  afterLoadComplete(pdfData: any): void {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  prevPage(): void {
    this.page--;
    this.updatePage();
  }

  generateAnswers(question: BookMultipleChoiceQuestion, answer: string): void {
    this.studentAnswers[question.position] = {
      answer: answer,
      book_multiple_choice_question_id: question.id
    };
  }

  toPaintOption(position: number, questionId: number, option: string): boolean {
    if (this.studentAnswers.length > 0) {
      if (this.studentAnswers[position] !== undefined &&
        this.studentAnswers[position].answer === option &&
        this.studentAnswers[position].book_multiple_choice_question_id === questionId
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  closeModalResults(): void {
    this.isResults = false;
    this.studentResults = [];
  }

}
