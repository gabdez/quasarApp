<template>
    <q-page class="flex flex-center loginWallpaper">
        <!-- <q-img src="assets/family_market.png" class="loginWallpaper"></q-img> -->
        <LoginVue/>
    </q-page>
</template>

<style scoped>
.loginWallpaper {
    width: 100%;
    height: 100%;
    background: url("../assets/family_market.png") no-repeat;
    background-position-x: center;
    background-position-y: 30%;
    background-size: contain 100%;
    -webkit-background-size: contain 100%;
}
</style>

<script>
import LoginVue from "../components/Login.vue";
export default {
    name: "PageLogin",
    components: { LoginVue }
};
</script>
