import { UserInfo } from "./UserInfo";
import { Classroom } from "./Classroom";

export interface StudentClassroom {
    id:         number;
    classroom:  Classroom;
    user:       UserInfo;
    status:     string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
}