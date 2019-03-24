<template>
    <q-list :style="styleList">
        <span class="listArticle">
            <transition-group name="item">
                <template v-for="item in items">
                    <q-item :key="item.id" :class="{'list-item':true, 'checked':item.isCheck}" @click="checkItem(item)">
                        <q-item-section>{{ item.name }}</q-item-section>
                        <q-icon style="text-decoration: none!important;" size="32px" @click.stop="deleteItem(item)" color="red-12" name="clear"/>
                    </q-item>
                    <hr class="hr" :key="item.id+'-hr'">
                </template>
            </transition-group>
            <q-item v-if="items.length == 0" :key="'noArticle'">
                <q-item-section class="text-center">no article in the shopping cart yet</q-item-section>
            </q-item>
        </span>

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
</template>

<script>
import { uuid } from "vue-uuid";
import { scroll } from "quasar";
import { LocalStorage } from "quasar";
const { getScrollTarget, getScrollHeight, setScrollPosition } = scroll;
export default {
    name: "Items",
    props: ["list"],
    data() {
        return { newItemName: "", hideCompleted: false, heightLabel: 0 };
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

.hr {
    padding: 0;
    margin: 0;
    border: white solid 1px;
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

.item-enter-active, .item-leave-active {
    transition: all 0.3s;
}

.item-enter, .item-leave-to { /* .item-leave-active below version 2.1.8 */
    opacity: 0;
    transform: translateX(30px);
}
</style>
