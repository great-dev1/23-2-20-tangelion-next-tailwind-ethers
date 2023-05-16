import { useRouter } from "next/router";
import { useAppContext } from "@/context";
import constants from "@/utils/constants";

const Footer = () => {
  const { pathname } = useRouter();
  const { gameStatus } = useAppContext();

  return (
    <>
      {(pathname.includes("tutorial") ||
        (pathname === "/" && gameStatus === constants.DISCONNECTED)) && (
        <footer
          className={`z-10 flex flex-col-reverse md:flex-row md:items-center justify-between h-16 px-4 md:pl-5 md:pr-7 py-3 md:py-5 text-xs md:text-base ${
            pathname.includes("tutorial") ? "bg-[#161F3E]" : "bg-[#515151CC]"
          }`}
        >
          <p>Copyright &copy; 2023. All Rights Reserved. </p>
          <a
            className="font-bold underline"
            href="/pdfs/Whitepaper Tangelion.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Whitepaper
          </a>
        </footer>
      )}
    </>
  );
};

export default Footer;
