<template>
    <q-layout>
        <q-page-container class="bgListLayout q-pt-none" style="padding-top:0px!important">
            <q-header class="stickyHeader">
                <q-toolbar class="text-black">
                    <q-btn v-if="view != 'PageAllLists'" flat :ripple="false" color="primary" class="q-ma-none q-pa-none" @click="$router.go(-1);">
                        <q-icon name="ion-ios-arrow-back" color="primary" class="q-pr-sm" size="25px"></q-icon>back
                    </q-btn>
                    <q-toolbar-title class="text-center text-weight-medium text-uppercase">{{toolbarTitle}}</q-toolbar-title>
                    <q-btn v-if="view == 'PageAllLists'" flat round>
                        <q-avatar v-if="myUser != null" size="28px">
                            <img :src="'statics/avatars/' + myUser.url">
                        </q-avatar>
                        <q-icon v-else name="account_circle"></q-icon>
                        <span v-if="myUser != null">{{myUser.username}}</span>
                        <q-menu>
                            <q-list style="min-width: 150px">
                                <q-item v-ripple clickable v-close-menu>
                                    <q-item-section class="text-center" @click="$router.push('/user/account')">User settings</q-item-section>
                                </q-item>
                                <q-item clickable v-close-menu>
                                    <q-item-section class="text-center" @click="logout">
                                        <div>
                                            logout
                                            <q-icon name="logout"></q-icon>
                                        </div>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </q-toolbar>
            </q-header>
            <transition :name="transitionName" mode="out-in">
                <keep-alive include="PageAllLists">
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </q-page-container>
    </q-layout>
</template>

<style>
</style>

<script>
export default {
    name: "LayoutAllLists",
    data() {
        return {
            view: "PageAllLists",
            transitionName: "slide-down"
        };
    },
    mounted() {
        this.$q.loading.hide();
    },
    watch: {
        $route(to, from) {
            const toDepth = to.path.split("/").length;
            const fromDepth = from.path.split("/").length;
            this.transitionName = toDepth < fromDepth ? "slide-down" : "slide-up";
            this.view = this.$router.history.current.name;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("users/logout");
            this.$store.commit("lists/setAllLists", []);
            this.$store.commit("lists/setLoaded", false);
            this.$router.push("/");
        }
    },
    computed: {
        toolbarTitle() {
            if (this.view == "PageAllLists") return "All market Lists";
            else if (this.view == "editList") {
                if (this.$route.params.idList == "new") return "new list";
                let listName = this.$store.getters["lists/getList"](this.$route.params.idList).name;
                return "edit " + listName;
            } else if (this.view == "account") return "Account Settings";
            return "Route not Found";
        },
        myUser() {
            // correspond to the user actually connected with his account
            return this.$store.state.users.user;
        }
    }
};
</script>
