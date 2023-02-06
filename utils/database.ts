import { getDatabase, onValue, ref, set, update } from "firebase/database";
import type { database_userData } from "./interfaces-and-types";
const db = getDatabase();

export function createUser(userId, username, email) {
  set(ref(db, "users/" + userId), {
    username,
    email,
  });
}

export function readSpecificUserData(userId: string, callback?: Function) {
  const value = ref(db, "users/" + userId);

  onValue(value, (snapshot) => {
    let data: database_userData = snapshot.val();
    callback(data);
  });
}

export function updateData(userId: string) {
  const updates = {};
  updates["users/" + userId + "/email"] = "newEmail@test.com";

  return update(ref(db), updates);
}
