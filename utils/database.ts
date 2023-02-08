import { getDatabase, onValue, ref, set, update } from "firebase/database";
import type {
  databaseTopScores,
  database_userData,
} from "./interfaces-and-types";
const db = getDatabase();

export function createUserDB(userId, username, email) {
  set(ref(db, "users/" + userId), {
    uid: userId as string,
    username: username as string,
    email: email as string,
    TopScores: [] as databaseTopScores[],
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

export function updateDataDB(userId: string) {
  const updates = {};
  updates["users/" + userId + "/email"] = "newEmail@test.com";

  return update(ref(db), updates);
}
