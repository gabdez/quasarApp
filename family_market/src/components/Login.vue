<template>
    <div style="padding-top:75px; width:90%;">
        <q-input outlined color="light-blue-5" bg-color="white" v-model="email" placeholder="email"/>
        <br>
        <q-input v-model="password" bg-color="white" color="light-blue-5" outlined type="password" placeholder="password"/>
        <q-checkbox v-model="rememberMe" class="text-white" color="light-blue-5" label="Remember me"/>
        <div class="text-red">{{errorMsg}}</div>
        <br>
        <span class="row justify-center">
            <q-btn color="light-blue-5" :loading="loading" :ripple="false" label="Login" :icon-right="'fas fa-shopping-cart'" @click="login">
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
            error: "rien",
            loading: false,
            errorMsg: "",
            rememberMe: false
        };
    },
    methods: {
        firebaseTest() {
            var self = this;
            var db = firebase.firestore();
            db.collection("lists")
                .doc("list4")
                .set({
                    type: "market"
                })
                .then(function() {
                    self.error = "Document written with ID: ";
                })
                .catch(function() {
                    self.error = "Error adding document:";
                });
            db.collection("lists")
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        console.log(`${doc.id} => ${doc.data()}`);
                    });
                });
        },
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
