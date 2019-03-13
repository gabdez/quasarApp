<template>
    <div style="padding-top:75px;">
        <!--         <q-input outlined color="light-blue-5" bg-color="white" v-model="username" placeholder="username"/>
        <br>
        <q-input v-model="password" bg-color="white" color="light-blue-5" outlined type="password" placeholder="password"/>
        <br>-->
        <span class="row justify-center">
            <q-btn color="light-blue-5" :ripple="false" label="Go shopping" :icon-right="'fas fa-shopping-cart'" @click="$router.push('/allLists')"/>
        </span>
        <q-btn @click="firebaseTest">firebase</q-btn>
        {{error}}
    </div>
</template>

<style scoped>
</style>

<script>
import firebase from "firebase";
export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
            isPwd: true,
            error: "rien"
        };
    },
    methods: {
        firebaseTest() {
            var self = this;
            var db = firebase.firestore();
            db.collection("lists")
                .doc("list4")
                .set({
                    type: "market"
                })
                .then(function() {
                    self.error = "Document written with ID: ";
                })
                .catch(function() {
                    self.error = "Error adding document:";
                });
            /*             db.collection("lists")
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        console.log(doc);
                        //console.log(`${doc.id} => ${doc.data()}`);
                    });
                }); */
        }
    }
};
</script>
