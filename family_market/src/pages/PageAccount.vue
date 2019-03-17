<template>
    <q-page class="backgroundApp q-pa-sm fullscreen">
        <AccountSettings :user="user"></AccountSettings>
    </q-page>
</template>

<style scoped>
</style>

<script>
import AccountSettings from "../components/AccountSetting.vue";
export default {
    name: "PageAccount",
    components: { AccountSettings },
    data() {
        return {};
    },
    computed: {
        user() {
            return this.$store.state.users.user;
        }
    }
};
</script>
