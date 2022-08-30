import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";
import { Book, BookISBN } from "@models";

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

}
