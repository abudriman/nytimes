import useSWRInfinite from 'swr/infinite'
import { useStoreState } from './useStore'
import { IArticleResponse } from '@/interface';

const fetchArticles = (url: string) => fetch(url).then(res => res.json());

export function useArticles() {
    const searchQueryKey = useStoreState(state => state.searchQueryKey)

    const getKey = (pageIndex: number, previousPageData: IArticleResponse) => {
        if (previousPageData && !previousPageData.response?.docs?.length) return null // reached the end
        const queryString = new URLSearchParams({ q: searchQueryKey, page: pageIndex.toString() })
        return `/api/articles?${queryString.toString()}`
    }

    const { data, error, isLoading, size, mutate, setSize } = useSWRInfinite<IArticleResponse>(getKey, fetchArticles)

    return {
        articles: data,
        isLoading,
        isError: error,
        size,
        mutate,
        setSize
    }
}