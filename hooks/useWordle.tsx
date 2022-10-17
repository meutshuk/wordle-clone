import { randomInt } from "crypto";
import React from "react";
import { WORDS } from "../assets/words";

const useWordle = () => {
  const [boardWords, setBoardWords] = React.useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [wordNumber, setWordNumber] = React.useState(0);
  const [gameWon, setGameWon] = React.useState(false);
  const [wordChecked, setWordChecked] = React.useState<string[][]>([]);
  //   const [correctWord, setCorrectWord] = React.useState(
  //     WORDS[Math.floor(Math.random() * 10)]
  //   );
  const correctWord = "apple";

  const handleKeyUp = ({ key }: KeyboardEvent) => {
    if (/^[a-zA-Z]$/.test(key)) {
      addWord(key.toLowerCase());
    }

    if (key === "Backspace") {
      removeWord();
    }

    console.log(boardWords[wordNumber]);

    if (boardWords[wordNumber].length == 5 && key === "Enter") {
      handleEnter();
    }
  };

  const handleEnter = () => {
    const word = boardWords[wordNumber];

    if (WORDS.includes(word.toLowerCase())) {
      console.log("word found");
      checkWord(word);
      setWordNumber((prev) => prev + 1);
    } else {
      alert("Word not found");
      return;
    }
  };

  //   const checkWord = (word: string) => {
  //     let letter;

  //     console.log("check word function");
  //     for (let i = 0; i < 5; i++) {
  //       let letterPosition = correctWord.indexOf(word[i]);
  //       if (letterPosition === -1) {
  //         letter = "absent";
  //       } else {
  //         if (word[i] === correctWord[i]) {
  //           // shade green
  //           letter = "correct";
  //         } else {
  //           // shade box yellow
  //           letter = "present";
  //         }
  //       }
  //       setWordChecked((prev) => {

  //       });
  //     }
  //   };

  const addWord = (char: string) => {
    setBoardWords((prev) => {
      const newBoardWords = [...prev];
      newBoardWords[wordNumber] = newBoardWords[wordNumber] + char;
      return newBoardWords;
    });
  };

  const removeWord = () => {
    setBoardWords((prev) => {
      const newBoardWords = [...prev];
      newBoardWords[wordNumber] = newBoardWords[wordNumber].slice(0, -1);
      return newBoardWords;
    });
  };

  return { addWord, removeWord, handleKeyUp, boardWords };
};

export default useWordle;
