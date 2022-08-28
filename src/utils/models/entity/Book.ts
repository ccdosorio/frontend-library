import { BookISBN } from "./BookISBN";

export interface Book {
  id:              number;
  book:            BookISBN;
  book_file:       null | string;
  rating:          number;
  number_of_pages: number;
  created_at:      Date;
  updated_at:      Date;
  created_by:      string;
  updated_by:      string;
}