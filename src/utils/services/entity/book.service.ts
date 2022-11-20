import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";
import { Book, BookISBN, BookPage, ElasticSearch, Question, UserBookComment } from "@models";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  // gObtener los libros
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.endpoint + 'user-books');
  }

  // Obtener libro por isbn
  getByISBN(isbn: number): Observable<BookISBN> {
    return this.http.get<BookISBN>(environment.endpoint + 'books/isbn/' + isbn);
  }

  // Obtener libro del usuario por id
  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(environment.endpoint + 'user-books/' + bookId);
  }

  // Obtener las preguntas del libro por página
  getUserBookQuestions(bookId: number, page: number): Observable<Question> {
    return this.http.get<Question>(environment.endpoint + 'user-books/' + bookId + '/questions-page/' + page);
  }

  // Obtener los comentarios del libro
  getUserBookComments(bookId: number, page: number): Observable<UserBookComment[]> {
    return this.http.get<UserBookComment[]>(environment.endpoint + 'user-books/' + bookId + '/comments/' + page);
  }

  // Obtener un libro por su id
  getBook(bookId: number): Observable<BookISBN> {
    return this.http.get<BookISBN>(environment.endpoint + 'books/' + bookId);
  }

  // Obtener el cuántos lirbos hay registrados
  getCountBooks() {
    return this.http.get(environment.endpoint + 'counting/books');
  }


  // crear libros del usuario
  createUserBook(body: any): Observable<Book> {
    return this.http.post<Book>(environment.endpoint + 'user-books', body, {});
  }

  // Crear un comentario
  createComment(bookId: number, page: number, body: any): Observable<UserBookComment> {
    return this.http.post<UserBookComment>(environment.endpoint + 'user-books/' + bookId + '/comments/' + page, body, {});
  }

  // subir un libro (pdf)
  uploadFile(bookId: number, file: File) {
    let body = new FormData();
    body.append('book', file);
    return this.http.post(environment.endpoint + 'user-books/' + bookId + '/upload-book', body);
  }

  // Actualizar la página del libro
  updateBookPage(bookId: number, body: any): Observable<any> {
    return this.http.post<any>(environment.endpoint + 'user-books/' + bookId + '/page', body, {});
  }

  // ver el pdf
  viewPdfFile(bookId: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(environment.endpoint + 'user-books/' + bookId, { headers: headers, responseType: 'blob' });
  }

  // Buscar recomendaciones con ElasticSearch
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
