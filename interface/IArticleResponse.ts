import IArticle from "./IArticle";
import IMetadata from "./IMetadata";

interface IArticleResponse {
    status?: string;
    copyright?: string;
    response?: {
        docs?: IArticle[],
        meta?: IMetadata
    }
}

export default IArticleResponse