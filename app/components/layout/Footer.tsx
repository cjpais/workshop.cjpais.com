import { CJIcon } from "../icons/CJIcon";
import { HeartIcon } from "../icons/HeartIcon";

const Footer = () => {
  return (
    <footer className="flex w-full justify-center self-center items-center mt-6 sm:mt-12 pt-4 border-t border-very-dim text-sm text-center flex-shrink-0">
      <a href="https://cjpais.com" target="_blank">
        <CJIcon className="hover:fill-accent" />
      </a>
      with <HeartIcon />
    </footer>
  );
};

export default Footer;
