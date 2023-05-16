import Image from "next/image";

const StepsData = [
  {
    id: "a",
    title: "Deposit",
    description:
      "The player’s deposit is the most important factor for his weighting. The higher the deposit, the higher the weighting.",
  },
  {
    id: "b",
    title: "Stake",
    description:
      "In level 1, the player’s stake is his deposit. However, whenever a player levels up, he reinvests his rewards which means they add up to his deposit. So, in higher levels, the stake is the sum of the player’s deposit and his total rewards from past levels.",
    example:
      "For example, in level 5 the stake is equal to the player’s deposit + his total rewards from level 1 to level 4.",
  },
  {
    id: "c",
    title: "Staking difficulty",
    description:
      "The lower the player’s staking difficulty, the higher his weighting.",
  },
  {
    id: "d",
    title: "Level",
    description:
      "The player’s difficulty gets constantly lower with each level, and the stake gets higher. Therefore, the higher the player’s level, the higher his weighting.",
  },
  {
    id: "e",
    title: "The other players‘ stake and their difficulty",
    description:
      "The fewer players with lower stakes, the higher the player’s rewards.",
  },
];

const Tutorial1 = ({
  closeChapter,
}: {
  closeChapter: (id: number) => void;
}) => {
  return (
    <div className="mt-5 p-6 md:pt-14 md:pb-8 bg-[#161F3E]">
      <div className="max-w-[850px] mx-auto mb-10 text-xs md:text-xl">
        <p>
          In the first 12 months after launch, 4,000 PIQ are distributed daily
          among all active players by the smart contract. This amount decreases
          by 8.4% per year within the first 12 years down to ~1,524 PIQ/day in
          the twelfth year. After this value is reached, it remains constant
          throughout the rest of the token distribution lifecycle. Players can
          gain up to 10% profit per level on their stake, and up to 214% profit
          on their deposit per game. The exact amount a player gets depends on
          his weighting compared to other players’ weightings. The goal is to
          maximize the weighting in order to get as many PIQ as possible. The
          main parameters for one’s weighting are listed below:
        </p>

        <ul className="mt-4 md:mt-8 pl-4 md:pl-6">
          {StepsData.map((el) => (
            <li key={el.id}>
              <p>
                {el.id}. {el.title}:
              </p>
              <p className="mb-4 md:mb-8 pl-5">{el.description}</p>
              {el.example && <p className="mb-4 md:mb-8 pl-5">{el.example}</p>}
            </li>
          ))}
        </ul>

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
          src="/images/tutorial-1.png"
          width={1300}
          height={459}
          alt="tutorial 1"
        />
      </div>

      <div className="flex justify-end mt-4 md:px-8">
        <button onClick={() => closeChapter(1)}>
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

export default Tutorial1;
