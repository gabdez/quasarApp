<template>
    <div>
        <q-input
            stack-label
            dark
            standout
            label="username"
            v-model="user_.username"
        />
        <br />
        <q-input v-model="user_.email" readonly stack-label label="email" />
        <q-select
            class="q-mt-md"
            standout
            dark
            v-model="user_.color"
            color="black"
            :options="arrayColors"
            label="your items color"
        >
            <template v-slot:option="scope">
                <q-item
                    v-bind="scope.itemProps"
                    v-on="scope.itemEvents"
                    class="text-black"
                >
                    <div
                        class="roundColor q-mr-sm"
                        :style="{ backgroundColor: scope.opt }"
                    ></div>
                    <q-item-section>
                        <q-item-label>{{ scope.opt }}</q-item-label>
                    </q-item-section>
                </q-item>
            </template>
            <template v-slot:selected-item="scope">
                <q-item
                    v-bind="scope.itemProps"
                    v-on="scope.itemEvents"
                    class="text-white"
                >
                    <div
                        class="roundColor q-mr-sm"
                        :style="{ backgroundColor: user_.color }"
                    ></div>
                    <q-item-section>
                        <q-item-label v-html="scope.opt" />
                    </q-item-section>
                </q-item>
            </template>
        </q-select>
        <div class="q-mt-md">
            <span class="text-subtitle2 text-white" style="min-width: 100px;"
                >Avatar</span
            >
            <div class="container">
                <q-avatar
                    v-for="(url, index) in avatarUrls"
                    :key="index"
                    @click="changeAvatar(url)"
                    class="q-mr-sm"
                >
                    <img
                        :class="{ borderAvatar: url == user_.url }"
                        :src="'statics/avatars/' + url"
                    />
                    <q-badge v-if="url == user_.url" color="#0084ff" floating>
                        <q-icon name="ion-ios-checkmark" color="white" />
                    </q-badge>
                </q-avatar>
            </div>
        </div>
        <br />
        <div class="flex flex-center">
            <q-btn
                unelevated
                :loading="loading"
                color="primary"
                :class="{ 'full-width': true, btnSuccess: loading }"
                :disable="!hasChanged"
                :label="loading ? '' : 'Save changes'"
                @click="updateAccount"
            />
        </div>
    </div>
</template>

<style scoped>
.my-picker {
    max-width: 250px;
    max-height: 250px;
}
.inputAccount {
    border-radius: 5px;
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
.q-field--float .q-field__label {
    color: white !important;
}
.btnSuccess {
    width: 40px !important;
    border-radius: 50% !important;
    height: 40px;
}
</style>

<script>
import Vue from "vue";
export default {
    name: "AccountSetting",
    props: ["user"],
    data() {
        return {
            arrayColors: [
                "#5271FF",
                "#26A69A",
                "#9C27B0",
                "#ff9800",
                "#C10015",
                "#31CCEC",
                "#F2C037",
                "#027BE3",
                "#000000"
            ],
            user_: null,
            loading: false
        };
    },
    beforeMount() {
        this.user_ = Object.assign({}, this.user);
    },
    methods: {
        updateAccount() {
            this.loading = true;
            setTimeout(() => {
                var user = this.user_;
                this.$store
                    .dispatch("users/updateUserFirebase", user)
                    .then(() => {
                        this.loading = false;
                        this.$q.notify({
                            message: "Changes saved successfully",
                            color: "primary",
                            timeout: 1500
                        });
                    });
                this.$store.state.users.user = this.user_;
            }, 1500);
        },
        changeAvatar(url) {
            Vue.set(this.user_, "url", url);
        }
    },
    computed: {
        avatarUrls() {
            return this.$store.state.users.avatarUrls;
        },
        hasChanged() {
            if (this.user_.username != this.user.username) return true;
            if (this.user_.url != this.user.url) return true;
            if (this.user_.color != this.user.color) return true;

            return false;
        }
    }
};
</script>
