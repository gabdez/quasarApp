<template>
    <q-layout>
        <q-page-container>
            <transition name="page" mode="out-in">
                <router-view></router-view>
            </transition>
        </q-page-container>
    </q-layout>
</template>

<style>
</style>

<script>
export default {
    name: "Home",
    data() {
        return {};
    },
    methods: {}
};
</script>