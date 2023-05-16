import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/layout";
import Tutorial1 from "@/components/Tutorial1";
import Tutorial2 from "@/components/Tutorial2";
import Tutorial3 from "@/components/Tutorial3";
import Tutorial4 from "@/components/Tutorial4";
import Tutorial5 from "@/components/Tutorial5";

const Tutorial: NextPage = () => {
  const [openChapters, setOpenChapters] = useState<number[]>([]);

  const openChapter = (id: number) => {
    setOpenChapters([...openChapters, id]);
  };

  const closeChapter = (id: number) => {
    let temp = openChapters;
    const index = temp.findIndex((el) => el === id);
    temp.splice(index, 1);
    setOpenChapters([...temp]);
  };

  const toggleChapter = (id: number) => {
    if (!openChapters.includes(id)) {
      openChapter(id);
    } else {
      closeChapter(id);
    }
  };

  const gotoChapter = (id: number) => {
    if (!openChapters.includes(id)) {
      openChapter(id);
    }

    const activeTutorial = document.getElementById(`tutorial${id}`);

    if (activeTutorial) {
      activeTutorial.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ChaptersData = [
    {
      id: 1,
      title: "Rules of the Game",
      content: <Tutorial1 closeChapter={closeChapter} />,
    },
    {
      id: 2,
      title: "Starting the Game",
      content: <Tutorial2 closeChapter={closeChapter} />,
    },
    {
      id: 3,
      title: "Staking Difficulty",
      content: (
        <Tutorial3 gotoChapter={gotoChapter} closeChapter={closeChapter} />
      ),
    },
    {
      id: 4,
      title: "Game Levels",
      content: (
        <Tutorial4 gotoChapter={gotoChapter} closeChapter={closeChapter} />
      ),
    },
    {
      id: 5,
      title: "Deadlines after Level Completion",
      content: <Tutorial5 closeChapter={closeChapter} />,
    },
  ];

  return (
    <>
      <Head>
        <title>Tutorial</title>
      </Head>

      <Layout>
        <ul className="relative z-1 flex flex-col gap-6 md:gap-14 w-full py-7 md:py-20">
          {ChaptersData.map((el) => (
            <li key={el.id}>
              <div className="max-w-[850px] w-full mx-auto px-6 lg:px-0">
                <button
                  id={`tutorial${el.id}`}
                  className={`text-shadow text-left ${
                    openChapters.includes(el.id)
                      ? "text-base md:text-[40px]"
                      : "text-sm md:text-[32px]"
                  } md:leading-[40px] font-extrabold text-[#F2E144] duration-300`}
                  onClick={() => toggleChapter(el.id)}
                >
                  {el.title}
                </button>
              </div>
              <div
                className={`${
                  openChapters.includes(el.id) ? "max-h-[2000px]" : "max-h-0"
                } duration-1000 overflow-hidden`}
              >
                {el.content}
              </div>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
};

export default Tutorial;
