<template>
    <q-page class="q-pa-sm fullscreen">
        <q-header class="stickyHeader">
            <q-toolbar class="text-black">
                <q-btn flat :ripple="false" color="primary" class="q-ma-none q-pa-none" @click="$router.go(-1);">
                    <q-icon name="ion-ios-arrow-back" color="primary" class="q-pr-sm" size="25px"></q-icon>back
                </q-btn>
                <q-toolbar-title class="text-center text-weight-medium text-uppercase">Account settings</q-toolbar-title>
            </q-toolbar>
        </q-header>
        <AccountSettings class="q-mt-md" :user="user"></AccountSettings>
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
