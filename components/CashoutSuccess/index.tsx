import { useState, useEffect } from "react";
import Image from "next/image";
import WhiteButton from "../WhiteButton";
import { useAppContext } from "@/context";
import constants from "@/utils/constants";
import { getPercentage, PiqToString } from "@/utils";

const CashoutSuccess = () => {
  const { gameStatus, appData, changeStatus, appDataTemp, eventData } =
    useAppContext();
  const [percentage, setPercentage] = useState("0.00");

  useEffect(() => {
    if (eventData.payout > 0) {
      const percent = getPercentage(
        (eventData.stakingRewards * 100) / appDataTemp.deposit
      );
      setPercentage(percent);
    } else setPercentage("0.00");
  }, [eventData, appDataTemp]);

  return (
    <div className="fadein w-[264px] md:w-[600px] px-5 py-3.5 md:p-[26px] rounded-[10px] text-center bg-[#3E9C37E6]">
      <h3 className="mb-6 md:mb-9 text-xs md:text-2xl font-bold">
        Congratulations!
        <br />
        You successfully unstaked{" "}
        {gameStatus === constants.DEADLINE_1
          ? "your full"
          : "parts of your"}{" "}
        passive income!
      </h3>
      <div className="hidden md:block">
        <h4 className="mb-2.5 font-medium">Transaction hash:</h4>
        <p className="flex items-center gap-3 mb-8">
          <span className="text-sm font-medium">{appData.txHash}</span>
          <a
            href={`https://mumbai.polygonscan.com/tx/${appData.txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/images/open-link.svg"
              width={15}
              height={15}
              alt="open link"
            />
          </a>
        </p>
      </div>
      <ul className="max-w-[440px] flex flex-col gap-4 md:gap-6 mx-auto mb-5 md:mb-9">
        <li className="flex justify-between text-[10px] md:text-xl">
          <h4>Your total income</h4>
          <p className="font-semibold">
            {PiqToString(eventData.stakingRewards)} PIQ
          </p>
        </li>
        <li className="flex justify-between text-[10px] md:text-xl">
          <h4>Your deposit</h4>
          <p className="font-semibold">{appData.deposit} PIQ</p>
        </li>
        <li className="flex justify-between text-[10px] md:text-xl">
          <h4>Percentage yield</h4>
          <p className="font-semibold">{percentage}%</p>
        </li>
      </ul>
      <WhiteButton
        onClick={() => changeStatus(constants.okay, constants.success)}
      >
        OK
      </WhiteButton>
    </div>
  );
};

export default CashoutSuccess;
