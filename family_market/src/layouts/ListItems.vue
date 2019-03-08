<template>
    <q-layout>
        <span class="row justify-center">
            <q-btn color="light-blue-5" :ripple="false" label="Go shopping" :icon-right="'fas fa-shopping-cart'" @click="$router.push('/')"/>
        </span>
    </q-layout>
</template>

<style></style>

<script>
export default {
    name: "ListItems",
    data() {
        return {};
    },
    methods: {}
};
</script>
