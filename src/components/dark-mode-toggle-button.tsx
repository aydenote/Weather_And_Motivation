import { useTheme } from 'next-themes';

export default function DarkModeToggleButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mt-4 md:mt-0 hover:text-orange-500 dark:hover:text-yellow-300"
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {/* 라이트 모드 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="visible dark:invisible dark:h-0 dark:w-0 h-5 w-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>

      {/* 다크 모드 */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="invisible dark:visible dark:h-5 dark:w-5 h-0 w-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    </button>
  );
}
