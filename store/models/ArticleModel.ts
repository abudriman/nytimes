import { IArticle } from '@/interface';
import { Action } from 'easy-peasy';

interface ArticleModel {
    articles: IArticle[];
    searchQuery: string;
    setSearchQuery: Action<ArticleModel, string>
}

export default ArticleModel