import { UserInfo } from "./UserInfo";

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