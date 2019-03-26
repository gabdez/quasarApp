<template>
    <q-page>
        <q-header class="stickyHeader">
            <q-toolbar class="text-black">
                <q-toolbar-title class="text-center text-weight-medium text-uppercase">Market lists</q-toolbar-title>

                <q-btn flat round icon="account_circle">
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
        <Lists v-if="allLists.length >0" :allLists="allLists"/>
        <q-btn
            v-if="allLists.length >0"
            :allLists="allLists"
            class="fixed-bottom-right q-ma-lg"
            round
            color="red"
            icon="add"
            @click="$router.push('/user/editList/new')"
        ></q-btn>
        <span v-else-if="loaded == true && allLists.length == 0">
            <div class="flex flex-center items-center">
                <div class="flex flex-center">
                    <h5 class="text-weight-thin q-ma-sm text-center text-white">create your first list right now!</h5>
                    <q-btn class="self-center" color="red" label="create" @click="$router.push('/user/EditList/new')"></q-btn>
                </div>
            </div>
        </span>
    </q-page>
</template>

<style scoped>
</style>

<script>
import { Loading } from "quasar";
import Lists from "../components/Lists.vue";
export default {
    name: "PageAllLists",
    components: { Lists },
    data() {
        return {};
    },
    mounted() {},
    methods: {
        logout() {
            this.$store.dispatch("users/logout");
            this.$store.commit("lists/setAllLists", []);
            this.$store.commit("lists/setLoaded", false);
            this.$router.push("/");
        }
    },
    computed: {
        allLists() {
            return this.$store.getters["lists/getAllLists"];
        },
        loaded() {
            return this.$store.getters["lists/getLoaded"];
        }
    }
};
</script>
