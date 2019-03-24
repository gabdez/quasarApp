<template>
    <div class="q-pt-xl q-px-sm">
        <!-- 
        <h5 class="text-weight-thin q-pa-md q-ma-none text-center text-white">Your todo-market lists</h5>-->
        <template>
            <q-tab-panels swipeable :value="listSelected.id" animated transition-prev="slide-right" transition-next="slide-left">
                <q-tab-panel v-for="list in allLists" :key="list.id" :name="list.id">
                    <q-card v-ripple class="my-card bg-light-blue-5 text-white q-ma-sm" @click="goListItems()">
                        <q-card-section>
                            <div class="text-h6 text-center text-weight-light text-uppercase">{{list.name}}</div>
                            <div class="text-subtitle1 text-weight-light">created by {{list.creator.username}}</div>
                            <div class="text-subtitle1 text-weight-light">
                                type: {{list.type}} list
                                <q-icon :name="list.type == 'market' ?'shopping_cart' : 'list'" size="20px"></q-icon>
                            </div>
                        </q-card-section>
                        <q-card-section class="text-weight-light">{{list.description}}</q-card-section>
                        <q-separator dark/>
                        <q-card-actions class="flex-center">
                            <span class="float-right">
                                <q-btn icon="delete_forever" color="negative" @click.stop="confirmDelete = true"></q-btn>
                                <q-btn class="q-mx-sm" icon="edit" color="primary" @click.stop="$router.push('/user/EditList/'+list.id)"></q-btn>
                                <q-btn outline @click.stop="list.favorite = !list.favorite" :color="list.favorite == true ? 'yellow': 'white'">
                                    <q-icon name="star"></q-icon>
                                </q-btn>
                            </span>
                        </q-card-actions>
                    </q-card>
                </q-tab-panel>
            </q-tab-panels>
        </template>
        <div class="container">
            <q-chip class="bg-white" v-for="list in allLists" :key="list.id" :selected="listSelected.id == list.id" @click="selectChip(list.id)">
                <q-avatar color="red" text-color="white">
                    <q-icon :name="list.type == 'market' ?'shopping_cart' : 'list'" size="20px"></q-icon>
                </q-avatar>
                {{list.name}}
                <q-icon v-if="list.favorite" name="star" color="yellow"></q-icon>
            </q-chip>
        </div>
        <q-btn class="absolute-bottom-right q-ma-lg" round color="red" icon="add" @click="$router.push('/user/editList/new')"></q-btn>
        <q-dialog v-model="confirmDelete" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="warning" color="red" text-color="white"/>
                    <span class="q-ml-sm">You definitively want to delete the list?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-dialog/>
                    <q-btn flat label="Delete" color="red" @click="deleteList()" v-close-dialog/>
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
            confirmDelete: false
        };
    },
    mounted() {},
    watch: {
        listSelected: function() {
            //if (this.listSelected) this.chipSelected = this.listSelected.id;
        }
    },
    methods: {
        selectChip(id) {
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
        },
        goListItems() {
            this.$store.commit("lists/setIdListSelected", this.listSelected.id);
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
// "quasar-variables" is a Webpack alias injected by Quasar CLI
@import '~quasar-variables';

.container {
    height: 75px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
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
