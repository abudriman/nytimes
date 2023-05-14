import { action } from "easy-peasy";
import SearchModel from "../models/SearchModel";

const SearchService: SearchModel = {
    searchQuery: '',
    setSearchQuery: action((state, payload) => {
        state.searchQuery = payload
    }),
    searchQueryKey: '', //for swr
    updateSearchQueryKey: action((state, payload) => {
        state.searchQueryKey = payload ?? state.searchQuery
    }),
    searchHistory: [],
    addSearchHistory: action((state, payload) => {
        if (state.searchHistory.indexOf(payload) === -1) {
            state.searchHistory.unshift(payload)
        }
        //up to 5 search history
        if (state.searchHistory.length > 5) {
            state.searchHistory.pop()
        }
    }),
    clearSearchHistory: action((state, payload) => {
        state.searchHistory = []
    }),
    sort: 'newest',
    setSort: action((state, payload) => {
        state.sort = payload
    }),
    begin_date: new Date(2000, 1, 1),
    setBeginDate: action((state, payload) => {
        state.begin_date = payload
    }),
    end_date: new Date(),
    setEndDate: action((state, payload) => {
        state.end_date = payload
    }),

    // usually everything related to article i.e thunk written on it's own service 
    // but since I use swr it's not needed anymore. swr handle data 
    // caching so I use simplest form of global state management solution 
    // cuz it's only needed to avoid a few props drilling
}

export default SearchService