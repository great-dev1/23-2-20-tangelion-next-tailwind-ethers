import TxPending from "../TxPending";
import { useAppContext } from "@/context";
import constants from "@/utils/constants";

const CutScene = ({ no }: { no: number }) => {
  const { setGameStatus, readOnly, videoLoading, setVideoLoading } =
    useAppContext();

  const setSrc = (no: number) => {
    if (window.innerWidth < 1280) {
      return `/videos/cutscene_${no}_720p.mp4`;
    } else if (window.innerWidth < 1920) {
      return `/videos/cutscene_${no}_1080p.mp4`;
    } else {
      return `/videos/cutscene_${no}_4k.mp4`;
    }
  };

  const handleOnEnded = async () => {
    if (no === 1) {
      setGameStatus(constants.NEW_GAME);
    } else {
      await readOnly();
      setGameStatus(constants.STAKING);
    }
    setVideoLoading(true);
  };

  return (
    <>
      {videoLoading && <TxPending title="Loading. Please wait..." />}
      <video
        className={`fadein absolute ${
          videoLoading ? "z-[-1]" : ""
        } top-0 left-0 w-full h-full`}
        autoPlay
        onEnded={handleOnEnded}
        onPlay={() => setVideoLoading(false)}
      >
        <source src={setSrc(no)} type="video/mp4" />
      </video>
    </>
  );
};

export default CutScene;
