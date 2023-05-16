import Image from "next/image";
import WhiteButton from "../WhiteButton";
import { useAppContext } from "@/context";
import constants from "@/utils/constants";
import { PiqToString } from "@/utils";

const LevelUpSuccess = () => {
  const { appData, changeStatus, eventData } = useAppContext();

  return (
    <div className="fadein w-[264px] md:w-[600px] px-5 py-3.5 md:p-[26px] rounded-[10px] text-center bg-[#3E9C37E6]">
      <h3 className="mb-6 md:mb-9 text-xs md:text-2xl font-bold">
        Congratulations!
        <br />
        You successfully progressed to level {appData.level + 1}
      </h3>
      <div className="hidden md:block mb-8">
        <h4 className="mb-2.5 font-medium">Transaction hash:</h4>
        <p className="flex items-center gap-3">
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
      <ul className="max-w-[440px] flex flex-col gap-6 mx-auto mb-5 md:mb-9">
        <li className="flex justify-between text-[10px] md:text-xl">
          <h4>Your level {appData.level} income</h4>
          <p className="font-semibold">
            {PiqToString(eventData.stakingRewards)} PIQ
          </p>
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

export default LevelUpSuccess;
