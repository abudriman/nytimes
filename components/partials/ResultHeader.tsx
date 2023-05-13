import Image from 'next/image';
import Link from 'next/link';
import {
  FloatingActionButton,
  Header,
  SearchBar,
  ToggleModeButton,
} from '@/components/global';

const ResultHeader = () => {
  return (
    <Header>
      <div className="h-full flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1 lg:flex-none lg:w-full lg:max-w-[700px]">
          <Link href={'/'}>
            <Image
              src="/nyt-icon.png"
              alt="new york times logo"
              title="new york times logo"
              className="max-h-10 w-auto dark:invert"
              width={500}
              height={500}
              priority
            />
          </Link>
          <SearchBar />
        </div>
        <div className="flex items-center">
          <ToggleModeButton />
        </div>
      </div>
    </Header>
  );
};

export default ResultHeader;
