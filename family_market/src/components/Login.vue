<template>
    <div style="padding-top:75px;">
        <q-input outlined color="light-blue-5" bg-color="white" v-model="username" placeholder="username"/>
        <br>
        <q-input v-model="password" bg-color="white" color="light-blue-5" outlined type="password" placeholder="password"/>
        <br>
        <span class="row justify-center">
            <q-btn color="light-blue-5" :ripple="false" label="Go shopping" :icon-right="'fas fa-shopping-cart'" @click="$router.push('/listItems')"/>
        </span>
    </div>
</template>

<style scoped>
</style>

<script>
export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
            isPwd: true
        };
    },
    methods: {}
};
</script>
