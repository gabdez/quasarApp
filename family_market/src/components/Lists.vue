<template>
    <div class="q-px-sm">
        <!-- 
        <h5 class="text-weight-thin q-pa-md q-ma-none text-center text-white">Your todo-market lists</h5>-->
        <template>
            <!-- <q-tab-panels
                swipeable
                :value="listSelected.id"
                animated
                transition-prev="slide-right"
                transition-next="slide-left"
                v-touch-swipe.mouse.right.left="handleSwipe"
            >
            <q-tab-panel v-for="list in allLists" :key="list.id" :name="list.id">-->
            <q-card
                v-for="list in allLists"
                :key="list.id"
                :name="list.id"
                v-ripple
                class="my-card text-white q-ma-lg shadow-8"
                @click="goListItems()"
                :style="{background: styleCards}"
            >
                <q-card-section>
                    <div class="text-h6 text-center text-weight-light text-uppercase">{{list.name}}</div>
                    <!-- <div class="text-subtitle1 text-weight-light">
                        created by
                        <q-chip color="white">{{list.creator.username}}</q-chip>
                    </div>-->
                    <!-- <div class="text-subtitle1 text-weight-light">
                        type: {{list.type}} list
                        <q-icon :name="list.type == 'market' ?'shopping_cart' : 'list'" size="20px"></q-icon>
                    </div>-->
                    <div class="text-subtitle1 text-weight-light" v-if="allUsers.length > 0">
                        Users:
                        <q-chip v-for="(user, index) in allUsers" :key="index" color="white">{{user.username}}</q-chip>
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
            <!-- </q-tab-panel>
            </q-tab-panels>-->
        </template>
        <!-- <div class="container">
            <q-chip class="bg-white" v-for="list in allLists" :key="list.id" :selected="listSelected.id == list.id" @click="selectChip(list.id)">
                <q-avatar color="red" text-color="white">
                    <q-icon :name="list.type == 'market' ?'shopping_cart' : 'list'" size="20px"></q-icon>
                </q-avatar>
                {{list.name}}
                <q-icon v-if="list.favorite" name="star" color="yellow"></q-icon>
            </q-chip>
        </div>-->
        <q-dialog v-model="confirmDelete" persistent>
            <q-card class="cardRadius">
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="red" text-color="white"/>
                    <span class="q-ml-sm">You definitively want to delete the list?</span>
                </q-card-section>

                <q-card-actions class="cardAction">
                    <q-btn flat class="btnL q-ma-none" label="Cancel" color="primary" v-close-dialog/>
                    <q-btn flat class="btnR" color="red-14" label="Delete" @click="deleteList()" v-close-dialog/>
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
            allUsers: [],
            styleCards: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
        };
    },
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
        },
        handleSwipe({ evt, ...info }) {
            if (info.distance.y > 0) {
                this.$store
                    .dispatch("lists/swipeList", info.direction)
                    .then(() => {
                        console.log("swipe successfull");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
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

.my-card {
    -webkit-border-radius: 35px;
    -moz-border-radius: 35px;
    border-radius: 35px;
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
