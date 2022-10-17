import React from "react";
import styles from "../styles/Keyboard.module.scss";

interface IKeyboardProps {
  onEnter: (word: string) => void;
  onAdd: (letter: string) => void;
  onDelete: () => void;
  keyboardWords: {};
}

function Keyboard(props: IKeyboardProps) {
  const { onEnter, onAdd, onDelete, keyboardWords } = props;

  const onClick = (value?: string) => {
    if (value === "ENTER") {
      onEnter("apple");
    } else if (value === "DELETE") {
      onDelete();
    } else {
      value && onAdd(value.toLowerCase());
    }
  };

  //   console.log("object", keyboardWords["A"]);
  return (
    <div>
      {/* <div className="mb-1 flex justify-center"> */}
      <div className={styles.keyboard}>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key
            key={key}
            value={key}
            onClick={onClick}
            status={keyboardWords[key.toLowerCase()]}
            // status={charStatuses[key]}
            // isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className={styles.keyboard}>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <Key
            key={key}
            value={key}
            status={keyboardWords[key.toLowerCase()]}
            onClick={onClick}
            // status={charStatuses[key]}
            // isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className={styles.keyboard}>
        <Key width={65.4} value="ENTER" onClick={onClick}>
          Enter
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key
            key={key}
            value={key}
            status={keyboardWords[key.toLowerCase()]}
            onClick={onClick}
            // status={charStatuses[key]}
            // isRevealing={isRevealing}
          />
        ))}
        <Key onClick={onClick} width={65.4} value="DELETE">
          Delete
        </Key>
      </div>
    </div>
  );
}

export default Keyboard;

interface IKeyProps {
  value: string;
  width?: number;
  children?: React.ReactNode;
  status?: string;
  onClick: (value: string) => void;
}

const Key = (props: IKeyProps) => {
  const { children, width, value, status, onClick } = props;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  return width ? (
    <button onClick={handleClick} className={styles.key__special}>
      {children || value}
    </button>
  ) : (
    <button
      onClick={handleClick}
      //   ={() => onClick(value)}
      className={`${styles.key} ${
        status == "correct"
          ? styles.green
          : status == "present"
          ? styles.yellow
          : status == "absent"
          ? styles.grey
          : ""
      }`}
    >
      {children || value}
    </button>
  );
};
