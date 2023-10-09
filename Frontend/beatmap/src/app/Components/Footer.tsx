export const Footer = () => {
  return (
    <footer className=" w-full   dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-2 md:flex md:items-center md:justify-evenly">
        <span className="text-sm text-gray-700 sm:text-center dark:text-gray-400">
          By Trent Zhang
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-700 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
