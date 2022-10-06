export interface BookMultipleChoiceQuestion {
    id:                 number;
    position:           number;
    answer:             string;
    context:            string;
    options:            string;
    question_statement: string;
    created_at:         Date;
    updated_at:         Date;
    created_by:         string;
    updated_by:         string;
}