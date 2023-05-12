import { action } from "easy-peasy";
import { ArticleModel } from "../models";

const ArticleService: ArticleModel = {
    articles: [],
    searchQuery: '',
    setSearchQuery: action((state, payload) => {
        state.searchQuery = payload
    })
}

export default ArticleService