<template>
    <div>
        <h5 class="text-center text-weight-light text-uppercase text-white">Account settings</h5>
        <q-input outlined color="light-blue-5" bg-color="white" v-model="user.username" stack-label label="username"/>
        <br>
        <q-input v-model="user.email" readonly color="light-blue-5" bg-color="white" label="email" filled/>
        <q-select
            class="q-mt-sm"
            filled
            v-model="user.color"
            color="white"
            :style="{'background-color':user.color}"
            :options="arrayColors"
            label="your items color"
        >
            <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" :style="{'background-color':scope.opt}" class="text-white">
                    <q-item-section>
                        <q-item-label v-html="scope.opt"/>
                    </q-item-section>
                </q-item>
            </template>
            <template v-slot:selected-item="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" :style="{'background-color':scope.opt}" class="text-white">
                    <q-item-section>
                        <q-item-label v-html="scope.opt"/>
                    </q-item-section>
                </q-item>
            </template>
        </q-select>
        <br>
        <div class="flex flex-center">
            <q-btn class="q-mr-sm" unelevated outline color="white" label="cancel" @click="$router.go(-1);"/>
            <q-btn unelevated color="green" label="Update Account" @click="updateAccount"/>
        </div>
    </div>
</template>

<style scoped>
.my-picker {
    max-width: 250px;
    max-height: 250px;
}
</style>

<script>
export default {
    name: "AccountSetting",
    props: ["user"],
    data() {
        return {
            arrayColors: ["#5271FF", "#26A69A", "#9C27B0", "#21BA45", "#C10015", "#31CCEC", "#F2C037", "#027BE3", "#000000", "#ffffff"]
        };
    },
    mounted() {
        console.log("mounted");
        console.log(this.user);
    },
    methods: {
        updateAccount() {
            this.$store.dispatch("users/updateUserFirebase");
            this.$router.go(-1);
        }
    }
};
</script>
