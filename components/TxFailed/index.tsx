import WhiteButton from "../WhiteButton";
import { useAppContext } from "@/context";
import constants from "@/utils/constants";

const TxFailed = () => {
  const { changeStatus } = useAppContext();

  return (
    <div className="flex flex-col items-center w-[221px] md:w-[438px] h-[102px] md:h-[206px] p-4 md:pt-9 md:pb-[26px] rounded-[10px] text-center bg-[#515151]">
      <h3 className="mb-auto md:mb-3 text-xs md:text-2xl font-bold">
        Transaction failed!
      </h3>
      <h4 className="hidden md:block mb-auto text-xl font-medium">
        Please try again
      </h4>
      <WhiteButton
        onClick={() => changeStatus(constants.okay, constants.failed)}
      >
        OK
      </WhiteButton>
    </div>
  );
};

export default TxFailed;
