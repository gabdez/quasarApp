<template>
    <div>
        <transition name="slide-left">
            <div class="grid-container q-mt-xl" v-if="objItems == null">
                <div
                    class="full-height"
                    v-for="(items, index) in itemsPredefined"
                    :key="items.name"
                    @click="chooseCategorie(index)"
                >
                    {{ items.name }}
                    <q-img
                        :src="'statics/icons/products/' + items.url"
                        spinner-color="white"
                    />
                </div>
                <div
                    class="full-height"
                    v-if="itemsPredefined.length % 2 != 0"
                ></div>
            </div>
            <div v-else class="list-container">
                <q-input
                    class="q-mx-md"
                    rounded
                    outlined
                    v-model="searchItem"
                    dense
                    placeholder="search product"
                >
                    <template v-slot:append>
                        <q-icon
                            name="close"
                            @click="searchItem = null"
                        ></q-icon>
                    </template>
                    <template v-slot:prepend>
                        <q-icon name="search"></q-icon>
                    </template>
                </q-input>
                <q-list>
                    <transition-group name="item">
                        <template v-for="item in listItems">
                            <q-item :key="item.name">
                                <q-item-section>{{ item.name }}</q-item-section>
                                <q-btn
                                    style="text-decoration: none!important;"
                                    outline
                                    size="10px"
                                    color="red-12"
                                    icon="ion-ios-add"
                                    @click="$emit('addItemPredef', item.name)"
                                ></q-btn>
                            </q-item>
                            <hr class="hr q-ma-none" :key="item.name + '-hr'" />
                        </template>
                    </transition-group>
                </q-list>
            </div>
        </transition>
    </div>
</template>

<style scoped lang="stylus">
.grid-container {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 1px;
    background-color: $grey-4;
    padding: 0px;
    margin-top: 100px;
}

.list-container {
    margin-top: 90px;
}

.grid-container > div {
    background-color: $grey-2;
    text-align: center;
    padding: 20px 0;
    font-size: 20px;
    color: $grey-14;
}
</style>

<script>
import itemPredefined from "../statics/data/items.json";
export default {
    name: "AddItemsPredef",
    props: ["objItems"],
    data() {
        return { itemsPredefined: itemPredefined.items, searchItem: null };
    },
    methods: {
        chooseCategorie(indexCat) {
            this.$emit("chooseCategorie", indexCat);
        }
    },
    computed: {
        listItems() {
            return this.searchItem == null
                ? this.objItems.items
                : this.objItems.items.filter(item => {
                      return item.name
                          .toLowerCase()
                          .includes(this.searchItem.toLowerCase());
                  });
        }
    }
};
</script>
