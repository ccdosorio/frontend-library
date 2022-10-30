import { UserBook } from "./UserBook";

export interface ClassroomBook {
    id:          number;
    user_book:   UserBook;
    status:      string;
    description: string;
    rating:      number;
    book_progress:      number;
    created_at:  Date;
    updated_at:  Date;
    created_by:  string;
    updated_by:  string;
}