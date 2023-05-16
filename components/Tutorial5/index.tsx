import Image from "next/image";

const Tutorial5 = ({
  closeChapter,
}: {
  closeChapter: (id: number) => void;
}) => {
  return (
    <div className="mt-5 p-6 md:pt-14 md:pb-8 bg-[#161F3E]">
      <div className="max-w-[850px] mx-auto mb-10 text-xs md:text-xl">
        <p>
          After a level is completed, have exactly 15 days to fully cash out or
          to level up.
          <br />
          <br />
          When you miss the first deadline, you miss the level-up option as well
          as your rewards of your current level, which is going to be burned.
          But you have another 15 days to cash out your deposit and the rewards
          from your past levels (your stake).
          <br />
          <br />
          In case you miss the second deadline as well, both your entire rewards
          and your deposit will get burned.
          <br />
          <br />
          But no worries, the UI notifies you about the remaining days to the
          corresponding deadlines.
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
          src="/images/tutorial-5.png"
          width={830}
          height={443}
          alt="tutorial 5"
        />
      </div>

      <div className="flex justify-end mt-4 md:px-8">
        <button onClick={() => closeChapter(5)}>
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

export default Tutorial5;
