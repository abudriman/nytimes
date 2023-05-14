import { ResultHeader } from '@/components/partials';
import { useArticles } from '@/hooks/useArticles';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { IArticle } from '@/interface';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Footer, ImageWithFallback } from '@/components/global';
import { useEffect, memo } from 'react';
import { useStoreActions } from '@/hooks/useStore';

const ArticleCard = ({ article }: { article: IArticle }) => {
  return (
    <Link
      href={article.web_url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-zinc-200 dark:bg-zinc-900 min-h-[100px] w-auto overflow-hidden rounded-md shadow-md"
    >
      <div className="flex flex-row lg:flex-col items-stretch h-full">
        <div className=" overflow-hidden relative">
          <span className="font-bold uppercase text-xs absolute z-10 bottom-0 right-0 bg-black text-white dark:bg-white dark:text-black">
            {format(new Date(article.pub_date ?? Date.now()), 'MMM d, yyyy')}
            &nbsp;
          </span>
          {article.multimedia.length ? (
            <ImageWithFallback
              height={144}
              width={500}
              className="min-h-[9rem] h-full lg:h-36 w-36 max-w-[9rem] min-w-[9rem]  lg:w-full lg:max-w-full lg:min-w-full object-cover object-center lg:object-top"
              src={'https://www.nytimes.com/' + article.multimedia[0].url}
              alt={
                article.multimedia[0].caption ??
                'image of ' + article.headline.main
              }
              // onError={e => e.currentTarget.src = "/news-placeholder.jpg"}
              title={
                article.multimedia[0].caption ??
                'image of ' + article.headline.main
              }
            ></ImageWithFallback>
          ) : (
            <Image
              height={144}
              width={500}
              className="min-h-[9rem] h-full lg:h-36 w-36 max-w-[9rem] min-w-[9rem]  lg:w-full lg:max-w-full lg:min-w-full object-cover object-center lg:object-top dark:invert"
              src="/news-placeholder.jpg"
              alt="new york times articles"
            ></Image>
          )}
        </div>
        <div className="flex-1 flex-col p-2">
          <h6
            className="text-base font-bold line-clamp-3"
            title={article.headline.main}
          >
            {article.headline.main}
          </h6>
          <p className="text-xs line-clamp-1" title={article.byline.original}>
            {article.byline.original}
          </p>
          <p className="text-sm line-clamp-4" title={article.snippet}>
            {article.snippet}
          </p>
        </div>
      </div>
    </Link>
  );
};

const ArticleCardSkeleton = memo(function ArticleCardSkeleton() {
  return (
    <div className="bg-zinc-200 dark:bg-zinc-900 min-h-[9rem] h-full rounded-md w-auto animate-pulse"></div>
  );
});

const SkeletonGrid = memo(function SkeletonGrid() {
  return (
    <>
      {Array(24)
        .fill(0)
        .map((fill, index) => {
          return <ArticleCardSkeleton key={index} />;
        })}
    </>
  );
});

const ArticleGrid = () => {
  const { articles, size, setSize, isLoading, isError, isValidating } =
    useArticles();
  const loadMore = () => {
    setSize(size + 1);
  };
  if (isError) {
    <div className="flex">
      <p>Error occured : {JSON.stringify(isError)}</p>
    </div>;
  }
  if (isLoading) {
    return (
      <div className="px-4 md:px-0 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <SkeletonGrid />
      </div>
    );
  }
  return (
    <>
      <div className="px-4 md:px-0 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles?.map((response, pageIndex) => {
          return response.response?.docs?.map((article, index) => {
            return <ArticleCard key={index} article={article} />;
          });
        })}
        {isValidating && <SkeletonGrid />}
      </div>
      {!isValidating && !isLoading && !isError ? (
        <button
          onClick={loadMore}
          title="load more"
          className="ny-button mx-auto mb-8 block"
        >
          Load More
        </button>
      ) : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  search: string;
}> = async ({ query }) => {
  return {
    props: {
      search: (query.search as string) ?? '',
    },
  };
};

const Result = ({
  search,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const updateSearchQueryKey = useStoreActions(
    actions => actions.updateSearchQueryKey,
  );
  const setSearchQuery = useStoreActions(actions => actions.setSearchQuery);
  useEffect(() => {
    updateSearchQueryKey(search);
    setSearchQuery(search);
  }, [search, updateSearchQueryKey, setSearchQuery]);
  return (
    <>
      <Head>
        <title>{search} | NyTimes Article Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResultHeader />
      <main className="container mx-auto space-y-4 pt-4 pb-12 min-h-screen">
        <ArticleGrid />
      </main>
      <Footer />
    </>
  );
};

export default Result;
