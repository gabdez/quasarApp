<template>
    <q-page class="flex flex-center loginWallpaper">
        <LoginVue/>
        <div class="fixed-bottom text-center q-mb-sm text-white text-italic">
            <hr class="hr q-mb-sm" style="width:90%">
            <a @click="$router.push('/Signin')">
                No account? Sign in!
                <q-icon name="ion-ios-arrow-forward" class="q-ml-sm" size="20px"></q-icon>
            </a>
        </div>
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
