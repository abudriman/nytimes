import { Action } from 'easy-peasy';

interface SearchModel {
    searchQuery: string;
    setSearchQuery: Action<SearchModel, string>;
    searchQueryKey: string; //for swr
    updateSearchQueryKey: Action<SearchModel, string | undefined>;
    searchHistory: string[];
    addSearchHistory: Action<SearchModel, string>;
    clearSearchHistory: Action<SearchModel>;
}

export default SearchModel