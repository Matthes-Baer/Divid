import {
  getDatabase,
  onValue,
  ref,
  set,
  update,
  push,
  child,
  query,
  orderByChild,
  orderByKey,
  orderByValue,
  get,
  startAt,
  endAt,
  DatabaseReference,
  ThenableReference,
  runTransaction,
  Query,
} from "firebase/database";
import type { userData_DB, trophy_DB } from "./interfaces-and-types";

//? Used for references
const db = getDatabase();

//? Create & Add Functions
export function createUser_DB(
  userId: string,
  username: string,
  email: string
): void {
  //* "set" for adding single entries.
  set(ref(db, "users/" + userId), {
    uid: userId as string,
    username: username as string,
    email: email as string,
    TotalScore: 0 as number,
    trophyImage: "None" as string,
  });

  const tropyArray: Array<trophy_DB> = [
    {
      name: "Apocalyptic Scene" as string,
      costs: 50 as number,
      available: false as boolean,
    },
    {
      name: "Asian City" as string,
      costs: 75 as number,
      available: false as boolean,
    },
    {
      name: "City Street" as string,
      costs: 125 as number,
      available: false as boolean,
    },
    {
      name: "Winter Alley" as string,
      costs: 150 as number,
      available: false as boolean,
    },
    {
      name: "Black Hole" as string,
      costs: 250 as number,
      available: false as boolean,
    },
    {
      name: "Castle In The Distance" as string,
      costs: 500 as number,
      available: false as boolean,
    },
    {
      name: "Futuristic City" as string,
      costs: 1000 as number,
      available: false as boolean,
    },
    {
      name: "City After Dark" as string,
      costs: 1500 as number,
      available: false as boolean,
    },
    {
      name: "Castle On The Mountain" as string,
      costs: 2000 as number,
      available: false as boolean,
    },
    {
      name: "Biopunk House" as string,
      costs: 2500 as number,
      available: false as boolean,
    },
    {
      name: "Inside" as string,
      costs: 3000 as number,
      available: false as boolean,
    },
    {
      name: "Warhammer 40k Space Marines" as string,
      costs: 3500 as number,
      available: false as boolean,
    },
    {
      name: "Fantasy Villa" as string,
      costs: 4000 as number,
      available: false as boolean,
    },
    {
      name: "Warhammer 40k Space Ships" as string,
      costs: 4500 as number,
      available: false as boolean,
    },
  ];

  const trophiesRef: DatabaseReference = ref(
    db,
    "users/" + userId + "/Trophies"
  );
  //* "update" for adding multiple entries at once.
  update(trophiesRef, {
    ApocalypticScene: tropyArray[0],
    AsianCity: tropyArray[1],
    CityStreet: tropyArray[2],
    WinterAlley: tropyArray[3],
    BlackHole: tropyArray[4],
    CastleInTheDistance: tropyArray[5],
    FuturisticCity: tropyArray[6],
    CityAfterDark: tropyArray[7],
    CastleOnTheMountain: tropyArray[8],
    BiopunkHouse: tropyArray[9],
    Inside: tropyArray[10],
    Warhammer40kSpaceMarines: tropyArray[11],
    FantasyVilla: tropyArray[12],
    Warhammer40kSpaceShips: tropyArray[13],
  });
}

export function addScore_DB(
  userId: string,
  score: number,
  date: { day: number; month: number; year: number; total: number },
  usedHints: number,
  attempts: number
): void {
  //? Adding to the same "list"
  const postListRef: DatabaseReference = ref(db, "users/" + userId + "/Scores");
  const newPostRef: ThenableReference = push(postListRef);
  set(newPostRef, {
    score,
    date: {
      day: date.day,
      month: date.month,
      year: date.year,
      total: date.total,
    },
    usedHints,
    attempts,
  });
}

//? Update Functions
export function updateSingleData_DB(
  userId: string,
  input: string | number,
  ...key: Array<string | number>
): void {
  const updates = {};
  updates["users/" + userId + key] = input;
  update(ref(db), updates);
}

