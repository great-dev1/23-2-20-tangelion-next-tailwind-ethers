import Image from "next/image";

const Tutorial3 = ({
  gotoChapter,
  closeChapter,
}: {
  gotoChapter: (id: number) => void;
  closeChapter: (id: number) => void;
}) => {
  return (
    <div className="mt-5 p-6 md:pt-14 md:pb-8 bg-[#161F3E]">
      <div className="max-w-[850px] mx-auto mb-10 text-xs md:text-xl">
        <p>
          The network’s staking difficulty increases day by day, so it only goes
          up and never goes down. When you start a game, you secure the staking
          difficulty of the day when you started, and it remains constant for
          you until the end of your level.
          <br />
          <br />
          As opposed to the network’s staking difficulty, your own staking
          difficulty may well get lower, this happens every time you level up;
          read{" "}
          <button
            onClick={() => gotoChapter(4)}
            className="font-bold underline"
          >
            Game Levels
          </button>{" "}
          for more details.
          <br />
          A player’s staking difficulty is decisive for his weighting in the
          rewards payout round. The lower its value, the higher the weighting.
          <br />
          <br />
          The earlier you start the game, the higher your weighting because the
          network’s staking difficulty steadily goes up each day.
        </p>

        <p className="my-4 md:my-8">
          Find more detailed information in the{" "}
          <a
            className="font-bold underline text-[#F2E144]"
            href="/pdfs/Whitepaper Tangelion.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Whitepaper
          </a>
          .
        </p>
      </div>

      <div className="md:px-[106px]">
        <Image
          className="mx-auto"
          src="/images/tutorial-3.png"
          width={1201}
          height={525}
          alt="tutorial 3"
        />
      </div>

      <div className="flex justify-end mt-4 md:px-8">
        <button onClick={() => closeChapter(3)}>
          <Image
            className="w-5 md:w-10 h-auto"
            src="/images/arrow-up.svg"
            width={40}
            height={40}
            alt="arrow up"
          />
        </button>
      </div>
    </div>
  );
};

export default Tutorial3;
