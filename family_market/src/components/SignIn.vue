<template>
    <q-card class="bg-white cardLogin q-pt-md">
        <q-card-section>
            <q-input
                label-stacked
                color="$primary"
                bg-color="white"
                v-model="email"
                label="email"
            />
        </q-card-section>
        <q-card-section class="q-pb-none">
            <q-input
                v-model="password"
                bg-color="white"
                color="$primary"
                label-stacked
                type="password"
                :rules="[
                    val => val.length >= 6 || 'Please use minimum 6 characters'
                ]"
                label="mot de passe"
            />
        </q-card-section>
        <q-card-section class="text-red q-pb-none">
            <q-input
                label-stacked
                label="username"
                color="$primary"
                bg-color="white"
                v-model="username"
            />
        </q-card-section>
        <q-card-section class="text-red" style="position: absolute">{{
            errorMsg
        }}</q-card-section>
        <q-card-section>
            <span class="row justify-center">
                <q-btn
                    :loading="submitting"
                    :disable="
                        email == '' || password == '' || username == ''
                            ? true
                            : false
                    "
                    class="text-white btnSignin"
                    rounded
                    :ripple="false"
                    label="Inscription"
                    :icon-right="'fas fa-shopping-cart'"
                    @click="signIn"
                >
                    <template v-slot:loading>
                        <q-spinner />
                    </template>
                </q-btn>
            </span>
        </q-card-section>
    </q-card>
</template>

<style scoped lang="stylus">
$custom-color = linear-gradient(to right, #1cd8d2, #93edc7);

.btnSignin {
    background: $custom-color;
    width: 60%;
    position: relative;
    top: 45px;
}

.cardLogin {
    width: 85%;
    border-radius: 30px;
    height: 300px;
}
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
                    username: this.username,
                    url: "userM.png"
                })
                .then(data => {
                    console.log(data);
                    this.submitting = false;
                    this.$q.notify({
                        message: "Account created successfully!",
                        color: "primary"
                    });
                    let email = data.user.email;
                    this.$q.localStorage.set("userEmail", email);
                    this.$router.push("/home");
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
