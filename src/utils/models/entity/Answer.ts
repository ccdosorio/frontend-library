import { BookMultipleChoiceQuestion } from './BookMultipleChoiceQuestion';
import { UserInfo } from './UserInfo';

export interface Answer {
    id:                            number;
    book_multiple_choice_question: BookMultipleChoiceQuestion;
    user:                          UserInfo;
    answer:                        string;
    status:                        string;
    created_at:                    Date;
    updated_at:                    Date;
    created_by:                    string;
    updated_by:                    string;
}