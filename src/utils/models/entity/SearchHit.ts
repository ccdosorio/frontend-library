import { ContentBook } from "./ContentBook";
import { HighlightFields } from "./HighlightFields";

export interface SearchHit {
    id:               string;
    score:            string;
    sort_values:      string[];
    content:          ContentBook;
    highlight_fields: HighlightFields;
}
