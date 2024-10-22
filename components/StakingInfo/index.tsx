import { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context";

const StakingInfo = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const { appData } = useAppContext();

  return (
    <div
      className={`absolute top-0 left-0 ${
        expand ? "min-w-[574px] py-12" : "min-w-[220px] py-[22px]"
      } px-8 bg-[#127FBCE6]`}
    >
      <ul
        className={`flex flex-col ${
          expand ? "pb-6 text-xl gap-9" : "pb-3 gap-[26px]"
        } leading-none truncate duration-300`}
      >
        <li className="flex justify-between gap-12">
          {expand && <h2>Deposit</h2>}
          <h3 className="text-[#F2E144]">{appData.deposit} PIQ</h3>
        </li>
        <li className="flex justify-between gap-12">
          {expand && <h2>Stake</h2>}
          <h3 className="text-[#9FFB98]">{appData.stake} PIQ</h3>
        </li>
        <li className="flex justify-between gap-12">
          {expand && (
            <div>
              <h2>Current level rewards</h2>
              <p className="text-base">(last update: {appData.lastUpdate})</p>
            </div>
          )}
          <h3 className="text-[#9FFB98]">{appData.earningOfLevel} PIQ</h3>
        </li>
        <li className="flex justify-between gap-12">
          {expand && <h2>Level</h2>}
          <h3 className="text-[#D2FBE2]">{appData.level}/12</h3>
        </li>
        <li className="flex justify-between gap-12">
          {expand && <h2>Time left to level completion</h2>}
          <h3 className="flex gap-1 text-[#D2FBE2]">
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
        <li className="flex justify-between gap-12">
          {expand && <h2>My staking difficulty</h2>}
          <h3 className="text-[#D2FBE2]">{appData.difficultyOfGame}</h3>
        </li>
        <li className="flex justify-between gap-12">
          {expand && <h2>Staking advantage over new players</h2>}
          <h3 className="text-[#9FFB98]">+{appData.advantage} %</h3>
        </li>
      </ul>
      <button
        className="absolute bottom-0 right-0"
        onClick={() => setExpand(!expand)}
      >
        {expand ? (
          <Image src="/images/shrink.svg" width={50} height={50} alt="shrink" />
        ) : (
          <Image src="/images/expand.svg" width={50} height={50} alt="expand" />
        )}
      </button>
    </div>
  );
};

export default StakingInfo;
