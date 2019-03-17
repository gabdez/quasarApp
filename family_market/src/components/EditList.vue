<template>
    <div>
        <h5 class="text-center text-weight-light text-uppercase text-white">
            Edit {{list.name}}
            <q-icon name="star" :color="list.favorite ? 'yellow': ''" @click="list.favorite = !list.favorite"></q-icon>
        </h5>
        <q-input outlined color="light-blue-5" bg-color="white" v-model="list.name" stack-label label="List name"/>
        <br>
        <q-input v-model="list.description" color="light-blue-5" bg-color="white" label="Description" filled type="textarea"/>
        <br>
        <div class="flex flex-center">
            <q-btn unelevated color="light-blue-5" label="finish" @click="endEdit"/>
        </div>
    </div>
</template>

<style scoped>
</style>

<script>
import { LocalStorage } from "quasar";
export default {
    name: "EditList",
    props: ["list"],
    components: {},
    methods: {
        endEdit() {
            LocalStorage.set("list_todo_market", this.$store.getters["lists/getAllLists"]);
            this.$router.go(-1);
        }
    }
};
</script>
