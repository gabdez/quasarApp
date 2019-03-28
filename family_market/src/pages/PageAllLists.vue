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
        <div class="fullscreen q-mt-xl" v-else-if="loaded == true && allLists.length == 0">
            <div class="flex full-height justify-center items-center">
                <div class="q-mb-xl q-pb-xl flex column items-center">
                    <q-icon size="150px" color="red-4" name="remove_shopping_cart"></q-icon>
                    <br>
                    <span class="text-subtitle1">Ooops you don't have any list yet...</span>
                    <br>
                    <q-btn class="btnStyled text-red-14" label="Let's start" @click="$router.push('/user/EditList/new')"></q-btn>
                </div>
            </div>
        </div>
    </q-page>
</template>

<style scoped>
.btnStyled {
    border-radius: 15px;
    background-color: rgba(255, 179, 179, 0.6);
}
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
