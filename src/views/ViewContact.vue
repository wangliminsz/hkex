<template>
    <div>
        <div class="container mt-3">
            <div class="d-flex justify-content-start align-items-center">
                <h3 class="text-success fw-bold me-3">View</h3>
                <router-link to="/contacts" class="btn btn-success"><i
                        class="fa fa-arrow-alt-circle-left me-1"></i>Back</router-link>
            </div>
        </div>

        <!-- Spinner -->
        <div v-if="loading">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <mySpinner />
                    </div>
                </div>
            </div>
        </div>

        <!-- Error Message -->
        <div v-if="!loading && errorMessage">
            <div class="container mt-3">
                <div class="row">
                    <div class="col">
                        <p class="h5 text-danger fw-bold"> {{ errorMessage }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-3" v-if="!loading && safeLoading">

            <div class="ml-1 mb-0" v-if="safeContactStatus">
                <template v-if="contact.fields.status">
                    <div class="d-flex flex-column">
                        <span class="fw-normal" :style="{
                            color: contact.fields.status === '進行中' ? 'red' : 'green',
                            textDecoration: contact.fields.status === '已完成' ? 'line-through' : null
                        }">
                            {{ contact.fields.status }}
                        </span>
                    </div>
                </template>
                <template v-else>
                    <div class="d-flex flex-column">
                        <span class="fw-normal">&nbsp;</span>
                    </div>
                </template>
            </div>

            <div class="row align-items-center">
                <div class="col-sm-10">
                    <ul class="list-group">


                        <div class="mb-2">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="d-flex">
                                    <template v-if="safeCny1Status">
                                        <div class="d-flex flex-column">
                                            <span class="fw-normal" :style="{
                                                color: contact.fields.status === '進行中' ? 'red' : 'green',
                                                textDecoration: contact.fields.status === '已完成' ? 'line-through' : null
                                            }">{{ contact.fields.cny_1.toFixed(0)
                                                }}</span>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="d-flex flex-column">
                                            <span class="fw-normal">&nbsp;</span>
                                        </div>
                                    </template>
                                </div>
                                <div class="d-flex">
                                    <template v-if="safeCny2Status">
                                        <div class="d-flex flex-column">
                                            <span class="fw-normal" :style="{
                                                color: contact.fields.status === '進行中' ? 'red' : 'green',
                                                textDecoration: contact.fields.status === '已完成' ? 'line-through' : null
                                            }">{{ contact.fields.cny_2.toFixed(0)
                                                }}</span>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="d-flex flex-column">
                                            <span class="fw-normal">&nbsp;</span>
                                        </div>
                                    </template>
                                </div>
                                <div class="d-flex">
                                    <template v-if="safeCny3Status">
                                        <div class="d-flex flex-column">
                                            <span class="fw-normal" :style="{
                                                color: contact.fields.status === '進行中' ? 'red' : 'green',
                                                textDecoration: contact.fields.status === '已完成' ? 'line-through' : null
                                            }">{{ contact.fields.cny_3.toFixed(0)
                                                }}</span>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="d-flex flex-column">
                                            <span class="fw-normal">&nbsp;</span>
                                        </div>
                                    </template>
                                </div>
                            </li>
                        </div>

                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <template v-if="contact.fields.date">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">{{ contact.fields.date }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                            <div class="d-flex">
                                <template v-if="contact.fields.desc">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">{{ contact.fields.desc }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                        </li>

                        <!-- {{ upstream.fields.name }} -->

                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <template v-if="upstream.fields.name">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">{{ upstream.fields.name }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                            <div class="d-flex">
                                <template v-if="channel.fields.name">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">{{ channel.fields.name }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                        </li>


                        <li class="list-group-item"><span class="mr-1"
                                :style="{ textDecoration: contact.fields.usd > 0 ? null : 'line-through' }">USD</span>
                            <span class="fw-normal">{{ contact.fields.usd }}</span>
                        </li>

                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <template v-if="contact.fields.usd_rate_1">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">{{ contact.fields.usd_rate_1
                                            }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                            <div class="d-flex">
                                <template v-if="contact.fields.usd_rate_2">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">{{ contact.fields.usd_rate_2
                                            }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                            <div class="d-flex">
                                <template v-if="contact.fields.usd_rate_3">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">{{ contact.fields.usd_rate_3
                                            }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                        </li>

                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <template v-if="contact.fields.cny_usd_1">
                                    <div class="d-flex flex-column">
                                        <!-- <span class="fw-normal">{{ contact.fields.cny_usd_1 }}</span> -->
                                        <span class="fw-normal text-sm"> {{
                                            contact.fields.cny_usd_1.toFixed(0)
                                        }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                            <div class="d-flex">
                                <template v-if="contact.fields.cny_usd_2">
                                    <div class="d-flex flex-column">
                                        <!-- <span class="fw-normal">{{ contact.fields.cny_usd_2 }}</span> -->
                                        <span class="fw-normal text-sm"> {{
                                            contact.fields.cny_usd_2.toFixed(0)
                                        }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                            <div class="d-flex">
                                <template v-if="contact.fields.cny_usd_3">
                                    <div class="d-flex flex-column">
                                        <!-- <span class="fw-normal">{{ contact.fields.cny_usd_3 }}</span> -->
                                        <span class="fw-normal text-sm"> {{
                                            contact.fields.cny_usd_3.toFixed(0)
                                        }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                        </li>

                        <li class="list-group-item" style="color: blue;"><span class="mr-1"
                                :style="{ textDecoration: contact.fields.hkd > 0 ? null : 'line-through' }">HKD</span>
                            <span class="fw-normal text-sm" style="color: blue;">{{ contact.fields.hkd
                                }}</span>
                        </li>

                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <template v-if="contact.fields.hkd_rate_1">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal text-sm" style="color: blue;">{{
                                            contact.fields.hkd_rate_1 }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal text-sm" style="color: blue;">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                            <div class="d-flex">
                                <template v-if="contact.fields.hkd_rate_2">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal text-sm" style="color: blue;">{{
                                            contact.fields.hkd_rate_2 }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal text-sm" style="color: blue;">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                            <div class="d-flex">
                                <template v-if="contact.fields.hkd_rate_3">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal text-sm" style="color: blue;">{{
                                            contact.fields.hkd_rate_3 }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal text-sm" style="color: blue;">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                        </li>

                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <template v-if="contact.fields.cny_hkd_1">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal text-sm" style="color: blue;">{{
                                            contact.fields.cny_hkd_1.toFixed(0) }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal text-sm" style="color: blue;">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                            <div class="d-flex">
                                <template v-if="contact.fields.cny_hkd_2">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal text-sm" style="color: blue;">{{
                                            contact.fields.cny_hkd_2.toFixed(0) }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal text-sm" style="color: blue;">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                            <div class="d-flex">
                                <template v-if="contact.fields.cny_hkd_3">
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal text-sm" style="color: blue;">{{
                                            contact.fields.cny_hkd_3.toFixed(0) }}</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="d-flex flex-column">
                                        <span class="fw-normal text-sm" style="color: blue;">&nbsp;</span>
                                    </div>
                                </template>
                            </div>
                        </li>

                        <!-- v-if="contact && contact.fields && contact.fields.memo" -->

                        <textarea class="list-group-item" id="txtarea" cols="30" rows="6" v-model="contact.fields.memo">
                        </textarea>

                    </ul>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { ContactService } from "@/services/ContactService";
