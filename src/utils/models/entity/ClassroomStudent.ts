import { UserInfo } from "./UserInfo";

export interface ClassromStudent {
    id:         number;
    user:       UserInfo;
    status:     string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
}