<template>
    <q-item
        :key="list.id"
        :name="list.id"
        v-ripple
        class="my-card text-white q-mt-sm"
        @click="goListItems(list.id)"
        :style="{ background: '#747ca7', width: '42vh', minHeight: '70px' }"
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
        <q-item-section side>
            <q-btn flat icon="more_vert" class="text-white" @click.stop="">
                <q-menu
                    auto-close
                    transition-show="scale"
                    transition-hide="scale"
                >
                    <q-list style="min-width: 150px">
                        <q-item v-ripple clickable v-close-menu>
                            <q-item-section class="text-center">
                                <q-item-label
                                    @click.stop="
                                        $emit('delete-confirmation', list.id)
                                    "
                                >
                                    Delete
                                    <q-icon
                                        name="delete_forever"
                                        color="red"
                                        size="20px"
                                    ></q-icon> </q-item-label
                            ></q-item-section>
                        </q-item>
                        <q-item clickable v-close-menu>
                            <q-item-section class="text-center">
                                <q-item-label
                                    @click.stop="
                                        $router.push(
                                            '/user/EditList/' + list.id
                                        )
                                    "
                                >
                                    Edit
                                    <q-icon
                                        name="edit"
                                        color="blue"
                                        size="20px"
                                    ></q-icon>
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
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
