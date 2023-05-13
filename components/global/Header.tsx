import { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="h-10 box-content p-4 sticky top-0 dark:bg-main-dark bg-white ">
      {children}
    </header>
  );
};
export default Header;
