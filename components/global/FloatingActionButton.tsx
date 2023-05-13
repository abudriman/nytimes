import { ReactNode } from 'react';

interface FloatingActionButtonProps {
  children: ReactNode;
}

const FloatingActionButton = ({ children }: FloatingActionButtonProps) => {
  return <div className="fixed z-50 bottom-10 right-10">{children}</div>;
};
export default FloatingActionButton;
