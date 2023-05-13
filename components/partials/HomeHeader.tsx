import {
  FloatingActionButton,
  Header,
  ToggleModeButton,
} from '@/components/global';

const HomeHeader = () => {
  return (
    <Header>
      <div className="flex h-full justify-end">
        <div className="items-center">
          <ToggleModeButton />
        </div>
      </div>
    </Header>
  );
};

export default HomeHeader;
