<template>
    <q-layout>
        <q-page-container class="bgListLayout" style="padding-top:0px">
            <transition name="list">
                <keep-alive include="PageAllLists">
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </q-page-container>
    </q-layout>
</template>

<style>
</style>

<script>
export default {
    name: "LayoutAllLists",
    data() {
        return {};
    },
    mounted() {
        this.$q.loading.hide();
    },
    methods: {}
};
</script>
