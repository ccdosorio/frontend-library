import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";
import { Book, BookISBN, ElasticSearch } from "@models";

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

  // download file pdf
  downloadFile(bookId: number) {

    const headerDict = {
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf'
    }

    const options = {
      headers: new Headers(headerDict),
    };


    return this.http.get(environment.endpoint + 'user-books/' + bookId, {
      headers: headerDict
    });
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
