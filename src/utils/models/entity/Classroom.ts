export interface Classroom {
    id:              number;
    user:            UserInfo;
    name:            string;
    key:             string;
    status:          string;
    description:     string;
    classroom_books: any[];
    created_at:      Date;
    updated_at:      Date;
    created_by:      string;
    updated_by:      string;
}

export interface UserInfo {
    id:               number;
    email_address:    string;
    status:           string;
    name:             string;
    locked_until:     null;
    sign_in_attempts: number;
    enabled:          boolean;
    photo:            null;
    created_at:       Date;
    updated_at:       Date;
    created_by:       string;
    updated_by:       string;
}