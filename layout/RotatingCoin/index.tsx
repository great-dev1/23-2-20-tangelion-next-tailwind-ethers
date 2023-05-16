import { useRouter } from "next/router";
import Image from "next/image";
import { useAppContext } from "@/context";
import constants from "@/utils/constants";

const RotatingCoin = () => {
  const { pathname } = useRouter();
  const { gameStatus, appData } = useAppContext();

  return (
    <>
      {pathname === "/" && gameStatus === constants.STAKING && (
        <Image
          className="w-[10.6vh] translate-x-[11.8vh] translate-y-[2.6vh]"
          src={`/images/coin-${appData.level}.gif`}
          width={100}
          height={100}
          alt="coin"
        />
      )}
    </>
  );
};

export default RotatingCoin;
