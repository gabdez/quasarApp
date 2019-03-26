<template>
    <q-page class="q-pa-sm">
        <q-header class="stickyHeader">
            <q-toolbar class="text-black">
                <q-btn flat :ripple="false" color="primary" class="q-ma-none q-pa-none" @click="$router.go(-1);">
                    <q-icon name="ion-ios-arrow-back" color="primary" class="q-pr-sm" size="25px"></q-icon>back
                </q-btn>
                <q-toolbar-title class="text-center text-weight-medium text-uppercase">{{$route.params.idList == 'new' ? 'new list' : 'edit '+ list.name}}</q-toolbar-title>
            </q-toolbar>
        </q-header>
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
