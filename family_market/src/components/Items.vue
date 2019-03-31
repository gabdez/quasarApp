<template>
    <div>
        <q-list :style="styleList">
            <span class="listArticle">
                <transition-group name="item">
                    <template v-for="item in items">
                        <q-item :key="item.id" :class="{'list-item':true, 'checked':item.isCheck}" @click="checkItem(item)">
                            <q-item-section>{{ item.name }}</q-item-section>
                            <q-icon style="text-decoration: none!important;" size="32px" @click.stop="deleteItem(item)" color="red-12" name="clear"/>
                        </q-item>
                        <hr class="hr q-ma-none" :key="item.id+'-hr'">
                    </template>
                </transition-group>
                <q-item v-if="items.length == 0" :key="'noArticle'">
                    <q-item-section class="text-center">no article in the shopping cart yet</q-item-section>
                </q-item>
            </span>
            <q-btn class="fixed" style="bottom: 170px; right: 25px;" round color="red" icon="add" @click="showModal"></q-btn>
            <q-item-label header class="labelHeader">
                <!-- <q-input outlined color="light-blue-5" bg-color="white" value="gabriel" placeholder="username"/> -->
                <q-input dense filled v-model="newItemName" color="light-blue-5" placeholder="name article" ref="name_article">
                    <template v-slot:after>
                        <q-btn :disable="newItemName.trim() == ''" color="light-blue-5" @click="addItem" icon="add_shopping_cart"/>
                    </template>
                </q-input>
                <div class="justify-between flex q-pt-sm">
                    <q-btn @click="clearCompleted" outline color="warning" label="clear completed" icon="done" class="btn_list"/>
                    <q-btn @click="clearAll" outline color="negative" label="clear all" icon="delete_outline" class="btn_list"/>
                </div>
                <div class="q-gutter-sm">
                    <q-checkbox v-model="hideCompleted" label="Hide completed article"/>
                </div>
            </q-item-label>
        </q-list>

        <!-- modal -->
        <q-dialog v-model="dialogMaximized" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
            <q-card class="bg-grey-2">
                <q-card-section class="toolbarCard bg-grey-3">
                    <q-bar class="bg-grey-3">
                        <q-breadcrumbs class="q-mt-md bg-grey-3">
                            <template v-slot:separator>
                                <q-icon size="1.5em" name="chevron_right" color="primary"/>
                            </template>
                            <q-breadcrumbs-el class="text-black" label="Catégories" @click="chooseCategorie(null)"/>
                            <q-breadcrumbs-el class="text-primary" v-if="objItems" :label="objItems.name"/>
                        </q-breadcrumbs>
                        <q-space/>
                        <q-btn dense color="black" size="15px" flat icon="close" @click="dialogMaximized = false"></q-btn>
                    </q-bar>
                </q-card-section>
                <ItemsPredefComp @addItemPredef="addItemPredef" @chooseCategorie="chooseCategorie" :objItems="objItems"></ItemsPredefComp>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import itemPredefined from "../statics/data/items.json";
import { uuid } from "vue-uuid";
import { scroll } from "quasar";
import { LocalStorage } from "quasar";
import ItemsPredefComp from "../components/AddItemsPredef";
const { getScrollTarget, getScrollHeight, setScrollPosition } = scroll;
export default {
    name: "Items",
    props: ["list"],
    components: { ItemsPredefComp },
    data() {
        return { newItemName: "", hideCompleted: false, heightLabel: 0, dialogMaximized: false, indexCat: null };
    },
    mounted() {
        let el = document.getElementsByClassName("labelHeader")[0];
        this.heightLabel = el.clientHeight;
    },
    methods: {
        addItem() {
            this.$refs.name_article.focus();
            var list = this.list;
            let uid = this.$uuid.v1();
            var itemName = this.newItemName.trim();
            var item = { id: uid, name: itemName, isCheck: false };
            this.scrollToElement(document.getElementsByClassName("listArticle")[0]);
            //this.setLocalStorage();
            this.$store
                .dispatch("lists/addItem", { item, list })
                .then(() => {
                    console.log("item added!");
                    this.newItemName = "";
                })
                .catch(err => {
                    console.log(err);
                });
            //this.$store.commit("lists/addItem", { item, list });
        },
        addItemPredef(itemName) {
            var list = this.list;
            let uid = this.$uuid.v1();
            var item = { id: uid, name: itemName, isCheck: false };
            this.scrollToElement(document.getElementsByClassName("listArticle")[0]);
            this.$store
                .dispatch("lists/addItem", { item, list })
                .then(() => {
                    this.$q.notify({
                        message: itemName + " added to list",
                        color: "green",
                        timeout: 1500
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteItem(item) {
            var list = this.list;
            this.$store
                .dispatch("lists/removeItem", { item, list })
                .then(() => {
                    console.log("item deleted!");
                    this.newItemName = "";
                })
                .catch(err => {
                    console.log(err);
                });
            //this.$store.commit("lists/deleteItem", { item, list });
            this.setLocalStorage();
        },
        checkItem(item) {
            item.isCheck = !item.isCheck;
            var idList = this.list.id;
            var items = this.list.items;
            this.$store
                .dispatch("lists/updateItems", { idList, items })
                .then(() => {})
                .catch(err => {
                    console.log(err);
                });
        },
        clearCompleted() {
            var itemsCompleted = this.$store.getters["lists/getAllUncheckedItems"](this.list.id);
            console.log(itemsCompleted);
            var idList = this.list.id;
            this.$store
                .dispatch("lists/clearCompletedItem", { idList, itemsCompleted })
                .then(() => {
                    this.newItemName = "";
                })
                .catch(err => {
                    console.log(err);
                });
            //this.$store.commit("lists/clearCompleted", this.list);
            this.setLocalStorage();
        },
        clearAll() {
            var idList = this.list.id;
            this.$store
                .dispatch("lists/clearAllItem", idList)
                .then(() => {
                    console.log("all item clear");
                })
                .catch(err => {
                    console.log(err);
                });
            //this.$store.commit("lists/deleteAll", this.list);
            //this.setLocalStorage();
        },
        scrollToElement(el) {
            let target = getScrollTarget(el);
            let offset = getScrollHeight(target);
            let duration = 200;
            setScrollPosition(target, offset, duration);
        },
        setLocalStorage() {
            LocalStorage.set("list_todo_market", this.$store.getters["lists/getAllLists"]);
        },
        showModal() {
            this.dialogMaximized = true;
        },
        chooseCategorie(catId) {
            this.indexCat = catId;
        }
    },
    computed: {
        items() {
            return this.hideCompleted
                ? this.$store.getters["lists/getAllUncheckedItems"](this.list.id)
                : this.$store.getters["lists/getAllItems"](this.list.id);
        },
        styleList() {
            let height = this.heightLabel != 0 ? this.heightLabel + "px" : "0px";
            return { paddingBottom: height };
        },
        objItems() {
            return itemPredefined.items[this.indexCat];
        }
    }
};
</script>

<style scoped lang="stylus">
// "quasar-variables" is a Webpack alias injected by Quasar CLI
@import '~quasar-variables';

.q-item {
    background-color: $primary;
    color: white;
}

.q-item.checked {
    background-color: $positive;
}

.q-item__label--header {
    padding-bottom: 5px;
}

.checked .q-item__section {
    text-decoration: line-through !important;
}

.btn_list {
    padding: 5px;
    margin: 0;
}

.labelHeader {
    border-top: solid 1px #5271FF;
    width: 100%;
    position: fixed;
    bottom: 0px;
    background-color: white;
}

.toolbarCard {
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 10000;
}
</style>
