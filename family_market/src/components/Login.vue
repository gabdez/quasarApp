<template>
    <q-card class="bg-white cardLogin q-pt-md">
        <q-card-section>
            <q-input
            stack-label
            color="$primary"
            bg-color="white"
            class="q-mt-sm"
            v-model="email"
            label="email"
        />
        </q-card-section>
        <q-card-section>
            <q-input
                v-model="password"
                label="mot de passe"
                bg-color="white"
                color="$primary"
                stack-label
                type="password"
            />
            <q-checkbox
                v-model="rememberMe"
                class="text-grey"
                color="$primary"
                label="Remember me"
            />
        </q-card-section>
        <q-card-section class="text-red" style="position: absolute">{{ errorMsg }}</q-card-section>
        <q-card-section>
            <span class="row justify-center">
                <q-btn
                    class="btnLogin text-white"
                    rounded
                    :loading="loading"
                    :ripple="false"
                    label="Connexion"
                    @click="login"
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

.btnLogin {
    background: $custom-color;
    width: 60%;
    position relative;
    top: 57px;
}
.cardLogin{
    width : 85%;
    border-radius: 30px;
    height : 300px;
}
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
                        firebase
                            .auth()
                            .setPersistence(
                                firebase.auth.Auth.Persistence.LOCAL
                            );
                    } else {
                        firebase
                            .auth()
                            .setPersistence(
                                firebase.auth.Auth.Persistence.NONE
                            );
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
