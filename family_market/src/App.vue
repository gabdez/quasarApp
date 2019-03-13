<template>
    <div id="q-app">
        <transition name="page" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
import { LocalStorage } from "quasar";
export default {
    name: "App",
    mounted() {
        if (!LocalStorage.isEmpty() && LocalStorage.has("list_todo_market") && LocalStorage.getItem("list_todo_market") != undefined) {
            console.log("have items save");
            console.log(LocalStorage.getAll());
            console.log(this.$store.getters["items/getAllLists"]);
            this.$store.commit("items/setAllLists", LocalStorage.getItem("list_todo_market"));
        }
    }
};
</script>

<style>
</style>
