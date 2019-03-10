<template>
    <div id="q-app">
        <transition name="page" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style>
.page-enter-active,
.page-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}
.page-enter,
.page-leave-to {
    opacity: 0;
    transform: translateY(-20%);
}
</style>
