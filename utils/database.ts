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
} from "firebase/database";
import type { database_userData } from "./interfaces-and-types";
const db = getDatabase();

export function createUserDB(userId, username, email) {
  set(ref(db, "users/" + userId), {
    uid: userId as string,
    username: username as string,
    email: email as string,
    TotalScore: 0 as number,
  });
}

export function readSpecificUserDataDB(userId: string, callback?: Function) {
  const value = ref(db, "users/" + userId);

  onValue(value, (snapshot) => {
    let data: database_userData = snapshot.val();
    callback(data);
  });
}

export function updateScoresArrayDB(
  userId: string,
  score: number,
  date: { day: number; month: number; year: number; total: number },
  usedHints: number,
  attempts: number
) {
  // const newPostKey = push(child(ref(db), "Scores")).key;
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

  // const updates = {};
  // updates["users/" + userId + "/TopScores2"].contact({
  //   score: 10,
  //   date: new Date(),
  //   usedHints: 3,
  //   attempts: 7,
  // });

  // return update(ref(db), updates);
}

export function readSortedScoresArrayDB(userId: string, callback?: Function) {
  const sortedScoresArray = query(
    ref(db, "users/" + userId + "/Scores"),
    orderByChild("score")
  );

  //* Multiple Orders don't work at once with the realtime database - for such queries the Firebase Cloud Firestore would be needed.
  const que = query(
    ref(db, "users/" + userId + "/Scores"),
    orderByChild("score")
  );

  get(que).then((snapshot) => {
    var result = [];

    snapshot.forEach((childSnapshot) => {
      result.push(childSnapshot.val());
    });
    callback ? callback(result) : null;
    console.log(result);
  });
}
