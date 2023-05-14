import Head from 'next/head';

import { HomeHeader } from '@/components/partials';
import { Footer, SearchBar, Spinner } from '@/components/global';
import Link from 'next/link';
import Image from 'next/image';

import { useSearch } from '@/hooks/useSearch';
import { useStoreState } from '@/hooks/useStore';

const Home = () => {
  const search = useSearch();
  const isSearching = useStoreState(state => state.isSearching);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Home | NyTimes Article Search</title>
        <meta
          name="description"
          content="Discover and search for articles from NYTimes"
        />
        <meta property="og:title" content="Home | NyTimes Article Search" />
        <meta
          property="og:description"
          content="Discover and search for articles from NYTimes"
        />
        <meta
          property="og:image"
          content="https://nytimes.abud.top/news-placeholder.jpg"
        />
        <meta property="og:url" content="https://nytimes.abud.top" />
      </Head>
      <HomeHeader />
      <main className="h-full ">
        <div className="flex justify-center md:pt-8 lg:pt-12">
          <Link
            href={'https://www.nytimes.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto"
          >
            <Image
              src="/nyt-text-icon.svg"
              alt="new york times logo"
              title="new york times logo"
              className="max-h-10 md:max-h-20 w-[90vw] md:w-[60vw] dark:invert"
              width={100}
              height={100}
              priority
            />
          </Link>
        </div>
        <section className="container h-full mx-auto p-4 flex flex-col space-y-8">
          <div className="min-w-0 max-w-7xl mx-auto w-full">
            <SearchBar />
          </div>
          <div className="flex justify-center">
            <button
              title="search article"
              onClick={() => search()}
              className={`ny-button relative transition-all  ${
                isSearching ? 'pr-10' : ''
              }`}
            >
              <span
                className={`absolute right-0 mr-1 my-auto ${
                  isSearching ? '' : 'hidden'
                }`}
              >
                <Spinner />
              </span>
              Search Article
            </button>
          </div>
        </section>
      </main>
      <Footer isAbsolute />
    </>
  );
};

export default Home;

