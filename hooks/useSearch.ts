import { useStoreActions, useStoreState } from './useStore'
import { useRouter } from 'next/router';

export function useSearch() {
    const router = useRouter();
    const updateSearchQueryKey = useStoreActions(actions => actions.updateSearchQueryKey);
    const addSearchHistory = useStoreActions(actions => actions.addSearchHistory);
    const searchQuery = useStoreState(state => state.searchQuery);
    const searchArticle = (query?: string) => {
        if (searchQuery === '' && (!query || query === '')) {
            return
        }
        updateSearchQueryKey(query ?? searchQuery)
        const queryString = new URLSearchParams({ search: query ?? searchQuery });
        router.push('/result?' + queryString);
        setTimeout(() => {
            addSearchHistory(searchQuery)
        }, 500);
    };
    return searchArticle
}