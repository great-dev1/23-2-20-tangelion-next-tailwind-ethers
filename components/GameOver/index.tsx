import { useAppContext } from "@/context";
import Button from "../Button";
import TxPending from "../TxPending";
import TxSuccess from "../TxSuccess";
import TxFailed from "../TxFailed";
import constants from "@/utils/constants";

const GameOver = () => {
  const { actionStatus, txStatus, appData, changeStatus } = useAppContext();

  return (
    <>
      {actionStatus === constants.DISPLAY && (
        <div className="fadein w-[311px] md:w-[863px] px-4 md:px-[80px] pt-3.5 md:pt-5 pb-5 md:pb-7 rounded-[10px] text-center bg-[#127FBCE6]">
          <h2 className="mb-4 md:mb-9 text-[14px] md:text-[40px] font-bold md:leading-[50px] uppercase">
            Game Over
          </h2>
          <ul className="max-w-[247px] md:max-w-[540px] mx-auto mb-8 md:mb-12 text-[10px] md:text-xl leading-4 md:leading-[25px] text-[#D9D9D9E6]">
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
                <h3>Total game income*:</h3>
                <h4 className="font-semibold">{appData.earningOfGame} PIQ</h4>
              </li>
            )}
            <p className="-mt-1 mb-3 text-left text-[6px] leading-[10px] md:text-xs">
              *last update: {appData.lastUpdate}
            </p>
            <li className="flex justify-between">
              <h3>Staking advantage over new players:</h3>
              <h4 className="font-semibold">+{appData.advantage} %</h4>
            </li>
          </ul>

          <p className="text-shadow max-w-[240px] md:max-w-[577px] mx-auto mb-5 md:mb-12 text-xs md:text-2xl leading-4 md:leading-[30px] font-semibold text-[#D2FBE2]">
            You missed the 30-day deadline after level completion.
          </p>
          <p className="text-shadow max-w-[240px] md:max-w-[577px] mx-auto mb-11 md:mb-16 text-xs md:text-2xl leading-4 md:leading-[30px] font-semibold text-[#D2FBE2]">
            Your deposit and your income are burned.
          </p>
          <Button onClick={() => changeStatus(constants.remove)}>
            Remove Stake
          </Button>
        </div>
      )}
      {actionStatus === constants.REMOVE && (
        <>
          {txStatus === constants.PENDING && (
            <TxPending title="Transaction pending" />
          )}
          {txStatus === constants.LOADING && (
            <TxPending title="Loading. Please wait..." />
          )}
          {txStatus === constants.SUCCESS && <TxSuccess />}
          {txStatus === constants.FAILED && <TxFailed />}
        </>
      )}
    </>
  );
};

export default GameOver;
