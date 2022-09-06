import { Authority } from "./Authority";

export interface UserInfo {
    id:               number;
    email_address:    string;
    status:           string;
    name:             string;
    locked_until:     string | null;
    sign_in_attempts: number;
    enabled:          boolean;
    photo:            string | null;
    created_at:       Date;
    updated_at:       Date;
    created_by:       string;
    updated_by:       string;
    authorities:      Authority[];
}