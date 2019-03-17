<template>
    <q-page class="fullscreen">
        <q-header>
            <q-toolbar>
                <q-toolbar-title class="text-center">Your todo-market lists</q-toolbar-title>

                <q-btn flat round icon="account_circle" @click="$router.push('/user/account')"/>
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
    computed: {
        allLists() {
            return this.$store.getters["lists/getAllLists"];
        }
    }
};
</script>
