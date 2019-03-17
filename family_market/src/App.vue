<template>
    <div id="q-app">
        <transition name="page" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
import firebase from "firebase";
import { LocalStorage } from "quasar";
export default {
    name: "App",
    data() {
        return {};
    },
    beforeCreate() {
        this.$q.loading.show({
            delay: 400 // ms
        });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                this.$store.commit("users/setUserUid", user.uid);
                this.$store.commit("users/setIsAuthenticated", true);
                this.$store.dispatch("users/setUser");
                this.$router.push("/user");
            } else {
                this.$q.loading.hide();
                this.$store.commit("users/setUserUid", null);
                this.$store.commit("users/setUser", null);
                this.$store.commit("users/setIsAuthenticated", false);
                this.$router.push("/");
            }
        });
    },
    mounted() {
        if (!LocalStorage.isEmpty() && LocalStorage.has("list_todo_market") && LocalStorage.getItem("list_todo_market") != undefined) {
            /*             console.log("have items save");
            console.log(LocalStorage.getAll());
            console.log(this.$store.getters["lists/getAllLists"]); */
            this.$store.commit("lists/setAllLists", LocalStorage.getItem("list_todo_market"));
        }
    }
};
</script>

<style>
</style>
