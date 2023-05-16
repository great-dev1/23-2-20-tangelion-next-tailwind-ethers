import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../Button";
import TxPending from "../TxPending";
import TxSuccess from "../TxSuccess";
import TxFailed from "../TxFailed";
import { useAppContext } from "@/context";
import constants from "@/utils/constants";
import { bigintToString, getEstimatedRewards, PiqToString } from "@/utils";

const NewGame = () => {
  const [deposit, setDeposit] = useState<string>("1");
  const { actionStatus, txStatus, appData, changeStatus, appDataTemp } =
    useAppContext();
  const [estimatedEarning, setEstimatedEarning] = useState<string>("1");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.value === "") {
      setDeposit("");
      return;
    }
    const RegExp = /^\d*\.?\d*$/;
    if (e.target.value === "" || RegExp.test(e.target.value)) {
      if (Number(e.target.value) < 1 || e.target.value === ".") {
        setDeposit("1");
        return;
      }
      if (e.target.value.split(".")[1]?.length > 8) {
        return;
      }
      setDeposit(e.target.value);
    }
  };

  const handleStart = () => {
    if (deposit === "") {
      setDeposit("1");
      return;
    }

    if (Number(deposit) * 1e8 > appDataTemp.balance) {
      setTimeout(() => {
        setDeposit(bigintToString(appDataTemp.balance));
      }, 1000);
    }
    if (appData.balance < 1) {
      return;
    }
    changeStatus(constants.start, deposit);
  };

  useEffect(() => {
    let temp = getEstimatedRewards(deposit, appData);
    if (temp > Number(deposit) * 1e7) {
      setEstimatedEarning(PiqToString(Number(deposit) * 1e7));
    } else {
      setEstimatedEarning(PiqToString(temp));
    }
  }, [appData, deposit]);

  return (
    <>
      {(actionStatus === constants.DISPLAY ||
        actionStatus === constants.BLINK) && (
        <div className="fadein w-[227px] md:w-[744px] lg:w-[863px] pt-2.5 pb-4 md:px-[45px] md:py-[27px] rounded-[10px] text-center bg-[#127FBCE6]">
          <h2 className="mb-4 md:mb-[62px] text-xl leading-[25px] md:text-[40px] font-bold md:leading-[50px] uppercase">
            New Stake
          </h2>
          <div className="flex flex-col md:flex-row justify-between gap-7 md:gap-0 mb-[26px] md:mb-8">
            {/* Enter your deposit (PIQ) */}
            <div className="flex flex-col items-center md:gap-[13px]">
              <h3 className="mb-1.5 md:mb-0 text-xs leading-[15px] md:text-xl md:leading-[25px]">
                Enter your
                <br className="hidden md:block" /> deposit (PIQ)
              </h3>
              <p className="md:hidden mb-1.5 text-[8px] font-bold text-[#F2E144]">
                Balance: {appData.balance} PIQ
              </p>
              <input
                className={`${
                  actionStatus === constants.BLINK ? "blink" : ""
                } w-[140px] md:w-[250px] h-8 md:h-[50px] pt-1 px-2 md:px-[25px] border border-[#DAC94C] rounded text-center md:text-right text-xs md:text-xl font-bold text-black`}
                id="deposit"
                name="deposit"
                autoComplete="off"
                value={deposit}
                onChange={(e) => handleChange(e)}
                onFocus={() => {
                  if (deposit === "1") setDeposit("");
                }}
              />
              <p className="mt-1.5 md:mt-0 text-[8px] md:text-[13px]">
                Min. amount 1 PIQ
              </p>
            </div>

            <div className="hidden md:flex flex-col items-center gap-3 pt-7 text-[#DAC94C]">
              <h3 className="text-xl font-bold">1st level</h3>
              <Image
                src="/images/arrow.svg"
                width={139}
                height={36}
                alt="arrow"
              />
              <p className="text-xl leading-[25px]">
                30 days
                <br /> runtime
              </p>
            </div>

            {/* Estimated rewards (PIQ) */}
            <div className="flex flex-col items-center gap-[13px]">
              <h3 className="text-xs leading-[15px] md:text-xl md:leading-[25px]">
                Estimated staking
                <br className="hidden md:block" /> income (PIQ)
                <br />
                <span className="md:hidden">after 30 days runtime</span>
              </h3>
              <input
                className="w-[140px] md:w-[250px] h-8 md:h-[50px] pt-1 px-2 md:px-[25px] border border-[#DAC94C] rounded text-center md:text-right text-xs md:text-xl font-bold bg-[#DAC94C9E]"
                id="estimatedEarning"
                name="estimatedEarning"
                value={estimatedEarning}
                readOnly
              />
            </div>
          </div>
          <Button onClick={handleStart}>Start Staking</Button>
        </div>
      )}
      {actionStatus === constants.START && (
        <>
          {txStatus === constants.PENDING && (
            <TxPending title="Transaction pending" />
          )}
          {txStatus === constants.SUCCESS && <TxSuccess />}
          {txStatus === constants.FAILED && <TxFailed />}
        </>
      )}
    </>
  );
};

export default NewGame;