import { supabase } from "@/clients/supabase";
import mySpinner from "@/components/Spinner.vue";

import DatePicker from 'vue3-datepicker'

export default {
    name: "viewContact",

    components: {
        DatePicker,
        mySpinner,
    },

    data() {
        return {

            contactId: this.$route.params.contactId,
            selectedDate: new Date(), // initially today's date

            contact: {},

            currentUserId: "",
            upstreams: [],
            channels: [],

            upstream: '',
            channel: '',

            errorMessage: "",
            loading: false,

            showDatePicker: false,
        };
    },

    created: async function () {
        this.currentUserId = await this.currentUser();

        if (this.currentUserId) {
            try {
                this.loading = true
                let response = await ContactService.getHKRecord(this.contactId, this.currentUserId)
                if (response) {
                    this.contact = response.data.records[0]
                    let upResponse = await ContactService.getUpstream(this.contact.fields.upstream)
                    let chResponse = await ContactService.getChannel(this.contact.fields.channel)
                    if (upResponse) {
                        this.upstream = upResponse.data.records[0]
                        // console.log('this.upstream ---------->', this.upstream)
                    }
                    if (chResponse) {
                        this.channel = chResponse.data.records[0]
                        // console.log('this.channel ---------->', this.channel)
                    }
                    this.loading = false
                }
            }
            catch (error) {
                this.errorMessage = error
                this.loading = false
            }
        }
    },

    // mounted() {

    //   // this.contact.pay_period = "Monthly";
    // },

    watch: {
        // // Watch for changes on rent_start
        // 'selectedDate': function (newDate) {
        //   // Convert to local date string and slice to only get yyyy-mm-dd
        //   let dateWithCorrectTimeZone = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()));
        //   this.contact.date = dateWithCorrectTimeZone.toISOString().slice(0, 10);
        // },

        // 'the_RentEnd': function (newDate) {
        //   // Convert to local date string and slice to only get yyyy-mm-dd
        //   let dateWithCorrectTimeZone = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()));
        //   this.contact.rent_end = dateWithCorrectTimeZone.toISOString().slice(0, 10);
        // },

        // 'contact.upstream': function (up) {
        //   // Convert to local date string and slice to only get yyyy-mm-dd
        //   this.contact.upstream_name = up.toString();
        // },

    },

    computed: {

        safeLoading() {
            return this.contact?.fields;
        },

        safeContactStatus() {
            return this.contact?.fields?.status;
        },
        safeCny1Status() {
            return this.contact?.fields?.cny_1;
        },
        safeCny2Status() {
            return this.contact?.fields?.cny_2;
        },
        safeCny3Status() {
            return this.contact?.fields?.cny_3;
        },

        isValidDesc() {
            return Boolean(this.contact.desc);
        },

        isValidUSD() {
            if (this.contact.usd == '') {
                return false;
            }
            const usdNumber = Number(this.contact.usd);
            return !isNaN(usdNumber);
        },

        isValidUSD_rate1() {
            const usdRate1 = Number(this.contact.usd_rate_1);
            return !isNaN(usdRate1);
        },

        isValidUSD_rate2() {
            const usdRate2 = Number(this.contact.usd_rate_2);
            return !isNaN(usdRate2);
        },

        isValidUSD_rate3() {
            const usdRate3 = Number(this.contact.usd_rate_3);
            return !isNaN(usdRate3);
        },

        isValidHKD_rate1() {
            const hkdRate1 = Number(this.contact.hkd_rate_1);
            return !isNaN(hkdRate1);
        },

        isValidHKD_rate2() {
            const hkdRate2 = Number(this.contact.hkd_rate_2);
            return !isNaN(hkdRate2);
        },

        isValidHKD_rate3() {
            const hkdRate3 = Number(this.contact.hkd_rate_3);
            return !isNaN(hkdRate3);
        },

        isValidHKD() {
            if (this.contact.hkd == '') {
                return false;
            }
            const hkdNumber = Number(this.contact.hkd);
            return !isNaN(hkdNumber);
        },

        isValidMemo() {
            return true;
        },

        isFormValid() {
            return (
                (this.isValidUSD || this.isValidHKD)
                // this.isValidDesc &&
                // this.isValidUSD_rate1 &&
                // this.isValidUSD_rate2 &&
                // this.isValidUSD_rate3 &&
                // this.isValidHKD_rate1 &&
                // this.isValidHKD_rate2 &&
                // this.isValidHKD_rate3
                // this.isValidRentStart &&
                // this.isValidRentEnd
                // this.isValidGroup
            );
        },
    },

    methods: {

        async myCreate() {
            // this.loading = true;
            this.currentUserId = await this.currentUser();

            if (this.currentUserId) {
                try {
                    this.contact.user_id = this.currentUserId;
                    this.contact.update_date = new Date().toISOString();
                    this.contact.upstream = String(this.contact.upstream);
                    this.contact.channel = String(this.contact.channel);
                    let dateWithCorrectTimeZone = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()));
                    this.contact.date = dateWithCorrectTimeZone.toISOString().slice(0, 10);

                    if (this.contact.usd === '' || this.contact.usd == 0) {
                        this.contact.usd_rate_1 = 0
                        this.contact.usd_rate_2 = 0
                        this.contact.usd_rate_3 = 0
                    }

                    if (this.contact.hkd === '' || this.contact.hkd == 0) {
                        this.contact.hkd_rate_1 = 0
                        this.contact.hkd_rate_2 = 0
                        this.contact.hkd_rate_3 = 0
                    }

                    let response = await ContactService.airInsertRecord(this.contact);
                    await this.$store.dispatch('clearHomeAction')

                    if (response) {
                        // this.loading = false;
                        const currentRoute = this.$router.currentRoute;
                        if (currentRoute.path !== "/") {
                            this.$router.push("/");
                        }
                    } else {
                        // this.loading = false;
                        const currentRoute = this.$router.currentRoute;
                        if (currentRoute.path !== "/contacts/add") {
                            this.$router.push("/contacts/add");
                        }
                    }
                } catch (error) {
                    this.errorMessage = error;
                    // this.loading = false;
                }
            }
        },

        async currentUser() {
            const localUser = await supabase.auth.getSession();
            if (localUser.data.session) {
                // it'ok
                // console.log(localUser)
                // console.log('user-id----------->', localUser.data.session.user.id)
                // it'ok
                return localUser.data.session.user.id;
            } else {
                console.log("not signin");
            }
        },
    },
};
</script>

<style scoped>
.token {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
    /* adjust this value to change the maximum width */
}
</style>