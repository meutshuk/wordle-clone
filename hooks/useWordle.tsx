import React, { Key, useEffect } from "react";
import { WORDS } from "../assets/words";
import { IKeyboardWords } from "../types/interface";
import toast from "react-hot-toast";
import { setLocalStorage } from "../util/utils";

const useWordle = () => {
  //   const correctWord = "apple";

  const correctWord = WORDS[Math.floor(Math.random() * 5757)];
  console.log(correctWord);

  const [wordNumber, setWordNumber] = React.useState(0);
  const [keyboardWords, setKeyboardWords] = React.useState<IKeyboardWords>({});
  const [gameStatus, setGameStatus] = React.useState("playing");
  const [boardWords, setBoardWords] = React.useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [wordChecked, setWordChecked] = React.useState<string[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  useEffect(() => {
    if (wordNumber === 6) {
      toast(correctWord.toUpperCase(), {
        style: {
          marginTop: "rem",
          width: "10rem",
          border: "2px solid #976a6a",
          background: "#ffffff",
          color: "#000000",
          fontSize: "1.5rem",
          fontWeight: "bold",
        },
      });
      setGameStatus("lost");
    }
  }, [wordNumber]);

  const handleKeyUp = ({ key }: KeyboardEvent) => {
    if (gameStatus === "won" || gameStatus === "lost") return;

    // * Check regex for key with a-z and A-Z
    if (/^[a-zA-Z]$/.test(key)) {
      addWord(key.toLowerCase());
    }

    if (key === "Backspace") {
      removeWord();
    }

    if (key === "Enter") {
      handleEnter();
    }
  };

  const handleEnter = () => {
    const word = boardWords[wordNumber];

    if (word.length < 5) {
      toast("Not enough word", {
        style: {
          marginTop: "rem",
          width: "10rem",
          border: "2px solid #976a6a",
          background: "#ffffff",
          color: "#000000",
          fontSize: "1rem",
          fontWeight: "bold",
          fontFamily: "sans-serif",
        },
      });
      return;
    }

    if (WORDS.includes(word.toLowerCase())) {
      checkWord(word);
      setWordNumber((prev) => prev + 1);
    } else {
      toast("Not in the word list", {
        style: {
          marginTop: "rem",
          width: "10rem",
          border: "2px solid #976a6a",
          background: "#ffffff",
          color: "#000000",
          fontSize: "1rem",
          fontWeight: "bold",
          fontFamily: "sans-serif",
        },
      });
      return;
    }

    if (word === correctWord) {
      setGameStatus("won");
      toast("You Win", {
        icon: "👏",
        style: {
          marginTop: "rem",
          width: "10rem",
          border: "2px solid #976a6a",
          background: "#ffffff",
          color: "#000000",
          fontSize: "1.5rem",
          fontWeight: "bold",
        },
      });
    }
  };

  const checkWord = (word: string) => {
    for (let i = 0; i < 5; i++) {
      let letter: string;
      let letterPosition = correctWord.indexOf(word[i]);

      if (letterPosition === -1) {
        letter = "absent";
      } else {
        letter = word[i] === correctWord[i] ? "correct" : "present";
      }
      setWordChecked((prev) => {
        const newWordChecked = [...prev];
        newWordChecked[wordNumber][i] = letter;
        return newWordChecked;
      });
      shadeKeyboardLetter(word[i], letter);
    }
  };

  

  const shadeKeyboardLetter = (letter: string, style: string) => {
    setKeyboardWords((prev) => {
      const newKeyboardWords = { ...prev };

      newKeyboardWords[letter] =
        newKeyboardWords[letter] === "correct" ? "correct" : style;
      return newKeyboardWords;
    });
  };

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

  return {
    addWord,
    removeWord,
    handleEnter,
    handleKeyUp,
    boardWords,
    wordChecked,
    keyboardWords,
  };
};

export default useWordle;