export function updateSingleTrophyData_DB(
  userId: string,
  imageName: string,
  keyName: string,
  input: boolean
): void {
  const baseAddress: string = "users/" + userId + "/Trophies";
  const refTrophyArray: DatabaseReference = ref(db, baseAddress);

  //* OnValue would not work in this case due to the realtime change - crashes the app.
  get(refTrophyArray).then((snapshot) => {
    let imageKey: string;

    snapshot.forEach((childSnapshot) => {
      if (childSnapshot.val().name === imageName) {
        imageKey = childSnapshot.key;

        const updates = {};
        updates[baseAddress + `/${imageKey}` + `/${keyName}`] = input;
        update(ref(db), updates);
      }
    });
  });
}

export function updateTotalScore_DB(userId: string, inputValue: number): void {
  const currentValueRef = ref(db, "users/" + userId + "/TotalScore");

  //* runTransaction can be used to update based on the current value of a db reference without array (unlike set or update).
  runTransaction(currentValueRef, (currentValue) => {
    return currentValue + inputValue;
  });
}

//? Read Functions
export function readSpecificUserData_DB(userId: string, callback?: Function) {
  const value: DatabaseReference = ref(db, "users/" + userId);
  let data: userData_DB;

  onValue(value, (snapshot) => {
    data = snapshot.val();
    callback(data);
  });
}

export function readSortedScoresArray_DB(
  userId: string,
  callback?: Function
): void {
  //* Multiple Orders don't work at once with the realtime database - for such queries the Firebase Cloud Firestore would be needed.
  const queryRef: Query = query(
    ref(db, "users/" + userId + "/Scores"),
    orderByChild("score")
  );

  //* Reading Data once
  // get(que).then((snapshot) => {
  //   var result = [];

  //   snapshot.forEach((childSnapshot) => {
  //     result.push(childSnapshot.val());
  //   });
  //   callback ? callback(result) : null;
  //   console.log(result);
  // });

  //* Reading Data in realtime
  onValue(queryRef, (snapshot) => {
    var result = [];

    snapshot.forEach((childSnapshot) => {
      result.push(childSnapshot.val());
    });
    callback ? callback(result.reverse()) : null;
  });
}

export function readTopTenSortedScoresArray_DB(
  userId: string,
  callback?: Function
): void {
  //* Multiple Orders don't work at once with the realtime database - for such queries the Firebase Cloud Firestore would be needed.
  const queryRef: Query = query(
    ref(db, "users/" + userId + "/Scores"),
    orderByChild("score")
  );

  //* Reading Data in realtime
  onValue(queryRef, (snapshot) => {
    var result = [];

    snapshot.forEach((childSnapshot) => {
      result.push(childSnapshot.val());
    });
    callback ? callback(result.reverse().splice(0, 10)) : null;
  });
}

export function readAllUserData_DB(userId: string, callback?: Function): void {
  const refUser: DatabaseReference = ref(db, "users/" + userId);
  let result: userData_DB;

  onValue(refUser, (snapshot) => {
    result = snapshot.val();
  });

  callback ? callback(result) : null;
}

export function readTrophiesData_DB(
  userId: string,
  callback?: Function,
  sorted?: boolean,
  available?: boolean
): void {
  //* Multiple Orders don't work at once with the realtime database - for such queries the Firebase Cloud Firestore would be needed.
  let refUser: Query | DatabaseReference;
  refUser = sorted
    ? query(ref(db, "users/" + userId + "/Trophies"), orderByChild("costs"))
    : ref(db, "users/" + userId + "/Trophies");

  //* Reading Data in realtime
  onValue(refUser, (snapshot) => {
    let result: trophy_DB[] = [];

    snapshot.forEach((snapshotChild) => {
      result.push(snapshotChild.val());
    });

    callback
      ? available
        ? callback(result.filter((e: trophy_DB) => e.available))
        : callback(result)
      : null;
  });
}
