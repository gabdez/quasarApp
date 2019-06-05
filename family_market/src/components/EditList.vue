<template>
    <div>
        <q-input
            filled
            bg-color="white"
            v-model="list_.name"
            stack-label
            label="List name"
        />
        <br />
        <q-input
            v-model="list_.description"
            bg-color="white"
            label="Description"
            filled
            type="textarea"
        />
        <br />
        <div class="q-mt-md">
            <span class="text-subtitle2" style="min-width: 100px;"
                >All users</span
            >
            <div class="container q-mt-sm">
                <!-- card for add new user -->
                <q-card
                    flat
                    class="cardUser cardAddUser"
                    @click="addModal = true"
                >
                    <q-card-section align="center">
                        <q-btn
                            outline
                            color="white"
                            label
                            icon="ion-ios-person-add"
                        />
                        <div class="text-white">Add new user</div>
                    </q-card-section>
                </q-card>

                <!-- all users cards -->
                <q-card
                    v-for="user in usersInfoFiltered"
                    :key="user.email"
                    flat
                    class="cardUser"
                    @click="optionUser(user)"
                    :class="{ bgMyself: myUser.username == user.username }"
                >
                    <q-card-section align="center">
                        <q-avatar class="flex-center q-mr-sm">
                            <img :src="'statics/avatars/' + user.url" />
                            <q-badge
                                v-if="myUser.username == user.username"
                                color="white"
                                class="text-black"
                                floating
                                >Me</q-badge
                            >
                        </q-avatar>
                    </q-card-section>
                    <q-card-section align="center">
                        <div class="text-h6">{{ user.username }}</div>
                        <div class="text-subtitle2">
                            {{
                                user.username == list.creator.username
                                    ? "Creator"
                                    : "User"
                            }}
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="flex flex-center q-mt-md">
            <q-btn
                unelevated
                outline
                color="primary"
                label="Edit"
                @click="endEdit"
            />
        </div>

        <!-- all dialogs -->
        <q-dialog v-model="addModal">
            <q-card style="min-width: 300px;">
                <q-card-section class="row items-center">
                    <div class="text-h6 text-uppercase">Search user</div>
                    <q-space />
                    <q-btn
                        icon="close"
                        size="15px"
                        @click="addModal = false"
                        flat
                        round
                        dense
                    />
                </q-card-section>

                <q-card-section>
                    <q-input
                        rounded
                        outlined
                        dense
                        v-model="searchUsername"
                        placeholder="username"
                    >
                        <template v-slot:append>
                            <q-icon
                                v-if="searchUsername"
                                name="close"
                                @click.stop="searchUsername = null"
                            ></q-icon>
                        </template>
                        <template v-slot:prepend>
                            <q-icon name="search"></q-icon>
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-section>
                    <q-list bordered separator>
                        <q-item v-if="usersFind.length == 0">
                            <q-item-section avatar>
                                <q-icon name="block"></q-icon>
                            </q-item-section>
                            <q-item-section>{{ messageModal }}</q-item-section>
                        </q-item>
                        <q-item
                            v-else
                            v-for="user in usersFind"
                            :key="user.email + '-add'"
                        >
                            <q-item-section avatar>
                                <q-avatar>
                                    <img :src="'statics/avatars/' + user.url" />
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>{{ user.username }}</q-item-section>
                            <q-item-section side>
                                <q-btn
                                    small
                                    outline
                                    color="red"
                                    icon="ion-ios-add"
                                    @click="addUser(user)"
                                />
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="confirm" persistent>
            <q-card class="cardRadius">
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="red" text-color="white" />
                    <span class="q-ml-sm">Delete this user from the list?</span>
                </q-card-section>

                <q-card-actions class="cardAction">
                    <q-btn
                        flat
                        class="btnModal q-ma-none"
                        label="Cancel"
                        color="primary"
                        @click="cancel"
                    />
                    <q-btn
                        flat
                        label="Delete"
                        class="btnModal"
                        color="red-14"
                        @click="deleteUser"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { LocalStorage } from "quasar";
export default {
    name: "EditList",
    props: ["list", "usersInfo"],
    data() {
        return {
            list_: null,
            addModal: false,
            searchUsername: null,
            usersFind: [],
            messageModal: "",
            confirm: false,
            userToDelete: null
        };
    },
    beforeMount() {
        this.list_ = Object.assign({}, this.list);
    },
    watch: {
        searchUsername() {
            if (this.searchUsername && this.searchUsername.length > 0) {
                this.$store
                    .dispatch("users/searchUser", this.searchUsername)
                    .then(doc => {
                        this.usersFind.push(doc);
                    })
                    .catch(err => {
                        this.usersFind.length = [];
                        this.messageModal = this.searchUsername + " not exist";
                    });
            } else {
                this.usersFind.length = [];
                this.messageModal = null;
            }
        }
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
        },
        addUser(user) {
            if (!this.list.users.includes(user.id)) {
                var payload = {};
                payload.userId = user.id;
                payload.listId = this.list.id;

                this.$store
                    .dispatch("lists/addUserToList", payload)
                    .then(() => {
                        this.$q.notify({
                            message:
                                user.username +
                                " added successfully to the list!",
                            color: "green",
                            timeout: 2500
                        });
                        this.searchUsername = null;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this.$q.notify({
                    message: user.username + " is already a user",
                    color: "red",
                    timeout: 2500
                });
            }
        },
        deleteUser() {
            var payload = {};
            payload.userId = this.userToDelete.id;
            payload.listId = this.list.id;
            this.$store
                .dispatch("lists/deleteUserToList", payload)
                .then(() => {
                    this.$q.notify({
                        message: " User delete successfully of the list!",
                        color: "green",
                        timeout: 2500
                    });
                    this.userToDelete = null;
                    this.confirm = false;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        cancel() {
            this.confirm = false;
            this.userToDelete = null;
        },
        optionUser(user) {
            if (this.myUser.id != user.id) {
                this.confirm = true;
                this.userToDelete = user;
            }
        }
    },
    computed: {
        myUser() {
            // correspond to the user actually connected with his account
            return this.$store.state.users.user;
        },
        usersInfoFiltered() {
            return this.usersInfo.filter(obj => obj != undefined);
        }
    }
};
</script>

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
