export interface IKeyboardWords {
  [Key: string]: string;
}

export interface IBoardProps {
  word: string;
  position: string[];
}

export interface ITileProps {
  letter?: string;
}

export interface IKeyboardProps {
  onEnter: (word: string) => void;
  onAdd: (letter: string) => void;
  onDelete: () => void;
  keyboardWords: IKeyboardWords;
}

export interface IKeyProps {
  value: string;
  width?: number;
  children?: React.ReactNode;
  status?: string;
  onClick: (value: string) => void;
}
