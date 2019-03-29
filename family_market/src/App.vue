<template>
    <div id="q-app" class="bgListLayout">
        <transition :name="transitionName" mode="out-in">
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
        return {
            transitionName: "slide-left"
        };
    },
    watch: {
        $route(to, from) {
            const toDepth = to.path.split("/").length;
            const fromDepth = from.path.split("/").length;
            this.transitionName = toDepth < fromDepth || to.path == "/" ? "slide-right" : "slide-left";
        }
    },
    created() {},
    mounted() {
        this.$q.loading.show({
            delay: 400 // ms
        });
        firebase.auth().onAuthStateChanged(user => {
            console.log("there is a call");
            console.log(user);
            if (user) {
                console.log("there is a user");
                this.$store.commit("users/setUserUid", user.uid);
                this.$store.commit("users/setIsAuthenticated", true);
                this.$store.dispatch("users/setUser");
                this.$store.dispatch("lists/setAllLists", user.uid);
                this.$router.push("/user");
            } else {
                console.log("there is no user");
                this.$q.loading.hide();
                this.$store.commit("users/setUserUid", null);
                this.$store.commit("users/setUser", null);
                this.$store.commit("users/setIsAuthenticated", false);
                this.$router.push("/");
            }
        });
    }
};
</script>

<style>
</style>
