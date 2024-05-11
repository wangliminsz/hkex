<!-- <template>
    <nav class="navbar navbar-dark bg-success navbar-expand-sm">
        <div class="container">
            <router-link to="/" class="navbar-brand">
                
            </router-link>
            <button v-if="isLoggedIn" class="btn btn-light" @click="submitLogout">Logout</button>
        </div>
    </nav>
</template> -->

<template>
    <nav class="navbar navbar-dark bg-success navbar-expand-sm fixed-navbar-height">
        <div class="container">
            <router-link to="/" class="navbar-brand">

                <div class="ml-12" style="position: absolute; top: 10px; left: 0px;">
                    <i class="fa fa-mobile"></i>
                    <span class="ml-2">Hongkong
                    </span>
                </div>

            </router-link>
            <button v-if="isLoggedIn" class="btn btn-light" @click="submitLogout">Logout</button>
        </div>
    </nav>
</template>

<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: 'NavBar',

    data() {
        return {
            whichUserAbbr: ''
        }
    },

    mounted() {
        this.loadStateFromLocalStorage();
    },

    methods: {
        ...mapActions(["loadStateFromLocalStorage"]),

        submitLogout() {
            this.logout({ router: this.$router })
        },

        ...mapActions(['logout'])
    },

    computed: {
        ...mapGetters([
            'isLoggedIn',
            'whichUser'
        ]),

        formattedWhichUser() {
            let userAbbr = this.whichUser.substring(0, this.whichUser.indexOf('@'));
            return userAbbr.charAt(0);
        }
    }
}
</script>

<style scoped>
.fixed-navbar-height {
    height: 50px;
    /* Change this to the height you want */
}

.myFixedClass {
    position: absolute;
    top: 5px;
    /* Change according to your needs */
    left: 30px;
    /* Change according to your needs */
}
</style>