export type RootStackParamList = {
  Start: undefined;
};

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

export interface database_userData {
  email: string;
  username: string;
}
