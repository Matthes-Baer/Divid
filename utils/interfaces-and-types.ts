//* Navigation
export type RootStackParamList = {
  Start: undefined;
};

//* Authentication
export type Not_Authenticated_Screens_Type = {
  Start: undefined;
  Not_Authenticated_Home: undefined;
  Login: undefined;
  Register: undefined;
};

export type Authenticated_Screens_Type = {
  Start: undefined;
  Home: undefined;
  Game: undefined;
};

//* Database
export interface database_userData {
  email: string;
  username: string;
}

export interface databaseTopScores {
  score: number;
  date: Date;
  usedHints: number;
}

//* Game
export type Gamemode = { mode: string; factor: number };

export interface Hint {
  number: number;
  dividable: boolean;
  used: boolean;
}

export type additionalHint = { larger: boolean };

export interface HintItemProps {
  hintNumber: number;
  hintDividable: boolean;
  hintUsed: boolean;
}
