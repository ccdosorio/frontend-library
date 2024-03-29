import { Author } from "./Author";

export interface ContentBook {
    id:                    number;
    title:                 string;
    url:                   string;
    key:                   string;
    striped_accents_title: string;
    number_of_pages:       null | string;
    weight:                null | string;
    publish_date:          string;
    isbn10:                number | null;
    isbn13:                number;
    oclc:                  null;
    open_library_id:       string;
    rating:                number;
    authors:               Author[];
    publishers:            Author[];
    subjects:              Author[];
    places:                Author[];
    people:                Author[];
    book_cover_s:          string;
    book_cover_m:          string;
    book_cover_l:          string;
}