<template>
    <div>
        <!-- <q-input outlined color bg-color="white" v-model="user_.username" stack-label label="username"/> -->
        <q-input filled v-model="user_.username" placeholder="Username"/>
        <br>
        <q-input v-model="user_.email" readonly color bg-color="white" label="email" filled/>
        <q-select class="q-mt-md" filled v-model="user_.color" color="black" :options="arrayColors" label="your items color">
            <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" class="text-black">
                    <div class="roundColor q-mr-sm" :style="{backgroundColor: scope.opt}"></div>
                    <q-item-section>
                        <q-item-label>{{scope.opt}}</q-item-label>
                    </q-item-section>
                </q-item>
            </template>
            <template v-slot:selected-item="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" class="text-white">
                    <div class="roundColor q-mr-sm" :style="{backgroundColor: user_.color}"></div>
                    <q-item-section>
                        <q-item-label v-html="scope.opt"/>
                    </q-item-section>
                </q-item>
            </template>
        </q-select>
        <div class="q-mt-md">
            <span class="text-subtitle2" style="min-width: 100px;">Avatar</span>
            <div class="container">
                <q-avatar v-for="(url, index) in avatarUrls" :key="index" @click="changeAvatar(url)" class="q-mr-sm">
                    <img :class="{'borderAvatar': url == user_.url}" :src="'../assets/avatars/'+url">
                    <q-badge v-if="url == user_.url" color="#0084ff" floating>
                        <q-icon name="ion-ios-checkmark" color="white"/>
                    </q-badge>
                </q-avatar>
            </div>
        </div>
        <br>
        <div class="flex flex-center">
            <q-btn unelevated color="primary" outline label="Update" @click="updateAccount"/>
        </div>
    </div>
</template>

<style scoped>
.my-picker {
    max-width: 250px;
    max-height: 250px;
}
.roundColor {
    height: 35px;
    width: 35px;
    border-radius: 50%;
}
.borderAvatar {
    border: solid 4px #0084ff;
}
.container {
    height: 75px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
</style>

<script>
import Vue from "vue";
export default {
    name: "AccountSetting",
    props: ["user"],
    data() {
        return {
            arrayColors: ["#5271FF", "#26A69A", "#9C27B0", "#ff9800", "#C10015", "#31CCEC", "#F2C037", "#027BE3", "#000000"],
            user_: null
        };
    },
    beforeMount() {
        this.user_ = Object.assign({}, this.user);
    },
    methods: {
        updateAccount() {
            var user = this.user_;
            this.$store.dispatch("users/updateUserFirebase", user);
            this.$store.state.users.user = this.user_;
            this.$router.go(-1);
        },
        changeAvatar(url) {
            Vue.set(this.user_, "url", url);
        }
    },
    computed: {
        avatarUrls() {
            return this.$store.state.users.avatarUrls;
        }
    }
};
</script>
