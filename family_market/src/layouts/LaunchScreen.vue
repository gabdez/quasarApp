<template>
    <q-layout class="page">
        <q-page-container class="loginWallpaper page">
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
    name: "LaunchScreen"
};
</script>