import { ChangeEvent, FocusEvent, useRef } from 'react';
import { XCircle, Search, Clock } from 'react-feather';
import { useStoreActions, useStoreState } from '@/hooks/useStore';
import { useState, useEffect, useCallback } from 'react';
import { useSearch } from '@/hooks/useSearch';
import Spinner from './Spinner';

const SearchBar = () => {
  const search = useSearch();
  const setSearchQuery = useStoreActions(actions => actions.setSearchQuery);
  const clearSearchHistory = useStoreActions(
    actions => actions.clearSearchHistory,
  );
  const searchQuery = useStoreState(state => state.searchQuery);
  const searchHistory = useStoreState(state => state.searchHistory);
  const isSearching = useStoreState(state => state.isSearching);
  const [isFocus, setIsFocus] = useState(false);
  const resetInput = () => {
    setSearchQuery('');
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const searchBarFocus = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      window.scrollTo({ top: 0 });
      const targetElement = document.getElementById('search-bar');
      if (targetElement) {
        targetElement.focus();
      }
    }
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleBlur = useCallback((e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocus(false);
    }
  }, []);

  const handleClickHistory = useCallback(
    (history: string) => {
      setSearchQuery(history);
      search(history);
      setIsFocus(false);
    },
    [search, setSearchQuery],
  );

  useEffect(() => {
    window.addEventListener('keydown', searchBarFocus);
    return () => {
      window.removeEventListener('keydown', searchBarFocus);
    };
  }, [searchBarFocus]);
  return (
    <div
      className="relative w-full h-fit"
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <form
        className="flex flex-col justify-center"
        onSubmit={e => {
          e.preventDefault();
          setIsFocus(false);
          inputRef.current?.blur();
          search();
        }}
        title="search"
      >
        <input
          disabled={isSearching}
          id="search-bar"
          className="bg-transparent w-full py-2 pl-8 pr-7 outline outline-1 outline-gray-300 rounded-lg focus-within:outline-none hover:bg-gray-100 focus:bg-gray-100 
        dark:text-white dark:focus-within:text-black dark:hover:text-black transition-colors"
          type="text"
          placeholder="Search articles..."
          ref={inputRef}
          value={searchQuery}
          onChange={handleInputChange}
          autoComplete="off"
          onKeyUp={e => {
            if (e.key === 'Escape') {
              inputRef.current?.blur();
            }
          }}
        />
        <input className="hidden" type="reset" value="" id="reset-button" />
        {isSearching ? (
          <span className="absolute z-10 left-0 top-0 bottom-0 my-auto ml-2 flex items-center">
            <Spinner />
          </span>
        ) : (
          <Search
            size={18}
            className="absolute z-10 left-0 top-0 bottom-0 my-auto ml-2 text-gray-500"
            xlinkTitle="search icon"
          />
        )}
        <label
          htmlFor="reset-button"
          title="clear search"
          className={`${searchQuery ? '' : 'hidden'}`}
        >
          <XCircle
            size={18}
            className="absolute z-10 right-0 top-0 bottom-0 my-auto mr-2 text-gray-500 cursor-pointer"
            onClick={resetInput}
          />
        </label>
        <label
          className={`${
            searchQuery ? '' : 'lg:flex'
          } hidden absolute z-10 right-0 top-0 bottom-0 my-auto mr-2 items-center text-xs`}
        >
          <span className="bg-zinc-500 text-gray-100 p-1 rounded-sm">CTRL</span>
          <span>+</span>
          <span className="bg-zinc-500 text-gray-100 p-1 rounded-sm">K</span>
        </label>
      </form>
      {!searchHistory.length ? null : (
        <div
          tabIndex={0}
          className={`z-50 absolute top-full flex overflow-hidden flex-col mt-3 rounded-lg left-0 right-0 text-black bg-gray-100 ${
            isFocus ? '' : 'hidden'
          }`}
        >
          {searchHistory.map((history, index) => {
            return (
              <button
                onClick={() => {
                  handleClickHistory(history);
                }}
                className="flex space-x-2 items-center p-1 hover:bg-gray-300"
                key={index}
              >
                <Clock size={18} />
                <p>{history}</p>
              </button>
            );
          })}
          <button
            className=" underline
            "
            onClick={() => {
              clearSearchHistory();
            }}
          >
            Clear search history
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
