<template>
    <div class="q-px-sm">
        <template>
            <q-card
                v-for="list in allLists"
                :key="list.id"
                :name="list.id"
                v-ripple
                class="my-card text-white q-ma-lg"
                @click="goListItems(list.id)"
                :style="{ background: styleCards }"
            >
                <q-card-section>
                    <div
                        class="text-h6 text-center text-weight-light text-uppercase"
                    >
                        {{ list.name }}
                    </div>
                </q-card-section>
                <q-card-section class="text-weight-light">{{
                    list.description
                }}</q-card-section>
                <q-separator dark />
                <q-card-actions class="flex-center">
                    <span class="float-right">
                        <q-btn
                            icon="delete_forever"
                            outline
                            color="negative"
                            @click.stop="deleteConfirmation(list.id)"
                        ></q-btn>
                        <q-btn
                            class="q-mx-sm"
                            outline
                            icon="edit"
                            color="primary"
                            @click.stop="
                                $router.push('/user/EditList/' + list.id)
                            "
                        ></q-btn>
                        <q-btn
                            outline
                            @click.stop="list.favorite = !list.favorite"
                            :color="list.favorite == true ? 'yellow' : 'white'"
                        >
                            <q-icon name="star"></q-icon>
                        </q-btn>
                    </span>
                </q-card-actions>
            </q-card>
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
</template>

<script>
import { LocalStorage } from "quasar";
export default {
    name: "Lists",
    props: ["allLists"],
    data() {
        return {
            confirmDelete: false,
            styleCards:
                "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
        };
    },
    methods: {
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
        },
        goListItems(id) {
            this.$store.commit("lists/setIdListSelected", id);
            this.$router.push("/" + this.listSelected.id + "/Items");
        },
        deleteConfirmation(id) {
            this.confirmDelete = true;
            this.$store.commit("lists/setIdListSelected", id);
        }
    },
    computed: {
        listSelected() {
            return this.$store.getters["lists/getListSelected"];
        }
    }
};
</script>

<style scoped lang="stylus">
.container {
    height: 75px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.my-card {
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
}

.child {
    flex: 0 0 auto;
    margin-right: 3px;
}

.q-tab-panels {
    background: none;
}

.q-chip--selected {
    color: white;
    background-color: $light-blue-5 !important;
    border: 1px solid white;
}

.q-chip__icon {
    color: white;
}
</style>
