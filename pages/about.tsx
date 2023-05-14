import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  return (
    <>
      <Head>
        <title>About | NyTimes Article Search</title>
        <meta name="description" content="About this project." />
        <meta property="og:title" content="About | NyTimes Article Search" />
        <meta property="og:description" content="About this project." />
        <meta
          property="og:image"
          content="https://nytimes.abud.top/news-placeholder.jpg"
        />
        <meta property="og:url" content="https://nytimes.abud.top/about" />
      </Head>
      <div className="space-y-8 p-4 min-h-screen min-w-screen">
        <div>
          <h1 className="text-3xl font-bold">About this project</h1>
          <p>
            This project consumes the API from the{' '}
            <a
              className="ny-url"
              href="https://developer.nytimes.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              New York Times Article Search API
            </a>{' '}
            and has two main functionalities: searching for articles from The
            New York Times and sorting/filtering them by date. The project was
            developed in 2 and a half days by{' '}
            <a
              href="https://abudriman.github.io"
              className="ny-url"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arif Budiman.
            </a>
          </p>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Stack used</h1>
          <ul>
            <li>
              <a
                className="ny-url"
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js
              </a>
            </li>
            <li>
              <a
                className="ny-url"
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tailwind CSS
              </a>
            </li>
            <li>
              <a
                className="ny-url"
                href="https://easy-peasy.now.sh/"
                target="_blank"
                rel="noopener noreferrer"
              >
                easy-peasy
              </a>
            </li>
            <li>
              <a
                className="ny-url"
                href="https://swr.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                SWR
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-3xl font-bold">State management</h1>
          <p>
            I used easy-peasy to manage the state in this project. Typically,
            global state management libraries like Redux are used to avoid prop
            drilling in React-based projects. However, in this project, I
            utilized SWR (a data fetching library) which handles caching and
            other aspects. With SWR, the need for global state management is
            eliminated, as data can be fetched again from the cache wherever it
            is needed.
          </p>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Testing</h1>
          <p>
            Testing for this project was done using{' '}
            <a
              href="https://www.selenium.dev/selenium-ide/"
              className="ny-url"
              target="_blank"
              rel="noopener noreferrer"
            >
              Selenium IDE
            </a>
            .
          </p>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Lighthouse</h1>
          <p>This project received an almost perfect score on Lighthouse.</p>
          <br />
          <Image
            src="/lighthouse-1.jpg"
            alt="Lighthouse result for the home page"
            width={500}
            height={200}
          />
          <p>
            <i>Lighthouse result for the home page</i>
          </p>
          <br />
          <Image
            src="/lighthouse-2.jpg"
            alt="Lighthouse result for the result page"
            width={500}
            height={200}
          />
          <p>
            <i>Lighthouse result for the result page</i>
          </p>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Deployment</h1>
          <p>
            Powered by{' '}
            <a
              className="ny-url"
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel
            </a>
          </p>
        </div>
        <div className="flex sticky bottom-0 justify-end">
          <Link className="text-3xl ny-url" href="/">
            Back to App
          </Link>
        </div>
      </div>
    </>
  );
};

export default About;
