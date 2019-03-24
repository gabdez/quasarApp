import firebase from "firebase";

export function addList({ state, commit }, list) {
  return new Promise((resolve, reject) => {
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
    var db = firebase.firestore();
    //then delete the list
    db.collection("Lists")
      .doc(list.id)
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
}
export function setList({ state, commit }, list) {
  return new Promise((resolve, reject) => {
    console.log(list);
    var db = firebase.firestore();
    //then update the list
    db.collection("Lists")
      .doc(list.id)
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
}
export function setAllLists({ state, commit }, uid) {
  var db = firebase.firestore();
  db.collection("Lists")
    .where("users", "array-contains", uid)
    .onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          console.log("New list: ", change.doc.data());
          commit("addList", change.doc);
        }
        if (change.type === "modified") {
          console.log("Modified list: ", change.doc.data());
          commit("setList", change.doc);
        }
        if (change.type === "removed") {
          console.log("Removed list: ", change.doc.data());
          state.idListSelected = null;
          commit("deleteList", change.doc);
        }
      });
      commit("setLoaded", true);
    });
}

export function swipeList(context, direction) {
  var list = context.getters["getList"](context.state.idListSelected);
  let index = context.state.list_todo_market.indexOf(list);
  let maxLength = context.state.list_todo_market.length;
  var newIndex = 0;
  if (direction == "left") {
    newIndex = index == maxLength - 1 ? 0 : index + 1;
  } else if (direction == "right") {
    newIndex = index == 0 ? maxLength - 1 : index - 1;
  }
  context.commit("setIdListSelected", context.state.list_todo_market[newIndex].id);
}

// items
export function addItem({ state, commit }, { item, list }) {
  return new Promise((resolve, reject) => {
    var db = firebase.firestore();
    //then update the list
    db.collection("Lists")
      .doc(list.id)
      .update({
        items: firebase.firestore.FieldValue.arrayUnion(item)
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
}
export function removeItem({ state, commit }, { item, list }) {
  return new Promise((resolve, reject) => {
    console.log(item);
    var db = firebase.firestore();
    //then update the list
    db.collection("Lists")
      .doc(list.id)
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
}
export function clearCompletedItem({ state, commit }, payload) {
  return new Promise((resolve, reject) => {
    console.log(payload.itemsCompleted);
    var db = firebase.firestore();
    //then update the list
    db.collection("Lists")
      .doc(payload.idList)
      .update({
        items: payload.itemsCompleted
      })
      .then(function() {
        console.log("item completed  clear succesfully");
        resolve();
      })
      .catch(function(error) {
        console.error("Error delete item: ", error);
        resolve(error);
      });
  });
}
export function clearAllItem({ state, commit }, idList) {
  return new Promise((resolve, reject) => {
    var db = firebase.firestore();
    //then update the list
    db.collection("Lists")
      .doc(idList)
      .update({
        items: []
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
}
export function updateItems({ state, commit }, payload) {
  return new Promise((resolve, reject) => {
    var db = firebase.firestore();
    //then update the list
    db.collection("Lists")
      .doc(payload.idList)
      .update({
        items: payload.items
      })
      .then(function() {
        console.log("items array update succesfully");
        resolve();
      })
      .catch(function(error) {
        console.error("Error array update: ", error);
        resolve(error);
      });
  });
}
