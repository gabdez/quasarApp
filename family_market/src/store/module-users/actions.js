import firebase from "firebase";

export function userJoin({ commit, dispatch }, { email, password, username }) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        commit("setUserUid", user.user.uid);
        commit("setIsAuthenticated", true);
        dispatch("createUserFirebase", { user, username });
        dispatch("setUser");
        resolve(user);
      })
      .catch(err => {
        commit("setUserUid", null);
        commit("setIsAuthenticated", false);
        reject(err);
      });
  });
}
export function userLogin({ commit, dispatch }, { email, password }) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        commit("setUserUid", user.user.uid);
        commit("setIsAuthenticated", true);
        dispatch("setUser");
        resolve(user);
      })
      .catch(err => {
        commit("setUserUid", null);
        commit("setIsAuthenticated", false);
        reject(err);
      });
  });
}

export function setUser({ state, commit }) {
  var db = firebase.firestore();
  var docRef = db.collection("Users").doc(state.uid);
  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        commit("setUser", doc.data());
      } else {
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}

export function createUserFirebase({}, { user, username }) {
  var db = firebase.firestore();
  db.collection("Users")
    .doc(user.user.uid)
    .set({
      username: username != "" ? username : "anonymous",
      email: user.user.email,
      color: "#5271FF"
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

export function updateUserFirebase({ state }) {
  var db = firebase.firestore();
  var data = state.user;
  db.collection("Users")
    .doc(state.uid)
    .set({
      username: data.username,
      email: data.email,
      color: data.color
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}
