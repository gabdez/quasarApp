<template>
    <div>
        <!-- <h5 class="text-center text-weight-light text-uppercase text-white">
            Edit {{list.name}}
            <q-icon name="star" :color="list.favorite ? 'yellow': ''" @click="list.favorite = !list.favorite"></q-icon>
        </h5>-->
        <q-input filled bg-color="white" v-model="list_.name" stack-label label="List name"/>
        <br>
        <q-input v-model="list_.description" bg-color="white" label="Description" filled type="textarea"/>
        <br>
        <div class="q-mt-md">
            <span class="text-subtitle2" style="min-width: 100px;">All users</span>
            <div class="container q-mt-sm">
                <!-- card for add new user -->
                <q-card flat class="cardUser cardAddUser">
                    <q-card-section align="center">
                        <q-btn outline color="white" label icon="ion-ios-person-add"/>
                        <!-- 
                        <q-icon name="ion-ios-person-add" outline size="80px" color="red"/>-->
                        <div class="text-white">Add new user</div>
                    </q-card-section>
                </q-card>

                <!-- all users cards -->
                <q-card v-for="user in usersInfo" :key="user.email" flat class="cardUser" :class="{'bgMyself': myUser.username == user.username}">
                    <q-card-section align="center">
                        <q-avatar class="flex-center q-mr-sm">
                            <img :src="'../assets/avatars/'+ user.url">
                            <q-badge v-if="myUser.username == user.username" color="white" class="text-black" floating>Me</q-badge>
                        </q-avatar>
                    </q-card-section>
                    <q-card-section align="center">
                        <div class="text-h6">{{user.username}}</div>
                        <div class="text-subtitle2">{{user.username == list.creator.username ? 'Creator' : 'User'}}</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="flex flex-center q-mt-md">
            <q-btn unelevated outline color="primary" label="Edit" @click="endEdit"/>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
.cardUser {
    background-color: rgba(251, 251, 251, 1);
    border-radius: 10%;
    min-width: 115px;
    max-width: 115px;
    min-height: 175px;
    margin-right: 10px;
}
.cardAddUser {
    display: flex;
    align-items: center;
    background-color: #f44336;
}
.bgMyself {
    background-color: #2196f3;
    color: white;
}
.bgMyself img {
    border: solid 2px white;
}
</style>

<script>
import { LocalStorage } from "quasar";
export default {
    name: "EditList",
    props: ["list", "usersInfo"],
    data() {
        return {
            list_: null
        };
    },
    beforeMount() {
        this.list_ = Object.assign({}, this.list);
    },
    methods: {
        endEdit() {
            this.$store
                .dispatch("lists/setList", this.list_)
                .then(() => {
                    this.$router.go(-1);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    computed: {
        myUser() {
            // correspond to the user actually connected with his account
            return this.$store.state.users.user;
        }
    }
};
</script>
