import { useAppContext } from "@/context";
import Button from "../Button";
import TxPending from "../TxPending";
import CashoutSuccess from "../CashoutSuccess";
import LevelUpSuccess from "../LevelUpSuccess";
import TxFailed from "../TxFailed";
import constants from "@/utils/constants";

const Deadline1 = () => {
  const { actionStatus, txStatus, appData, changeStatus } = useAppContext();

  return (
    <>
      {actionStatus === constants.DISPLAY && (
        <div className="fadein w-[311px] md:w-[863px] px-4 md:px-[80px] pt-3.5 md:pt-5 pb-5 md:pb-7 rounded-[10px] text-center bg-[#127FBCE6]">
          <h2 className="mb-4 md:mb-9 text-[14px] md:text-[40px] font-bold md:leading-[50px] uppercase">
            Level {appData.level} Completed
          </h2>
          <ul className="max-w-[247px] md:max-w-[540px] mx-auto mb-6 md:mb-12 text-[10px] md:text-xl leading-4 md:leading-[25px]">
            <li className="flex justify-between">
              <h3>Deposit:</h3>
              <h4 className="font-semibold">{appData.deposit} PIQ</h4>
            </li>
            <li className="flex justify-between">
              <h3>Level {appData.level} income*:</h3>
              <h4 className="font-semibold">{appData.earningOfLevel} PIQ</h4>
            </li>
            {appData.level > 1 && (
              <li className="flex justify-between">
                <h3>Total income*:</h3>
                <h4 className="font-semibold">{appData.earningOfGame} PIQ</h4>
              </li>
            )}
            <p className="-mt-1 mb-3 text-left text-[6px] leading-[10px] md:text-xs">
              *last update: {appData.lastUpdate}
            </p>
            <li className="flex justify-between">
              <h3 className="text-left leading-tight">
                Staking advantage over
                <br className="md:hidden" /> new stakers:
              </h3>
              <h4 className="font-semibold text-[#9FFB98]">
                +{appData.advantage} %
              </h4>
            </li>
          </ul>
          <p className="text-shadow max-w-[240px] md:max-w-[577px] mx-auto mb-8 md:mb-12 text-xs md:text-2xl leading-4 md:leading-[30px] font-semibold text-[#D2FBE2]">
            <span className="underline">
              {appData.deadline1Days === 1
                ? "Last day"
                : `${appData.deadline1Days} days left`}
            </span>{" "}
            before you lose your level {appData.level} income
            {appData.level < 12 && " and your right to level up"}.
          </p>
          <div
            className={`flex ${
              appData.level < 12 ? "justify-between gap-6" : "justify-center"
            } `}
          >
            <div className="max-w-[204px]">
              {appData.level < 12 && (
                <p className="mb-4 text-[10px] md:text-base leading-3 md:leading-[20px] font-medium">
                  Stop staking and cash out your total income together with your
                  deposit
                </p>
              )}
              <Button onClick={() => changeStatus(constants.unstake)}>
                Cash Out
              </Button>
            </div>

            <div className="max-w-[204px]">
              {appData.level < 12 && (
                <>
                  <div className="flex items-center mb-4">
                    <p className="text-[10px] md:text-base leading-3 md:leading-[20px] font-medium">
                      Proceed to level {appData.level + 1} and get additional{" "}
                      <span className="text-[#9FFB98]">+4% advantage</span> over
                      new stakers
                    </p>
                  </div>
                  <Button onClick={() => changeStatus(constants.level_up)}>
                    Level Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {actionStatus === constants.UNSTAKE && (
        <>
          {txStatus === constants.PENDING && (
            <TxPending title="Transaction pending" />
          )}
          {txStatus === constants.LOADING && (
            <TxPending title="Loading. Please wait..." />
          )}
          {txStatus === constants.SUCCESS && <CashoutSuccess />}
          {txStatus === constants.FAILED && <TxFailed />}
        </>
      )}
      {actionStatus === constants.LEVEL_UP && (
        <>
          {txStatus === constants.PENDING && (
            <TxPending title="Transaction pending" />
          )}
          {txStatus === constants.LOADING && (
            <TxPending title="Loading. Please wait..." />
          )}
          {txStatus === constants.SUCCESS && <LevelUpSuccess />}
          {txStatus === constants.FAILED && <TxFailed />}
        </>
      )}
    </>
  );
};

export default Deadline1;
