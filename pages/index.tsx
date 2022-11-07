import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { WORDS } from "../assets/words";
import Board from "../components/Board";
import Keyboard from "../components/Keyboard";
import useWordle from "../hooks/useWordle";
import styles from "../styles/Home.module.scss";
import "animate.css";

const Home: NextPage = () => {
  const {
    handleKeyUp,
    boardWords,
    wordChecked,
    keyboardWords,
    addWord,
    removeWord,
    handleEnter,
  } = useWordle();

  const [gameWon, setGameWon] = useState(false);
  const [loading, setLoading] = useState(true);
  // const startingDate = 1666011600

  // * Check the time to be 1 day

  useEffect(() => {
    // get unix Date

    const bw = ["", "", "", "", "", ""];

    if (!localStorage.getItem("boardWords")) {
      localStorage.setItem("boardWords", JSON.stringify(bw));
    }

    const unixDate = new Date().getTime();

    const firstdate = localStorage.getItem("date");
    if (!firstdate) {
      localStorage.setItem("date", unixDate.toString());
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Wordle Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.container}>
          <div className={styles.container__grid}>
            {[...Array(6)].map((word, index) => (
              <Board
                key={index}
                word={boardWords[index]}
                position={wordChecked[index]}
              />
            ))}
          </div>
          <div className={styles.container__keyboard}>
            <Keyboard
              onEnter={handleEnter}
              onAdd={addWord}
              onDelete={removeWord}
              keyboardWords={keyboardWords}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
