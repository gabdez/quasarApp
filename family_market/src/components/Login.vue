<template>
    <div style="width:90%;">
        <q-input outlined color="light-blue-5" bg-color="white" v-model="email" placeholder="email"/>
        <br>
        <q-input v-model="password" bg-color="white" color="light-blue-5" outlined type="password" placeholder="password"/>
        <q-checkbox v-model="rememberMe" class="text-white" color="light-blue-5" label="Remember me"/>
        <div class="text-red">{{errorMsg}}</div>
        <br>
        <span class="row justify-center">
            <q-btn style="background-color: #81d4fa" class="text-blue-14" rounded :loading="loading" :ripple="false" label="Login" @click="login">
                <template v-slot:loading>
                    <q-spinner/>
                </template>
            </q-btn>
        </span>
    </div>
</template>

<style scoped>
</style>

<script>
import firebase from "firebase";
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            isPwd: true,
            loading: false,
            errorMsg: "",
            rememberMe: true
        };
    },
    mounted() {
        if (this.$q.localStorage.has("userEmail")) {
            this.email = this.$q.localStorage.getItem("userEmail");
        }
    },
    methods: {
        login() {
            this.errorMsg = "";
            this.loading = true;
            this.$store
                .dispatch("users/userLogin", {
                    email: this.email,
                    password: this.password
                })
                .then(data => {
                    this.loading = false;
                    if (this.rememberMe == true) {
                        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                    } else {
                        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
                    }
                    let email = data.user.email;
                    this.$q.localStorage.set("userEmail", email);
                    this.$router.push("/user");
                })
                .catch(err => {
                    this.errorMsg = err.message;
                    this.loading = false;
                });
        }
    }
};
</script>
