<template>
    <q-page class="full-height flex justify-center" style="background-color: rgba(0,0,0,0.4)">
        <h6 class="text-h3 homefont text-blue-3 q-ma-none q-mt-xl" style="text-align: center">My Family Market</h6>
        <!-- <LoginVue/> -->
        <transition name="list" mode="out-in">
            <keep-alive>
                <component :is="component"></component>
            </keep-alive>
        </transition>
        <div class="text-center q-mb-sm text-white text-italic self-end" style="width:90%">
            <hr class="hr q-mb-sm" style="width:90%">
            <a v-if="component == 'LoginVue'" @click="changeComponent('SignIn')">
                No account? Sign in!
                <q-icon name="ion-ios-arrow-forward" class="q-ml-sm" size="20px"></q-icon>
            </a>
            <a v-else @click="changeComponent('LoginVue')">
                <q-icon name="ion-ios-arrow-back" class="q-mr-sm" size="20px"></q-icon>already have an account? Login !
            </a>
        </div>
    </q-page>
</template>

<style scoped>
</style>

<script>
import LoginVue from "../components/Login.vue";
import SignIn from "../components/SignIn.vue";
export default {
    name: "PageLogin",
    components: { LoginVue, SignIn },
    data() {
        return {
            component: "LoginVue"
        };
    },
    methods: {
        changeComponent(compName) {
            this.component = compName;
        }
    }
};
</script>
