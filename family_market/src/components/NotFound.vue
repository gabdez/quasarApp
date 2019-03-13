<template>
    <div class="fullscreen backgroundApp q-pa-lg">
        <q-btn color="white" class="text-red" icon="arrow_back" @click="$router.go(-1)">go Back</q-btn>
        <h5 class="text-white">Cannot find your requested list sorry!</h5>
    </div>
</template>

<style scoped>
</style>

<script>
export default {
    name: "NotFound",
    data() {
        return {};
    },
    methods: {}
};
</script>
