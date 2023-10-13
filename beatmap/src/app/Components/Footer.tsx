export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-2/3 md:w-1/3 rounded-lg  backdrop-blur-lg bg-gray-200 text-gray-800  dark:bg-gray-800 m-2">
      <div className="w-full mx-auto max-w-screen-xl p-2 text-sm font-medium  flex items-center justify-evenly ">
        <span className="sm:text-center ">By Trent Zhang</span>
        <ul className="flex flex-wrap items-center mt-0">
          <li>
            <a
              href="mailto:trentzhang68@icloud.com?subject=BeatMap Feedback: "
              className="hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
