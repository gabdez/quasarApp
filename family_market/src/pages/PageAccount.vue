<template>
    <q-page class="q-pa-sm">
        <AccountSettings class="q-mt-md" :user="user"></AccountSettings>
        <q-btn
            @click="logout"
            :loading="loading"
            class="bg-red text-white logoutBtn"
            >Déconnexion</q-btn
        >
    </q-page>
</template>

<style scoped>
.logoutBtn {
    position: absolute;
    bottom: 0px;
    width: 90%;
    left: 50%;
    margin-left: -45%;
}
</style>

<script>
import AccountSettings from "../components/AccountSetting.vue";
export default {
    name: "PageAccount",
    components: { AccountSettings },
    data() {
        return {
            loading: false
        };
    },
    computed: {
        user() {
            return this.$store.state.users.user;
        }
    },
    methods: {
        logout() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.$store.dispatch("users/logout");
                this.$store.commit("lists/setAllLists", []);
                this.$store.commit("lists/setLoaded", false);
                this.$router.push("/");
            }, 1500);
        }
    }
};
</script>
