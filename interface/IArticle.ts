import IByline from "./IByline";
import IHeadline from "./IHeadline";
import IKeyword from "./IKeyword";
import IMultimedia from "./IMultimedia";

interface IArticle {
    web_url: string;
    snippet: string;
    print_page: string;
    print_section: string;
    source: string;
    multimedia: IMultimedia[];
    headline: IHeadline;
    keywords: IKeyword[];
    pub_date: string;
    document_type: string;
    news_desk: string;
    section_name: string;
    byline: IByline;
    type_of_material: string;
    _id: string;
    word_count: number;
    uri: string;
}

export default IArticle