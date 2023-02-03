import { getDatabase, onValue, ref, set, update } from "firebase/database";
const db = getDatabase();

export function writeUserData(userId, name, email) {
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
  });
}

export function ReadTest(userId: string) {
  const test = ref(db, "users/" + userId);
  //? Um auf bestimmten einzelnen Wert zuzugreifen
  //? const test = ref(db, "users/" + userId + "/email");

  onValue(test, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

export function updateData(userId: string) {
  const updates = {};
  updates["users/" + userId + "/email"] = "newEmail@test.com";

  return update(ref(db), updates);
}
