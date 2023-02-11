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
  Scores: undefined;
  Trophies: undefined;
};

//* Database
export interface userData_DB {
  Scores: scoresArrayElement_DB[];
  TotalScore: number;
  email: string;
  uid: string;
  username: string;
  Trophies: trophy_DB[];
}

export interface scoresArrayElement_DB {
  score: number;
  date: { day: number; month: number; year: number; total: number };
  usedHints: number;
  attempts: number;
}

export interface trophy_DB {
  name: string;
  costs: number;
  available: boolean;
  active: boolean;
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
