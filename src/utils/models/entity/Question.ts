import { BookMultipleChoiceQuestion } from "./BookMultipleChoiceQuestion";

export interface Question {
    id:                             number;
    page_number:                    number;
    statement:                      string;
    book_multiple_choice_questions: BookMultipleChoiceQuestion[];
    created_at:                     Date;
    updated_at:                     Date;
    created_by:                     string;
    updated_by:                     string;
}
