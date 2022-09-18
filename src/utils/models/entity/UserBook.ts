import { BookISBN } from "./BookISBN";

export interface UserBook {
    id:              number;
    book:            BookISBN;
    rating:          number;
    number_of_pages: number;
    created_at:      Date;
    updated_at:      Date;
    created_by:      string;
    updated_by:      string;
}