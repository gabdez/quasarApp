<template>
    <div style="padding-bottom: 100px; width:90%;">
        <h5 class="text-center text-uppercase text-white q-ma-sm">Sign in</h5>
        <div>
            <q-input outlined color="light-blue-5" bg-color="white" v-model="email" placeholder="email"/>
            <br>
            <q-input
                v-model="password"
                bg-color="white"
                color="light-blue-5"
                outlined
                type="password"
                placeholder="password"
                :rules="[ val => val.length >= 6 || 'Please use minimum 6 characters']"
                class="q-pb-md"
            />
            <hr>
            <q-input class="q-pt-md" outlined color="light-blue-5" bg-color="white" v-model="username" placeholder="username"/>
        </div>
        <div class="text-red">{{errorMsg}}</div>
        <br>
        <span class="row justify-center">
            <q-btn
                :loading="submitting"
                :disable="email == '' || password == '' || username == '' ? true : false "
                color="light-blue-5"
                :ripple="false"
                label="Sign in"
                :icon-right="'fas fa-shopping-cart'"
                @click="signIn"
            >
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
export default {
    name: "SignIn",
    data() {
        return {
            email: "",
            password: "",
            username: "",
            submitting: false,
            errorMsg: ""
        };
    },
    methods: {
        signIn() {
            this.errorMsg = "";
            this.submitting = true;
            this.$store
                .dispatch("users/userJoin", {
                    email: this.email,
                    password: this.password,
                    username: this.username
                })
                .then(data => {
                    console.log(data);
                    this.submitting = false;
                    this.$q.notify({
                        message: "Account created successfully!",
                        color: "green"
                    });
                    let email = data.user.email;
                    this.$q.localStorage.set("userEmail", email);
                    this.$router.push("/user");
                })
                .catch(err => {
                    console.log(err);
                    this.errorMsg = err.message;
                    this.submitting = false;
                });
        }
    }
};
</script>
