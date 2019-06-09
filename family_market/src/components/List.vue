<template>
    <q-item
        :key="list.id"
        :name="list.id"
        v-ripple
        class="my-card text-white q-mt-sm"
        @click="goListItems(list.id)"
        :style="{ background: '#747ca7', width: '42vh' }"
    >
        <q-item-section>
            <q-item-label class="q-py-sm">
                {{ list.name }}
            </q-item-label>
            <q-item-label
                lines="1"
                class="text-weight-light q-pl-sm text-grey-3 "
            >
                {{ list.description }}
            </q-item-label>
        </q-item-section>
        <!-- <q-separator dark /> -->
        <!-- <q-card-actions class="flex-center">
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
                </q-card-actions> -->
    </q-item>
</template>

<script>
import { LocalStorage } from "quasar";
import { mapGetters } from "vuex";
export default {
    name: "List",
    props: ["list"],
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
.my-card {
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    box-shadow: none;
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
