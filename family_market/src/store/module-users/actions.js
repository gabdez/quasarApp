import firebase from "firebase";

export function userJoin(
  { commit, dispatch },
  { email, password, username, url }
) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        commit("setUserUid", user.user.uid);
        commit("setIsAuthenticated", true);
        dispatch("createUserFirebase", { user, username, url });
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

export function logout({ commit }) {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
      console.log("logout succesfull");
      commit("setUser", null);
      commit("setUserUid", null);
      commit("setIsAuthenticated", false);
    })
    .catch(function(error) {
      // An error happened.
      console.log("logout unsuccesfull");
      commit("setUserUid", null);
      commit("setIsAuthenticated", false);
    });
}

// function to know if user is already auth with "remember me" btn
export function userIsLogin({ commit, dispatch }) {
  return new Promise((resolve, reject) => {
    console.log("hello");
    var user = firebase.auth().currentUser;
    console.log(firebase.auth());
    if (user != null) {
      resolve(user);
    } else {
      reject();
    }
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
        var data = doc.data();
        data.id = doc.id;
        commit("setUser", data);
      } else {
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}

export function createUserFirebase({}, { user, username, url }) {
  var db = firebase.firestore();
  db.collection("Users")
    .doc(user.user.uid)
    .set({
      username: username != "" ? username : "anonymous",
      email: user.user.email,
      color: "#5271FF",
      url: url
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

export function updateUserFirebase({ state }, user) {
  return new Promise((resolve, reject) => {
    console.log("in action");
    var db = firebase.firestore();
    db.collection("Users")
      .doc(state.uid)
      .set(user)
      .then(function() {
        console.log("Document successfully written!");
        resolve();
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  });
}
export function getUsersInfo({ state }, userId) {
  return new Promise((resolve, reject) => {
    var db = firebase.firestore();
    db.collection("Users")
      .doc(userId)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          resolve(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  });
}

export function searchUser({ state }, username) {
  return new Promise((resolve, reject) => {
    console.log(username);
    //var array = [];
    var db = firebase.firestore();
    db.collection("Users")
      .where("username", "==", username)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.data());
          let data = doc.data();
          data.id = doc.id;
          resolve(data);
          //array.push(data);
        });
        reject();
        //resolve(array);
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  });
}
