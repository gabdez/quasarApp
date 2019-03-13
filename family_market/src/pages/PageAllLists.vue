<template>
    <q-page class="q-pa-sm">
        <Lists v-if="allLists.length >0 " :allLists="allLists"/>
        <span v-else>
            <div class="flex flex-center fullscreen items-center">
                <div class="flex flex-center">
                    <h5 class="text-weight-thin q-ma-sm text-center text-white">create your first list right now!</h5>
                    <q-btn class="self-center" color="red" label="create" @click="$router.push('/allLists/EditList/new')"></q-btn>
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
    mounted() {},
    computed: {
        allLists() {
            return this.$store.getters["items/getAllLists"];
        }
    }
};
</script>
