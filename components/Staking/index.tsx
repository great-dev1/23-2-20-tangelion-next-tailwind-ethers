import { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context";

const Staking = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const { appData } = useAppContext();

  return (
    <>
      {/* Staking Info Box */}
      <div
        className={`absolute z-10 top-[60px] md:top-[78px] left-0 ${
          expand
            ? "min-w-[194px] md:min-w-[574px] py-2.5 md:py-8"
            : "min-w-[135px] md:min-w-[220px] py-2.5 md:py-[22px]"
        } px-3.5 md:px-8 bg-[#127FBCE6]`}
      >
        <ul
          className={`flex flex-col ${
            expand
              ? "pb-6 text-xs leading-4 md:text-xl md:leading-6 gap-3 md:gap-6"
              : "pb-5 gap-4 md:gap-[26px] text-xs leading-4 md:text-base md:leading-5"
          } truncate duration-200`}
        >
          <li className="flex flex-col md:flex-row justify-between md:gap-12">
            {expand && <h2>Deposit</h2>}
            <h3 className={`${expand ? "pl-5 md:pl-0" : ""} text-[#F2E144]`}>
              {appData.deposit} PIQ
            </h3>
          </li>
          <li className="flex flex-col md:flex-row justify-between md:gap-12">
            {expand && <h2>Stake</h2>}
            <h3 className={`${expand ? "pl-5 md:pl-0" : ""} text-[#9FFB98]`}>
              {appData.stake} PIQ
            </h3>
          </li>
          <li className="flex flex-col md:flex-row justify-between md:gap-12">
            {expand && (
              <div>
                <h2>Current level income</h2>
                <p className="hidden md:block text-xs">
                  (last update: {appData.lastUpdate})
                </p>
              </div>
            )}
            <div className={expand ? "pl-5 md:pl-0" : ""}>
              <h3 className="text-[#9FFB98]">{appData.earningOfLevel} PIQ</h3>
              {expand && (
                <p className="md:hidden text-[6px] leading-none">
                  (last update: {appData.lastUpdate})
                </p>
              )}
            </div>
          </li>
          <li className="flex flex-col md:flex-row justify-between md:gap-12">
            {expand && <h2>Level</h2>}
            <h3 className={`${expand ? "pl-5 md:pl-0" : ""} text-[#D2FBE2]`}>
              {appData.level}/12
            </h3>
          </li>
          <li className="flex flex-col md:flex-row justify-between md:gap-12">
            {expand && <h2>Time left to level completion</h2>}
            <h3
              className={`flex gap-1 ${
                expand ? "pl-5 md:pl-0" : ""
              } text-[#D2FBE2]`}
            >
              {appData.remainingDays} day{appData.remainingDays !== 1 && "s"}
              {!expand && (
                <>
                  <span>left</span>
                  <div className="font-bold">
                    <span className="dot-1">.</span>
                    <span className="dot-2">.</span>
                    <span className="dot-3">.</span>
                    <span className="dot-4">.</span>
                    <span className="dot-5">.</span>
                  </div>
                </>
              )}
            </h3>
          </li>
          {expand && (
            <>
              <li className="flex flex-col md:flex-row justify-between md:gap-12">
                <h2>My staking difficulty</h2>
                <h3
                  className={`${expand ? "pl-5 md:pl-0" : ""} text-[#D2FBE2]`}
                >
                  {appData.difficultyOfGame}
                </h3>
              </li>
              <li className="flex flex-col md:flex-row justify-between md:gap-12">
                <h2>Network&apos;s staking difficulty</h2>
                <h3
                  className={`${expand ? "pl-5 md:pl-0" : ""} text-[#D2FBE2]`}
                >
                  {appData.difficultyOfToday}
                </h3>
              </li>
            </>
          )}
          <li className="flex flex-col md:flex-row justify-between md:gap-12">
            {expand && (
              <h2>
                Staking advantage{" "}
                <span className="hidden md:inline-block">over new stakers</span>
              </h2>
            )}
            <h3 className={`${expand ? "pl-5 md:pl-0" : ""} text-[#9FFB98]`}>
              +{appData.advantage} %
            </h3>
          </li>
        </ul>
        <button
          className="absolute bottom-0 right-0"
          onClick={() => setExpand(!expand)}
        >
          {expand ? (
            <Image
              className="w-8 md:w-[50px] h-auto"
              src="/images/shrink.svg"
              width={50}
              height={50}
              alt="shrink"
            />
          ) : (
            <Image
              className="w-8 md:w-[50px] h-auto"
              src="/images/expand.svg"
              width={50}
              height={50}
              alt="expand"
            />
          )}
        </button>
      </div>

      {/* Rotating Coin */}
      <Image
        className="w-[10.6vh] translate-x-[11.8vh] translate-y-[2.6vh]"
        src={`/images/coin-${appData.level}.gif`}
        width={100}
        height={100}
        alt="coin"
      />
    </>
  );
};

export default Staking;
