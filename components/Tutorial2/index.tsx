import Image from "next/image";

const Tutorial2 = ({
  closeChapter,
}: {
  closeChapter: (id: number) => void;
}) => {
  return (
    <div className="mt-5 p-6 md:pt-14 md:pb-8 bg-[#161F3E]">
      <div className="max-w-[850px] mx-auto mb-10 text-xs md:text-xl">
        <p>
          You need to enter the amount of PIQ tokens you want to deposit to your
          PIQ hub, with 1 PIQ being the minimum amount. The upper limit is your
          balance. Note, that your tokens will be locked for 30 days.
          <br />
          <br />
          The yellow box on the right-hand side gives you a rough estimation of
          your expected rewards if you were to start today, based on the deposit
          you typed in.
          <br />
          <br />
          The estimation is based on an assumption that today&apos;s conditions
          will not change for the next 30 days (totally staked PIQ tokens and
          their weighting). Whenever you type a number, the yield estimation
          gets updated accordingly in real-time.
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
          src="/images/tutorial-2.png"
          width={1221}
          height={551}
          alt="tutorial 2"
        />
      </div>

      <div className="flex justify-end mt-4 md:px-8">
        <button onClick={() => closeChapter(2)}>
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

export default Tutorial2;
