<template>
    <q-page>
        <div v-if="allLists.length > 0" class="q-py-md q-px-sm container">
            <q-input
                class="q-my-sm no-border"
                :bg-color="isFocused ? 'primary' : 'accent'"
                color="white"
                rounded
                outlined
                dense
                v-model="search"
                @focus="isFocused = true"
                @blur="isFocused = false"
                placeholder="search list by name"
                :input-style="{ color: 'white' }"
            >
                <template v-slot:append>
                    <q-icon
                        :color="isFocused ? 'white' : 'grey'"
                        name="close"
                        @click="search = ''"
                    ></q-icon>
                </template>
                <template v-slot:prepend>
                    <q-icon
                        :color="isFocused ? 'white' : 'grey'"
                        name="search"
                    ></q-icon>
                </template>
            </q-input>
            <q-list>
                <transition-group
                    appear
                    name="item"
                    appear-class="item-enter-appear"
                    appear-active-class="item-enter-active-appear"
                >
                    <template v-for="list in listsSorted">
                        <List
                            :key="list.id"
                            :list="list"
                            @delete-confirmation="deleteConfirmation"
                        ></List>
                    </template>
                </transition-group>
            </q-list>
            <transition
                appear
                name="fade"
                appear-active-class="fade-enter-active"
            >
                <q-btn
                    class="my-card custom-bg-bis q-mt-sm text-white text-center"
                    style="position: sticky; bottom: 0px; width: 85vw"
                    @click="$router.push('/user/EditList/new')"
                >
                    <q-icon name="ion-ios-add" size="25px"></q-icon>
                </q-btn>
            </transition>
        </div>
        <div
            class="flex justify-center items-center fullscreen"
            style="z-index: 1"
            v-else-if="loaded == true && allLists.length == 0"
        >
            <div class="flex justify-center items-center">
                <div class="q-mb-xl q-pb-xl flex column items-center">
                    <q-icon
                        size="150px"
                        color="red-5"
                        name="remove_shopping_cart"
                    ></q-icon>
                    <br />
                    <span class="text-subtitle1 text-white"
                        >Ooops you don't have any list yet...</span
                    >
                    <br />
                    <q-btn
                        class="btnStyled bg-red-5 text-red-1"
                        label="Let's start"
                        @click="$router.push('/user/EditList/new')"
                    ></q-btn>
                </div>
            </div>
        </div>

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
    </q-page>
</template>

<style scoped lang="stylus">
.btnStyled {
    border-radius: 15px;
    background-color: rgba(255, 179, 179, 0.6);
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    height: calc(100vh - 52px);
}

.item-enter-active-appear {
    for i in (1 .. 10) {
        &:nth-child({i}) {
            transition: all 0.2s * i;
        }
    }
}

.item-enter-appear {
    opacity: 0;
    transform: translateX(100px);
}
</style>

<script>
import { Loading } from "quasar";
import List from "../components/List.vue";
import { mapGetters } from "vuex";
export default {
    name: "PageHome",
    components: { List },
    data() {
        return {
            confirmDelete: false,
            search: "",
            isFocused: false
        };
    },
    mounted() {},
    methods: {
        deleteConfirmation(id) {
            console.log(id);
            this.confirmDelete = true;
            this.$store.commit("lists/setIdListSelected", id);
        },
        deleteList() {
            var list = Object.assign({}, this.listSelected);
            this.$store
                .dispatch("lists/deleteList", list)
                .then(() => {
                    console.log("document deleted");
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    computed: {
        loaded() {
            return this.$store.getters["lists/getLoaded"];
        },
        listsSorted() {
            return this.search == ""
                ? this.allLists
                : this.allLists.filter(list => {
                      return list.name
                          .toLowerCase()
                          .includes(this.search.toLowerCase());
                  });
        },
        ...mapGetters({
            allLists: "lists/getAllLists",
            listSelected: "lists/getListSelected"
        })
    }
};
</script>
