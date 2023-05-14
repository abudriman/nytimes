import { ArticleGrid, ResultHeader } from '@/components/partials';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Footer } from '@/components/global';
import { useEffect } from 'react';
import { useStoreActions } from '@/hooks/useStore';

export const getServerSideProps: GetServerSideProps<{
  search: string;
}> = async ({ query }) => {
  return {
    props: {
      search: (query.search as string) ?? '',
    },
    //actually I could use req.query to passing props between pages/component
    //but i use easy-peasy instead. because im not actually using getServerSideProps
    //because all the fetch is in the client side using swr
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
        <title>Result for &quot;{search}&quot; | NyTimes Article Search</title>
        <meta
          name="description"
          content="Search results for articles from NYTimes. Explore and find the latest news and stories."
        />
        <meta property="og:title" content="Result | NyTimes Article Search" />
        <meta
          property="og:description"
          content="Search results for articles from NYTimes. Explore and find the latest news and stories."
        />
        <meta
          property="og:image"
          content="https://nytimes.abud.top/news-placeholder.jpg"
        />
        <meta property="og:url" content="https://nytimes.abud.top/result" />
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
