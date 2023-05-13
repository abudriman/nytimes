import { Moon, Sun } from 'react-feather';
import { useTheme } from 'next-themes';

const ToggleModeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const toggleMode = () => {
    theme == 'dark' ? setTheme('light') : setTheme('dark');
  };
  return (
    <button
      title="toggle theme mode"
      onClick={toggleMode}
      className=" text-yellow-500"
    >
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
    </button>
  );
};

export default ToggleModeButton;
