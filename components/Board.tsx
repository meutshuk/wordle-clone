import React from "react";
import styles from "../styles/Board.module.scss";
import { IBoardProps, ITileProps } from "../types/interface";

function Board(props: IBoardProps) {
  const { word, position } = props;

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
              ? styles.board__letter__yellow
              : position[i] === "absent"
              ? styles.board__letter__grey
              : styles.board__letter
          }`}
        >
          <Tile letter={boardString && boardString[i]} />
        </div>
      ))}
    </div>
  );
}

const Tile = (props: ITileProps) => {
  const { letter } = props;

  return <div className={`${styles.tile}`}>{letter || " "}</div>;
};

export default Board;
