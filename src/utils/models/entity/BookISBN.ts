import { BookAuthorElement } from "./BookAuthorElement";

export interface BookISBN {
    id:              number;
    title:           string;
    isbn10:          number;
    isbn13:          number;
    oclc:            string | null;
    lccn:            string | null;
    olid:            string | null;
    open_library_id: string;
    rating:          number;
    revision:        number;
    book_cover_s:    string;
    book_cover_m:    string;
    book_cover_l:    string;
    published_at:    string;
    book_subjects:   BookAuthorElement[];
    book_authors:    BookAuthorElement[];
    book_people:     BookAuthorElement[];
    book_places:     BookAuthorElement[];
    book_publishers: BookAuthorElement[];
    created_at:      Date;
    updated_at:      Date;
    created_by:      string;
    updated_by:      string;
}