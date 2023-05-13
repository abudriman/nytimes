import { ExternalLink } from 'react-feather';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="absolute w-full bottom-0 bg-zinc-200 dark:bg-zinc-900 flex justify-between p-2 text-sm">
      <h6 className="">{new Date().getFullYear()} By Arif Budiman</h6>
      <div className="flex space-x-3">
        <Link
          href="https://github.com/abudriman/nytimes"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1"
        >
          <p>Github</p> <ExternalLink size={14} />
        </Link>
        <Link href="/about" className="flex items-center space-x-1">
          <p>About</p> <ExternalLink size={14} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
