import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context";
import { getShortAddress } from "@/utils";
import constants from "@/utils/constants";

const Header = ({ maxWidth }: { maxWidth: number | undefined }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const { gameStatus, actionStatus, appData, changeStatus, wallet } =
    useAppContext();

  const handleCopy = () => {
    if (!copied) {
      setCopied(true);
      navigator.clipboard.writeText(wallet);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };

  return (
    <>
      {gameStatus !== constants.CUTSCENE_1 &&
        gameStatus !== constants.CUTSCENE_2 && (
          <header
            className={`fadein fixed z-20 top-0 flex items-center justify-center w-full h-[50px] md:h-[78px] px-8 ${
              gameStatus === constants.DISCONNECTED ||
              gameStatus === constants.CONNECTING
                ? "bg-[#515151CC]"
                : "bg-[#127FBCCC]"
            } duration-1000`}
            style={{ maxWidth }}
          >
            <button
              className="md:hidden absolute top-3 left-3 text-2xl"
              onClick={() => setShowMenu(!showMenu)}
            >
              <i className="fa fa-bars"></i>
            </button>

            <Link href="/">
              <Image
                className="md:hidden"
                src="/images/logo-mobile.svg"
                width={120}
                height={30}
                alt="logo"
              />
              <Image
                className="hidden md:block"
                src="/images/logo.svg"
                width={208}
                height={52}
                alt="logo"
              />
            </Link>
            {/* <button onClick={() => changeStatus(constants.set_day, 31)}>SET_DAY</button> */}

            <div className="md:ml-auto">
              <div className="overpass_font flex justify-end gap-16 lg:gap-[146px] text-sm font-bold leading-[18px]">
                <Link
                  href="/buy-sell"
                  className="hidden md:block hover-underline"
                >
                  <span>buy/sell PIQ</span>
                </Link>
                <Link
                  href="/tutorial"
                  className="hidden md:block hover-underline"
                >
                  <span>tutorial</span>
                </Link>

                <div className="absolute top-[18px] right-2 md:relative md:top-0 md:right-0">
                  {gameStatus === constants.DISCONNECTED && (
                    <button
                      className="hover-underline flex gap-1 md:gap-1.5 text-[#4CB8DA]"
                      onClick={() => changeStatus(constants.connect)}
                    >
                      <span className="blue text-[10px] md:text-sm">
                        connect
                      </span>
                      <Image
                        className="w-3.5 md:w-4 h-auto"
                        src="/images/connect.svg"
                        width={16}
                        height={16}
                        alt="connect"
                      />
                    </button>
                  )}
                  {gameStatus === constants.CONNECTING && (
                    <button className="flex items-center gap-1 md:gap-1.5">
                      <span className="text-[#F2E144] text-[10px] md:text-sm">
                        loading
                      </span>
                      <Image
                        className="rotate w-3.5 md:w-[18px] h-auto"
                        src="/images/loading.svg"
                        width={18}
                        height={18}
                        alt="loading"
                      />
                    </button>
                  )}
                  {gameStatus !== constants.DISCONNECTED &&
                    gameStatus !== constants.CONNECTING && (
                      <button
                        className="hover-underline flex gap-1 md:gap-1.5 text-[#9FFB98]"
                        onClick={() => changeStatus(constants.disconnect)}
                      >
                        <span className="green text-[10px] md:text-sm">
                          disconnect
                        </span>
                        <Image
                          className="w-3 md:w-[14px] h-auto mt-px md:mt-0"
                          src="/images/disconnect.svg"
                          width={14}
                          height={16}
                          alt="disconnect"
                        />
                      </button>
                    )}
                </div>
              </div>

              {gameStatus !== constants.DISCONNECTED &&
                gameStatus !== constants.CONNECTING && (
                  <div className="hidden md:flex justify-end gap-10 lg:gap-[120px] mt-2 text-sm leading-[18px] text-[#F2E144]">
                    <div className="flex items-center gap-2">
                      <span>Account: {getShortAddress(wallet)}</span>
                      <button className="relative" onClick={handleCopy}>
                        <Image
                          className="translate-y-[-1px]"
                          src="/images/clipboard.svg"
                          width={11}
                          height={15}
                          alt="clipboard"
                        />
                        {copied && (
                          <span className="fadein absolute inline-block px-2 py-0.5 font-semibold bg-white text-black translate-x-[-50%] translate-y-2">
                            Copied
                          </span>
                        )}
                      </button>
                    </div>
                    <span
                      className={`${
                        gameStatus === constants.NEW_GAME &&
                        actionStatus === constants.BLINK
                          ? "blink"
                          : ""
                      } font-bold`}
                    >
                      Balance: {appData.balance} PIQ
                    </span>
                  </div>
                )}
            </div>

            {/* Mobile Menu */}
            <div
              className={`md:hidden absolute top-[50px] left-0 w-full ${
                showMenu ? "max-h-[128px]" : "max-h-0"
              } text-center font-bold text-black bg-white duration-300 overflow-hidden`}
            >
              <ul className="flex flex-col gap-6 p-6">
                <li>
                  <Link href="/buy-sell" className="hover-underline">
                    <span>buy/sell PIQ</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tutorial" className="hover-underline">
                    <span>tutorial</span>
                  </Link>
                </li>
              </ul>
            </div>
          </header>
        )}
    </>
  );
};

export default Header;
