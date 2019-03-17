<template>
    <q-page class="flex flex-center backgroundApp">
        <SignIn/>
        <div class="fixed-bottom text-center q-mb-sm text-white text-italic">
            <a @click="$router.go(-1)">
                <q-icon name="arrow_back" size="20px"></q-icon>return Login page
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
import SignIn from "../components/SignIn.vue";
export default {
    name: "PageSignIn",
    components: { SignIn }
};
</script>
