import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDXJEUpjkXK1XTtxj0NZucSdv5NfSSR-tE",
  authDomain: "my-family-market.firebaseapp.com",
  databaseURL: "https://my-family-market.firebaseio.com",
  projectId: "my-family-market",
  storageBucket: "my-family-market.appspot.com",
  messagingSenderId: "874117062435"
};
firebase.initializeApp(config);

export default async ({ Vue }) => {
  Vue.prototype.$firebase = firebase;
};
