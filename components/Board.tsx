import React from "react";
import styles from "../styles/Board.module.scss";

interface IBoardProps {
  word: string;
  position: string[];
}

function Board(props: IBoardProps) {
  const { word, position } = props;
  //   const boardString = word.split("");
  const boardString = word;
  return (
    <div className={styles.board}>
      {[...Array(5)].map((x, i) => (
        <div
          key={i}
          className={`${
            position[i] === "correct"
              ? styles.board__letter__green
              : position[i] === "present"
              ? styles.board__letter__green
              : position[i] === "absent"
              ? styles.board__letter__green
              : styles.board__letter
          }`}
        >
          <Tile letter={boardString && boardString[i]} />
        </div>
      ))}
    </div>
  );
}

interface ITileProps {
  letter?: string;
}

const Tile = (props: ITileProps) => {
  const { letter } = props;

  return <div className={styles.tile}>{letter || " "}</div>;
};

export default Board;
