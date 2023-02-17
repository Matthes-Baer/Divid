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
} from "firebase/database";
import type { userData_DB, trophy_DB } from "./interfaces-and-types";

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
      name: "FirstPic" as string,
      costs: 50 as number,
      available: false as boolean,
    },
    {
      name: "SecondPic" as string,
      costs: 75 as number,
      available: false as boolean,
    },
  ];

  const trophiesRef: DatabaseReference = ref(
    db,
    "users/" + userId + "/Trophies"
  );
  //* "update" for adding multiple entries at once.
  update(trophiesRef, {
    FirstPic: tropyArray[0],
    SecondPic: tropyArray[1],
  });
}

export function addScore_DB(
  userId: string,
  score: number,
  date: { day: number; month: number; year: number; total: number },
  usedHints: number,
  attempts: number
): void {
  // const newPostKey = push(child(ref(db), "Scores")).key;
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
  const value = ref(db, "users/" + userId);
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
  const queryRef = query(
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
  const queryRef = query(
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
  available?: boolean
): void {
  const refUser: DatabaseReference = ref(db, "users/" + userId + "/Trophies");

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
