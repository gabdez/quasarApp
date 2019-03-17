<template>
    <q-page class="fullscreen">
        <q-header>
            <q-toolbar>
                <q-toolbar-title class="text-center">Your todo-market lists</q-toolbar-title>

                <q-btn flat round icon="account_circle">
                    <q-menu>
                        <q-list style="min-width: 100px">
                            <q-item v-ripple clickable v-close-menu>
                                <q-item-section @click="$router.push('/user/account')">User settings</q-item-section>
                            </q-item>
                            <q-item clickable v-close-menu>
                                <q-item-section class="text-center" @click="logout">
                                    <div>logout
                                        <q-icon name="logout"></q-icon>
                                    </div>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>
        <Lists v-if="allLists.length >0 " :allLists="allLists"/>
        <span v-else>
            <div class="flex flex-center fullscreen items-center">
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
import Lists from "../components/Lists.vue";
export default {
    name: "PageAllLists",
    components: { Lists },
    methods: {
        logout() {
            this.$store.dispatch("users/logout");
            this.$router.push("/");
        }
    },
    computed: {
        allLists() {
            return this.$store.getters["lists/getAllLists"];
        }
    }
};
</script>
