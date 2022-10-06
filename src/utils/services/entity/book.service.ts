import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";
import { Book, BookISBN, ElasticSearch, Question } from "@models";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  // get books user
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.endpoint + 'user-books');
  }

  // get book by isbn
  getByISBN(isbn: number): Observable<BookISBN> {
    return this.http.get<BookISBN>(environment.endpoint + 'books/isbn/' + isbn);
  }

  // get user book
  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(environment.endpoint + 'user-books/' + bookId);
  }

  // get questions user book
  getUserBookQuestions(bookId: number, page: number): Observable<Question> {
    return this.http.get<Question>(environment.endpoint + 'user-books/' + bookId + '/questions-page/' + page);
  }

  // create books to user
  createUserBook(body: any): Observable<Book> {
    return this.http.post<Book>(environment.endpoint + 'user-books', body, {});
  }

  // upload pdf book
  uploadFile(bookId: number, file: File) {
    let body = new FormData();
    body.append('book', file);
    return this.http.post(environment.endpoint + 'user-books/' + bookId + '/upload-book', body);
  }

  // view file pdf
  viewPdfFile(bookId: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(environment.endpoint + 'user-books/' + bookId, { headers: headers, responseType: 'blob' });
  }

  searchElastic(payload: any): Observable<ElasticSearch> {
    const params = new HttpParams()
      .set('title', payload.title)
      .set('author_name', payload.author_name)
      .set('publisher', payload.publisher)
      .set('place_name', payload.place_name)
      .set('character_name', payload.character_name)
      .set('isbn', payload.isbn)
      .set('page', payload.page);

    return this.http.get<ElasticSearch>(environment.endpoint + 'books', { params });
  }

}
