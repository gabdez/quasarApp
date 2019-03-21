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
            <q-btn class="q-mr-sm" unelevated outline color="white" label="cancel" @click="$router.go(-1);"/>
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
            this.$store
                .dispatch("lists/setList", this.list)
                .then(() => {
                    this.$router.go(-1);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
