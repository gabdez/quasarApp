<template>
    <div>
        <h5 class="text-center text-weight-light text-uppercase text-white">new List
            <q-icon name="star" :color="list.favorite ? 'yellow': ''" @click="list.favorite = !list.favorite"></q-icon>
        </h5>
        <q-input
            outlined
            bottom-slots
            color="light-blue-5"
            bg-color="white"
            v-model="list.name"
            stack-label
            label="List name"
            :rules="[val => !!val || 'Field is required']"
        />
        <br>
        <q-input v-model="list.description" color="light-blue-5" bg-color="white" label="Description" filled type="textarea"/>
        <br>
        <q-select filled v-model="opt" bg-color="white" :options="options" label="list type">
            <template v-slot:selected-item="scope">
                <q-chip dense :tabindex="scope.tabindex" color="white" text-color="secondary" class="q-ma-none">
                    <q-avatar color="primary" text-color="white" :icon="scope.opt.icon"/>
                    {{ scope.opt.label }}
                </q-chip>
            </template>
            <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section avatar>
                        <q-icon color="primary" :name="scope.opt.icon"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label v-html="scope.opt.label"/>
                    </q-item-section>
                </q-item>
            </template>
        </q-select>
        <br>
        <div class="flex flex-center">
            <q-btn class="q-mr-sm" unelevated outline color="white" label="cancel" @click="$router.go(-1);"/>
            <q-btn :disabled="list.name == ''" unelevated color="red" label="let's create" @click="createList"/>
        </div>
    </div>
</template>

<style scoped>
</style>

<script>
import { uuid } from "vue-uuid";
import { LocalStorage } from "quasar";
export default {
    name: "CreateList",
    props: [],
    components: {},
    data() {
        return {
            options: [{ label: "todo", value: "todo", icon: "list" }, { label: "market", value: "market", icon: "shopping_cart" }],
            opt: { label: "market", value: "market", icon: "shopping_cart" },
            list: {
                id: null,
                name: "",
                creator: "gabriel",
                type: "",
                date: "21/02/19",
                description: "",
                favorite: false,
                counter: 1,
                items: []
            }
        };
    },
    methods: {
        createList() {
            this.list.id = this.$uuid.v1();
            this.list.date = this.$store.getters["items/getDate"];
            console.log(JSON.stringify(this.list));
            this.$store.commit("items/addList", this.list);
            LocalStorage.set("list_todo_market", this.$store.getters["items/getAllLists"]);
            this.$router.go(-1);
        }
    }
};
</script>
