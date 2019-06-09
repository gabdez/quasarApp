<template>
    <q-page>
            <div v-if="allLists.length > 0" class="q-px-sm">
        <template>
            <transition-group name="item">
                <template v-for="list in allLists">
                    <list :list="list"></list>
                </template>
            </transition-group>
        </template>
        <q-dialog
            transition-show="slide-up"
            transition-hide="slide-down"
            v-model="confirmDelete"
            persistent
        >
            <q-card class="cardRadius">
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="red" text-color="white" />
                    <span class="q-ml-sm">
                        You definitively want to delete the list?
                    </span>
                </q-card-section>

                <q-card-actions class="cardAction">
                    <q-btn
                        flat
                        class="btnModal q-ma-none"
                        label="Cancel"
                        color="primary"
                        v-close-dialog
                    />
                    <q-btn
                        flat
                        class="btnModal"
                        color="red-14"
                        label="Delete"
                        @click="deleteList()"
                        v-close-dialog
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
        <q-btn
            v-if="allLists.length > 0"
            class="fixed-bottom-right q-ma-lg"
            round
            color="red"
            icon="add"
            @click="$router.push('/user/editList/new')"
        ></q-btn>
        <div
            class="fullscreen q-mt-xl"
            v-else-if="loaded == true && allLists.length == 0"
        >
            <div class="flex full-height justify-center items-center">
                <div class="q-mb-xl q-pb-xl flex column items-center">
                    <q-icon
                        size="150px"
                        color="red-4"
                        name="remove_shopping_cart"
                    ></q-icon>
                    <br />
                    <span class="text-subtitle1"
                        >Ooops you don't have any list yet...</span
                    >
                    <br />
                    <q-btn
                        class="btnStyled text-red-14"
                        label="Let's start"
                        @click="$router.push('/user/EditList/new')"
                    ></q-btn>
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
import List from "../components/List.vue";
export default {
    name: "PageAllLists",
    components: { List },
    data() {
        return {};
    },
    methods: {},
    computed: {
        loaded() {
            return this.$store.getters["lists/getLoaded"];
        }
    }
};
</script>
