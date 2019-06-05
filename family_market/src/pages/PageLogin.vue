<template>
    <q-page class="full-height flex justify-center" style="background-image: linear-gradient(to top, rgba(9,32,63,0.9) 0%, rgba(83,120,149,0.9) 100%);">
        <h6 class="text-h3 homefont text-primary q-ma-none q-mt-xl" style="text-align: center">My Family Market</h6>
        <!-- <LoginVue/> -->
        <transition :name="slide" mode="out-in">
            <keep-alive>
                <component :is="component"></component>
            </keep-alive>
        </transition>
        <div class="text-center q-mb-sm text-white text-italic" style="width:90%">
            <q-btn-toggle
                v-model="component"
                class="my-custom-toggle"
                no-caps
                toggle-color="primary"
                color="transparent"
                text-color="white"
                :options="[
                {label: 'connexion', value: 'LoginVue'},
                {label: 'inscription', value: 'SignIn'}
                ]"
            />
        </div>
    </q-page>
</template>

<style lang="stylus">
$custom-color = linear-gradient(to right, #1cd8d2, #93edc7);

.my-custom-toggle
  border: 1px solid $primary;

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
    computed:{
        slide(){
            return this.component == 'LoginVue' ? 'slide-right' : 'slide-left' ;
        }
    }
};
</script>
