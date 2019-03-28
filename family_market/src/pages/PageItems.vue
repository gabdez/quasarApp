<template>
    <q-page>
        <q-header class="stickyHeader">
            <q-toolbar class="text-black">
                <q-btn flat :ripple="false" color="primary" class="q-ma-none q-pa-none" @click="$router.go(-1);">
                    <q-icon name="ion-ios-arrow-back" color="primary" class="q-pr-sm" size="25px"></q-icon>back
                </q-btn>
                <q-toolbar-title class="text-center text-weight-medium text-uppercase">{{list.name}}</q-toolbar-title>
            </q-toolbar>
        </q-header>
        <items v-if="list" :list="list"/>
        <NotFound v-else/>
    </q-page>
</template>

<style scoped>
</style>

<script>
import Items from "../components/Items.vue";
import NotFound from "../components/NotFound.vue";
export default {
    name: "PageItems",
    components: { Items, NotFound },
    data() {
        return {
            idList: null
        };
    },
    mounted() {
        this.idList = this.$route.params.idList;
    },
    computed: {
        list() {
            return this.$store.getters["lists/getList"](this.idList);
        }
    }
};
</script>
