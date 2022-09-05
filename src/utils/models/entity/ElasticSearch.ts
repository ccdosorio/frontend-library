import { SearchHit } from "./SearchHit";

export interface ElasticSearch {
    total_hits:          number;
    total_hits_relation: string;
    max_score:           string;
    scroll_id:           null;
    search_hits:         SearchHit[];
    aggregations:        null;
    empty:               boolean;
}



