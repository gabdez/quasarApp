<template>
    <q-layout class="custom-bg" view="hHh lpR fFf">
        <q-page-container>
            <transition :name="transitionName" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
            <q-footer
                class="text-primary"
                style="background-color: transparent"
            >
                <q-tabs
                    v-model="tab"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                >
                    <q-route-tab
                        :ripple="false"
                        name="recipes"
                        to="/home/recipes"
                        exact
                        active-class="activeTab"
                        icon="ion-restaurant"
                        label="Recipes"
                    />
                    <q-route-tab
                        :ripple="false"
                        name="home"
                        to="/home"
                        exact
                        active-class="activeTab"
                        icon="list_alt"
                        label="Lists"
                    />
                    <q-route-tab
                        :ripple="false"
                        name="account"
                        to="/home/account"
                        exact
                        active-class="activeTab"
                        icon="account_circle"
                        label="Account"
                    />
                </q-tabs>
            </q-footer>
        </q-page-container>
    </q-layout>
</template>

<style lang="stylus">
.q-tab__content {
    flex-direction: row;
}

.q-tab__content .q-tab__label {
    visibility: hidden;
    opacity: 0;
    position: absolute;
}

.activeTab .q-tab__content .q-tab__label {
    transition: all 0.5s;
    opacity: 1;
    visibility: visible;
    color: $primary;
    padding-left: 5px;
    position: static;
}
</style>

<script>
export default {
    name: "LayoutHome",
    data() {
        return {
            tab: "home",
            transitionName: "slide-left"
        };
    },
    watch: {
        $route(to, from) {
            const toDepth = to.path.split("/").length;
            const fromDepth = from.path.split("/").length;
            if (to.path.split("/")[toDepth - 1] === "account") {
                this.transitionName = "slide-left";
            } else if (to.path.split("/")[toDepth - 1] === "recipes") {
                this.transitionName = "slide-right";
            } else {
                this.transitionName =
                    from.path.split("/")[fromDepth - 1] === "recipes"
                        ? "slide-left"
                        : "slide-right";
            }
        }
    },
    mounted() {
        this.$q.loading.hide();
    }
};
</script>