import { useAppContext } from "@/context";
import Button from "../Button";
import TxPending from "../TxPending";
import CashoutSuccess from "../CashoutSuccess";
import TxFailed from "../TxFailed";
import constants from "@/utils/constants";

const Deadline2 = () => {
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
            {appData.level === 2 && (
              <li className="flex justify-between">
                <h3>Level 1 income:</h3>
                <h4 className="font-semibold">
                  {appData.earningOfCompleted} PIQ
                </h4>
              </li>
            )}
            {appData.level >= 3 && (
              <li className="flex justify-between">
                <h3>Level 1-{appData.level - 1} income:</h3>
                <h4 className="font-semibold">
                  {appData.earningOfCompleted} PIQ
                </h4>
              </li>
            )}
            <li className="flex justify-between text-[#D9D9D9E6]">
              <h3>Level {appData.level} income*:</h3>
              <h4 className="font-semibold">{appData.earningOfLevel} PIQ</h4>
            </li>
            <p className="-mt-1 text-left text-[6px] leading-[10px] md:text-xs text-[#D9D9D9E6]">
              *last update: {appData.lastUpdate}
            </p>
          </ul>

          {appData.level === 1 && (
            <>
              <p className="max-w-[250px] md:max-w-[546px] mx-auto mb-3 md:mb-6 text-[10px] md:text-xl font-medium md:leading-6 text-[#D9D9D9E6]">
                You missed the 15-day deadline for cashing out your level
                income.
              </p>
              <p className="text-shadow max-w-[240px] md:max-w-[577px] mx-auto mb-8 md:mb-12 text-xs md:text-2xl leading-4 md:leading-[30px] font-semibold text-[#D2FBE2]">
                Unstake{" "}
                {appData.deadline2Days === 1
                  ? "today"
                  : `within ${appData.deadline2Days} days`}{" "}
                to cash out your deposit.
              </p>
            </>
          )}
          {appData.level === 2 && (
            <>
              <p className="max-w-[250px] md:max-w-[546px] mx-auto mb-3 md:mb-6 text-[10px] md:text-xl font-medium md:leading-6 text-[#D9D9D9E6]">
                You missed the 15-day deadline for cashing out your level 2
                income.
              </p>
              <p className="text-shadow max-w-[240px] md:max-w-[577px] mx-auto mb-8 md:mb-12 text-xs md:text-2xl leading-4 md:leading-[30px] font-semibold text-[#D2FBE2]">
                Unstake{" "}
                {appData.deadline2Days === 1
                  ? "today"
                  : `within ${appData.deadline2Days} days`}{" "}
                to cash out your income from level 1 and your deposit.
              </p>
            </>
          )}
          {appData.level === 3 && (
            <>
              <p className="max-w-[250px] md:max-w-[546px] mx-auto mb-3 md:mb-6 text-[10px] md:text-xl font-medium md:leading-6 text-[#D9D9D9E6]">
                You missed the 15-day deadline, your level {appData.level + 1}{" "}
                income are burned.
              </p>
              <p className="text-shadow max-w-[240px] md:max-w-[577px] mx-auto mb-8 md:mb-12 text-xs md:text-2xl leading-4 md:leading-[30px] font-semibold text-[#D2FBE2]">
                Unstake{" "}
                {appData.deadline2Days === 1
                  ? "today"
                  : `within ${appData.deadline2Days} days`}{" "}
                to cash out your income from levels 1 and 2 and your deposit.
              </p>
            </>
          )}
          {appData.level >= 4 && (
            <>
              <p className="max-w-[250px] md:max-w-[546px] mx-auto mb-3 md:mb-6 text-[10px] md:text-xl font-medium md:leading-6 text-[#D9D9D9E6]">
                You missed the 15-day deadline, your level {appData.level}{" "}
                income are burned.
              </p>
              <p className="text-shadow max-w-[240px] md:max-w-[577px] mx-auto mb-8 md:mb-12 text-xs md:text-2xl leading-4 md:leading-[30px] font-semibold text-[#D2FBE2]">
                Unstake{" "}
                {appData.deadline2Days === 1
                  ? "today"
                  : `within ${appData.deadline2Days} days`}{" "}
                to cash out your income from levels 1 - {appData.level - 1} and
                your deposit.
              </p>
            </>
          )}

          <div
            className={`flex ${
              appData.level < 12 ? "justify-between gap-6" : "justify-center"
            } `}
          >
            <div className="max-w-[204px]">
              {appData.level < 12 && (
                <p className="mb-4 text-[10px] md:text-base leading-3 md:leading-[20px] font-medium">
                  Stop staking and cash out your stake.
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
                      You missed your chance to levelup.
                    </p>
                  </div>
                  <Button disabled>Level Up</Button>
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
    </>
  );
};

export default Deadline2;
