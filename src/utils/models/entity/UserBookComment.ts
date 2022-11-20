export interface UserBookComment {
    id:           number;
    page_number:  number;
    page_comment: string;
    user_name:    string;
    created_at:   Date;
    updated_at:   Date;
    created_by:   string;
    updated_by:   string;
}
