<template>
    <q-page class="q-pa-sm">
        <CreateList class="q-mt-md" v-if="$route.params.idList == 'new'"/>
        <EditList class="q-mt-md" v-else :usersInfo="usersInfo" :list="list"/>
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
    data() {
        return {};
    },
    watch: {
        list(newVal) {
            if (this.$route.params.idList != "new" && newVal == undefined) this.$router.go(-1);
        }
    },
    mounted() {},
    methods: {},
    computed: {
        list() {
            return this.$route.params.idList == "new" ? {} : this.$store.getters["lists/getList"](this.$route.params.idList);
        },
        usersInfo() {
            return this.$store.state.lists.usersInfo[this.list.id];
        }
    }
};
</script>
