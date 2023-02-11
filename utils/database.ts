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
} from "firebase/database";
import firebase from "firebase/app";
import type { userData_DB, trophy_DB } from "./interfaces-and-types";
const db = getDatabase();

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
  });

  const data = [
    {
      name: "FirstPic" as string,
      costs: 50 as number,
      available: false as boolean,
      active: false as boolean,
    },
    {
      name: "SecondPic" as string,
      costs: 75 as number,
      available: false as boolean,
      active: false as boolean,
    },
  ];

  const imagesRef = ref(db, "users/" + userId + "/Trophies");
  //* "update" for adding multiple entries at once.
  update(imagesRef, {
    FirstPic: data[0],
    SecondPic: data[1],
  });
}

export function readSpecificUserData_DB(userId: string, callback?: Function) {
  const value = ref(db, "users/" + userId);

  onValue(value, (snapshot) => {
    let data: userData_DB = snapshot.val();
    callback(data);
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
  //! wird so auch ein ganz neues Array angelegt wenn noch keine Einträge vorhanden sind?
  const postListRef = ref(db, "users/" + userId + "/Scores");
  const newPostRef = push(postListRef);
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

export function updateSingleData_DB(
  userId: string,
  input: string | number,
  ...key: Array<string | number>
): Promise<void> {
  const updates = {};
  updates["users/" + userId + key] = input;
  return update(ref(db), updates);
}

export function updateSingleTrophyData_DB(userId: string, imageName: string) {
  const baseAddress: string = "users/" + userId + "/Trophies";
  const refTrophyArray: DatabaseReference = ref(db, baseAddress);
  let resultArray = [];

  //* OnValue would not work in this case due to the realtime change - crashes the app.
  get(refTrophyArray).then((snapshot) => {
    let key: string;
    snapshot.forEach((childSnapshot) => {
      resultArray.push(childSnapshot.val());
      if (childSnapshot.val().name === imageName) {
        key = childSnapshot.key;
        const updates = {};
        console.log(key);

        //! Das hier macht so eigentlich keinen Sinn, weil man im Frontend nicht so einfach an den Key rankommt. Die einzelnen Scores werden im Nachhinein nicht weiter verändert, weshalb keine richtige ID oder sowas eingebaut werden muss, um den score-Eintrag tatsächlich dynamisch finden zu können.
        updates[baseAddress + `/${key}` + "/available"] = true;
        update(ref(db), updates);
      }
    });
  });
}

export function readSortedScoresArray_DB(
  userId: string,
  callback?: Function
): void {
  const sortedScoresArray = query(
    ref(db, "users/" + userId + "/Scores"),
    orderByChild("score")
  );

  //* Multiple Orders don't work at once with the realtime database - for such queries the Firebase Cloud Firestore would be needed.
  const que = query(
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
  onValue(que, (snapshot) => {
    var result = [];

    snapshot.forEach((childSnapshot) => {
      result.push(childSnapshot.val());
    });
    callback ? callback(result.reverse()) : null;
    console.log(result);
  });
}

export function readingAllUserData_DB(
  userId: string,
  callback?: Function
): void {
  const refUser = ref(db, "users/" + userId);
  let result: userData_DB;

  onValue(refUser, (snapshot) => {
    result = snapshot.val();
  });

  console.log(result);
  callback ? callback(result) : null;
}

export function readingTrophiesData_DB(
  userId: string,
  callback?: Function
): void {
  const refUser = ref(db, "users/" + userId + "/Trophies");

  onValue(refUser, (snapshot) => {
    let result: trophy_DB[] = [];

    snapshot.forEach((snapshotChild) => {
      result.push(snapshotChild.val());
    });

    callback ? callback(result) : null;
  });
}
