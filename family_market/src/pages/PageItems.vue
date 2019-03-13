<template>
    <q-page>
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
            return this.$store.getters["items/getList"](this.idList);
        }
    }
};
</script>
