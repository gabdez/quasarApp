import firebase from "firebase";

export function addList({ state, commit }, list) {
  return new Promise((resolve, reject) => {
    console.log(list);
    var db = firebase.firestore();
    db.collection("Lists")
      .add(list)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        resolve(docRef);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        reject(error);
      });
  });
}
export function deleteList({ state, commit }, list) {
  return new Promise((resolve, reject) => {
    console.log(list);
    var db = firebase.firestore();
    // first get the id of the list
    db.collection("Lists")
      .where("id", "==", list.id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());

          //then delete the list
          db.collection("Lists")
            .doc(doc.id)
            .delete()
            .then(function() {
              console.log("Document deleted succesfully");
              resolve();
            })
            .catch(function(error) {
              console.error("Error removing document: ", error);
              resolve(error);
            });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        resolve(error);
      });
  });
}
export function setList({ state, commit }, list) {
  return new Promise((resolve, reject) => {
    console.log(list);
    var db = firebase.firestore();
    // first get the id of the list
    db.collection("Lists")
      .where("id", "==", list.id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());

          //then update the list
          db.collection("Lists")
            .doc(doc.id)
            .set(list)
            .then(function() {
              console.log("Document overwritten succesfully");
              resolve();
            })
            .catch(function(error) {
              console.error("Error setting document: ", error);
              resolve(error);
            });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        resolve(error);
      });
  });
}
export function setAllLists({ state, commit }, uid) {
  console.log(uid);
  console.log(state.listenerLoaded);
  var db = firebase.firestore();
  db.collection("Lists")
    .where("users", "array-contains", uid)
    .onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          console.log("New list: ", change.doc.data());
          commit("addList", change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified list: ", change.doc.data());
          commit("setList", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed list: ", change.doc.data());
          state.idListSelected = null;
          commit("deleteList", change.doc.data());
        }
      });
      commit("setLoaded", true);
    });
}

// items
export function addItem({ state, commit }, { newItem, list }) {
  return new Promise((resolve, reject) => {
    console.log(newItem);
    var db = firebase.firestore();
    // first get the id of the list
    db.collection("Lists")
      .where("id", "==", state.idListSelected)
      .get()
      .then(function(querySnapshot) {
        console.log(querySnapshot);
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());

          //then update the list
          db.collection("Lists")
            .doc(doc.id)
            .update({
              items: firebase.firestore.FieldValue.arrayUnion({ id: list.counter++, name: newItem, isCheck: false })
            })
            .then(function() {
              console.log("item added succesfully");
              resolve();
            })
            .catch(function(error) {
              console.error("Error add item: ", error);
              resolve(error);
            });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        resolve(error);
      });
  });
}
export function removeItem({ state, commit }, { item, list }) {
  return new Promise((resolve, reject) => {
    console.log(item);
    var db = firebase.firestore();
    // first get the id of the list
    db.collection("Lists")
      .where("id", "==", state.idListSelected)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());

          //then update the list
          db.collection("Lists")
            .doc(doc.id)
            .update({
              items: firebase.firestore.FieldValue.arrayRemove(item)
            })
            .then(function() {
              console.log("item deleted succesfully");
              resolve();
            })
            .catch(function(error) {
              console.error("Error delete item: ", error);
              resolve(error);
            });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        resolve(error);
      });
  });
}
