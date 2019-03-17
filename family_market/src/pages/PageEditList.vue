<template>
    <q-page class="backgroundApp q-pa-sm fullscreen">
        <CreateList v-if="this.$route.params.idList == 'new'"/>
        <EditList v-else :list="list"/>
    </q-page>
</template>

<style scoped>
</style>

<script>
import EditList from "../components/Editlist.vue";
import CreateList from "../components/Createlist.vue";
export default {
    name: "PageEditList",
    components: { EditList, CreateList },
    mounted() {},
    computed: {
        list() {
            return this.$route.params.idList == "new" ? {} : this.$store.getters["lists/getList"](this.$route.params.idList);
        }
    }
};
</script>
