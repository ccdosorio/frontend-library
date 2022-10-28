import { UserInfo } from "../entity";

export interface BookPage {
    id:            number;
    user:          UserInfo;
    page_progress: number;
    created_at:    Date;
    updated_at:    Date;
    created_by:    string;
    updated_by:    string;
}