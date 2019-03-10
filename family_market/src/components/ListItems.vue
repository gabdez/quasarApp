<template>
    <q-list :style="styleList">
        <span class="listArticle">
            <transition-group name="list">
                <template v-for="item in items">
                    <q-item :key="item.id" :class="{'list-item':true, 'checked':item.isCheck}" @click="item.isCheck = !item.isCheck">
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
                <q-btn @click="deleteAll" outline color="negative" label="clear all" icon="delete_outline" class="btn_list"/>
            </div>
            <div class="q-gutter-sm">
                <q-checkbox v-model="hideCompleted" label="Hide completed article"/>
            </div>
        </q-item-label>
    </q-list>
</template>

<script>
import { scroll } from "quasar";
const { getScrollTarget, getScrollHeight, setScrollPosition } = scroll;
export default {
    name: "ListItems",
    data() {
        return { newItemName: "", hideCompleted: false };
    },
    methods: {
        addItem() {
            this.$refs.name_article.focus();
            this.$store.commit("items/addItem", this.newItemName.trim());
            this.newItemName = "";
            this.scrollToElement(document.getElementsByClassName("listArticle")[0]);
        },
        deleteItem(item) {
            this.$store.commit("items/deleteItem", item);
        },
        clearCompleted() {
            this.$store.commit("items/clearCompleted");
        },
        deleteAll() {
            this.$store.commit("items/deleteAll");
        },
        scrollToElement(el) {
            let target = getScrollTarget(el);
            let offset = getScrollHeight(target);
            let duration = 100;
            setScrollPosition(target, offset, duration);
        }
    },
    computed: {
        items() {
            return this.hideCompleted ? this.$store.getters["items/getAllUncheckedItems"] : this.$store.getters["items/getAllItems"];
        },
        styleList() {
            console.log("ga");
            let el = document.getElementsByClassName("q-list")[0];
            let height = el ? getScrollTarget(el) : "145px";
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
    width: 100%;
    position: fixed;
    bottom: 0px;
    background-color: white;
}

.list-enter-active, .list-leave-active {
    transition: all 0.3s;
}

.list-enter, .list-leave-to { /* .list-leave-active below version 2.1.8 */
    opacity: 0;
    transform: translateX(30px);
}
</style>
