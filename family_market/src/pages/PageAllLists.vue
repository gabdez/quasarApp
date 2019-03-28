<template>
    <q-page>
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
    methods: {},
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
