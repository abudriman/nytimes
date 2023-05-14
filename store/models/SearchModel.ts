import { Action } from 'easy-peasy';

interface SearchModel {
    isSearching: boolean;
    setIsSearching: Action<SearchModel, boolean>;
    searchQuery: string;
    setSearchQuery: Action<SearchModel, string>;
    searchQueryKey: string; //for swr
    updateSearchQueryKey: Action<SearchModel, string | undefined>;
    searchHistory: string[];
    addSearchHistory: Action<SearchModel, string>;
    clearSearchHistory: Action<SearchModel>;
    sort: string;
    setSort: Action<SearchModel, 'newest' | 'oldest' | 'relevance'>;
    begin_date: Date;
    setBeginDate: Action<SearchModel, Date>;
    end_date: Date;
    setEndDate: Action<SearchModel, Date>;
}

export default SearchModel