import useSWRInfinite from 'swr/infinite'
import { useStoreActions, useStoreState } from './useStore'
import { IArticleResponse } from '@/interface';
import formatFilterDate from '@/utils/formatFilterDate';

const fetchArticles = (url: string) => fetch(url).then(response => {
    if (response.ok) {
        return response.json();
    }
    throw response;
}).catch(err => { throw err });

export function useArticles() {
    const searchQueryKey = useStoreState(state => state.searchQueryKey)
    const sort = useStoreState(state => state.sort)
    const begin_date = useStoreState(state => state.begin_date)
    const end_date = useStoreState(state => state.end_date)
    const setIsSearching = useStoreActions(actions => actions.setIsSearching);

    const getKey = (pageIndex: number, previousPageData: IArticleResponse) => {
        if (previousPageData && !previousPageData.response?.docs?.length) return null // reached the end
        const queryString = new URLSearchParams({
            q: searchQueryKey, page: (pageIndex).toString(),
            sort,
            begin_date: formatFilterDate(begin_date),
            end_date: formatFilterDate(end_date)
        })
        return `/api/articles?${queryString.toString()}`
    }

    const { data, error, isLoading, size, mutate, setSize, isValidating } = useSWRInfinite<IArticleResponse>(getKey, fetchArticles, {
        revalidateOnFocus: false,
        onError: () => {
            setIsSearching(false)
        },
        onSuccess: () => {
            setIsSearching(false)
        }
    })

    return {
        articles: data,
        isLoading,
        isError: error,
        size,
        mutate,
        setSize,
        isValidating
    }
}