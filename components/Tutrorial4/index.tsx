import Image from "next/image";

const Tutorial4 = ({
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
          The game is divided into twelve levels, when you start a game, you
          begin with level 1. A level is basically a period of 30 days. When you
          start a level, it always begins on the following day and ends exactly
          30 days later. During these 30 days, your stake generates a passive
          income by participating in the daily reward payout rounds, you don’t
          need to do anything but to wait for the level to complete.
          <br />
          Note, that it’s not possible to stop the game or cash out in the
          middle of a level.
          <br />
          <br />
          Once a level is completed, you have two options: either finishing the
          game and cashing out, or continuing staking by leveling up.
          <br />
          <br />
          Every time you level up, your{" "}
          <button
            onClick={() => gotoChapter(3)}
            className="font-bold underline"
          >
            staking difficulty
          </button>{" "}
          decreases by 4%. You can level up eleven times during a game, which
          leads to an enormous staking difficulty advantage of about 44% over
          new players in level 12.
          <br />
          <br />
          In addition, the rewards of past levels add up to your stake, which
          further increases your weighting in the reward payout rounds.
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
          src="/images/tutorial-4.png"
          width={1203}
          height={509}
          alt="tutorial 4"
        />
      </div>

      <div className="flex justify-end mt-4 md:px-8">
        <button onClick={() => closeChapter(4)}>
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

export default Tutorial4;
