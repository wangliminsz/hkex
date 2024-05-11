<template>
    <div>
        <div class="container mt-3">
            <div class="row">
                <div class="col">
                    <p class="h3 text-success fw-bold">Let's go
                        <router-link to="/contacts/add" class="btn btn-success btn-sm ms-2"><i
                                class="fa fa-plus-circle me-1"></i>New</router-link>
                    </p>

                    <!-- <br /> -->
                    <p class="fst-italic">
                        Welcome {{ whichUser }}
                    </p>

                    <form @submit.prevent="mySearch">
                        <div class="row">

                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" placeholder="Search..."
                                            v-model="searchName">
                                    </div>
                                    <div class="col">
                                        <input type="submit" value="Submit" class="btn btn-outline-dark btn-md"
                                            :disabled="!isValidSearch">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>

                </div>
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

        <!-- {{ contacts[1] }} -->
        <!-- {{ ups }} -->

        <div class="container mt-3" v-if="contacts.length > 0 && !loading">
            <div class="row">
                <div class="col-md-4" v-for="contact in sortedContacts" :key="contact.fields.id">
                    <div class="card my-2 list-group-item-success shadow-lg">
                        <div class="card-body">



                            <div class="d-flex  justify-content-between">

                                <div class="mb-0">
                                    <template v-if="contact.fields.status">
                                        <div class="d-flex flex-column">
                                            <span class="fw-normal" :style="{
                                                color: contact.fields.status === '進行中' ? 'red' : 'green',
                                                // color: contact.fields.status === '已完成' ? 'green' : null,
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

                            </div>


                            <div class="row align-items-center">
                                <div class="col-sm-10">
                                    <ul class="list-group">

                                        <div class="mb-2">
                                            <li
                                                class="list-group-item d-flex justify-content-between align-items-center">
                                                <div class="d-flex">
                                                    <template v-if="contact.fields.cny_1">
                                                        <div class="d-flex flex-column">
                                                            <span class="fw-normal text-sm" :style="{
                                                                color: contact.fields.status === '進行中' ? 'red' : 'green',
                                                                // color: contact.fields.status === '已完成' ? 'green' : null,
                                                                // textDecoration: contact.fields.status === '已完成' ? 'line-through' : null
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
                                                    <template v-if="contact.fields.cny_2">
                                                        <div class="d-flex flex-column">
                                                            <span class="fw-normal text-sm" :style="{
                                                                color: contact.fields.status === '進行中' ? 'red' : 'green',
                                                                // color: contact.fields.status === '已完成' ? 'green' : null,
                                                                // textDecoration: contact.fields.status === '已完成' ? 'line-through' : null
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
                                                    <template v-if="contact.fields.cny_3">
                                                        <div class="d-flex flex-column">
                                                            <span class="fw-normal text-sm" :style="{
                                                                color: contact.fields.status === '進行中' ? 'red' : 'green',
                                                                // color: contact.fields.status === '已完成' ? 'green' : null,
                                                                // textDecoration: contact.fields.status === '已完成' ? 'line-through' : null
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
                                            <!-- </span> -->
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

                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <div class="d-flex">
                                                <template v-if="contact.fields.upstream">
                                                    <div class="d-flex flex-column">
                                                        <span> {{ findUpById(contact.fields.upstream) }} </span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>
                                            <div class="d-flex">
                                                <template v-if="contact.fields.channel">
                                                    <!-- <div class="d-flex flex-column">
                                                        <span class="fw-normal">{{ contact.fields.channel }}</span>
                                                    </div> -->
                                                    <div class="d-flex flex-column">
                                                        <span> {{ findChById(contact.fields.channel) }} </span>
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
                                                        <span class="fw-normal">{{ contact.fields.usd_rate_1 }}</span>
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
                                                        <span class="fw-normal">{{ contact.fields.usd_rate_2 }}</span>
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
                                                        <span class="fw-normal">{{ contact.fields.usd_rate_3 }}</span>
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
                                            <span class="fw-normal" style="color: blue;">{{ contact.fields.hkd
                                                }}</span>
                                        </li>

                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <div class="d-flex">
                                                <template v-if="contact.fields.hkd_rate_1">
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal" style="color: blue;">{{
                                                            contact.fields.hkd_rate_1 }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal text-sm"
                                                            style="color: blue;">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>
                                            <div class="d-flex">
                                                <template v-if="contact.fields.hkd_rate_2">
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal" style="color: blue;">{{
                                                            contact.fields.hkd_rate_2 }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal text-sm"
                                                            style="color: blue;">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>
                                            <div class="d-flex">
                                                <template v-if="contact.fields.hkd_rate_3">
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal" style="color: blue;">{{
                                                            contact.fields.hkd_rate_3 }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex )flex-column">
                                                        <span class="fw-normal text-sm"
                                                            style="color: blue;">&nbsp;</span>
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
                                                        <span class="fw-normal text-sm"
                                                            style="color: blue;">&nbsp;</span>
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
                                                        <span class="fw-normal text-sm"
                                                            style="color: blue;">&nbsp;</span>
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
                                                        <span class="fw-normal text-sm"
                                                            style="color: blue;">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>
                                        </li>

                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <!-- <div class="d-flex"> -->
                                            <span class="fw-normal token ms-1">
                                                <template v-if="contact.fields.memo">
                                                    {{ contact.fields.memo }}
                                                </template>
                                                <template v-else>
                                                    &nbsp;
                                                </template>
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div class="col-sm-1">
                                    <!-- <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center"> -->
                                    <router-link :to="`/contacts/view/${contact.fields.id}`"
                                        class="btn btn-warning my-1 me-2">
                                        <i class="fa fa-eye"></i>
                                    </router-link>
                                    <router-link :to="`/contacts/edit/${contact.fields.id}`"
                                        class="btn btn-primary my-1 me-2">
                                        <i class="fa fa-pen"></i>
                                    </router-link>
                                    <button class="btn btn-danger my-1 me-2" @click="myDelete(contact.fields.id)">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                    <!-- <span v-if="contact.fields.memo">M</span> -->
                                    <!-- <span v-if="contact.fields.pay_period === 'Quarterly'">Q</span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ContactService } from '@/services/ContactService'
import mySpinner from '@/components/Spinner.vue'
import { supabase } from '@/clients/supabase'

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {

    components: {
        mySpinner
    },

    data() {
        return {

            searchName: null,

            loading: false,
            contacts: [],
            ups: [],
            chs: [],

            upstream: '',
            channel: '',

            errorMessage: null,

            timer: "",
            value: 0,

            currentUserId: '',

            selectedStatus: null, // 当前选中的状态
            statusOptions: [
                { id: 'inlineCheckbox1', value: '進行中', text: '進行中' },
                { id: 'inlineCheckbox2', value: '已完成', text: '已完成' }
            ]

        }
    },

    computed: {

        ...mapGetters([
            'isLoggedIn',
            'whichUser'
        ]),

        formatted_cny_usd_1() {
            return this.contacts.fields.cny_usd_1.toFixed(0);
        },

        sortedContacts() {
            return this.contacts.slice().sort((a, b) => {
                // 定义状态的优先级
                const statusPriority = {
                    '進行中': 1,
                    '已完成': 2,
                    '': 3 // 空状态赋予最高权重，即排在最后
                };

                // 获取两个记录的状态优先级
                const priorityA = statusPriority[a.fields.status] || statusPriority[''];
                const priorityB = statusPriority[b.fields.status] || statusPriority[''];

                // 如果优先级不同，根据优先级排序
                if (priorityA !== priorityB) {
                    return priorityA - priorityB;
                }

                // 如果优先级相同，即状态相同，比较 'update_date' 字段，降序排序
                const dateA = new Date(a.fields.update_date || '1970-01-01T00:00:00Z');
                const dateB = new Date(b.fields.update_date || '1970-01-01T00:00:00Z');
                return dateB - dateA;
            });
        },

        truncatedToken() {
            const maxLength = 10 // Change this to whatever maximum length you want to display
            if (this.contact.notify_token) {
                const truncated = this.contact.notify_token.substring(0, maxLength)
                return truncated.length < this.contact.notify_token.length ? truncated + "..." : truncated
            } else {
                return this.contact.notify_token
            }
        },

        isValidSearch() {
            return Boolean(this.searchName);
        },
    },

    created: async function () {

        this.currentUserId = await this.currentUser();

        if (this.currentUserId) {
            try {
                this.loading = true

                if (this.$store.state.homeList_up.length > 0 && this.$store.state.homeList_ch.length > 0) {
                    this.ups = this.$store.state.homeList_up
                    this.chs = this.$store.state.homeList_ch
                } else {
                    let response_ups = await ContactService.getUpstreams()
                    let response_chs = await ContactService.getChannels()

                    this.ups = response_ups.data.records
                    this.chs = response_chs.data.records
                }

                if (this.$store.state.homeList.length > 0) {
                    this.contacts = this.$store.state.homeList
                    await this.$store.dispatch('clearHomeAction')
                } else {
                    let response = await ContactService.getHK_main(this.currentUserId)
                    this.contacts = response
                    let theList
                    theList = this.contacts
                    await this.$store.dispatch('uploadRecordsAction', {
                        theList
                    })
                }

                this.loading = false
            }
            catch (error) {
                this.errorMessage = error
                this.loading = false
            }
        }
    },

    mounted() {
        this.loadStateFromLocalStorage();
    },

    methods: {

        toggleStatus(selectedValue) {
            // 遍历状态选项并取消选择所有其他选项
            this.statusOptions.forEach(option => {
                if (option.value !== selectedValue) {
                    option.checked = false;
                }
            });
        },

        findUpById(linkId) {
            const contact = this.ups.find(
                (contact) => contact.fields.id == linkId
            );
            return contact ? contact.fields.name : null;
        },

        findChById(linkId) {
            const contact = this.chs.find(
                (contact) => contact.fields.id == linkId
            );
            return contact ? contact.fields.name : null;
        },

        ...mapActions(["loadStateFromLocalStorage"]),

        async currentUser() {
            const localUser = await supabase.auth.getSession();
            if (localUser.data.session) {
                // it'ok
                // console.log(localUser)
                // console.log('user-id----------->', localUser.data.session.user.id)
                // it'ok
                return localUser.data.session.user.id
            } else {
                console.log('not signin')
            }
        },

        async myDelete(itemId) {
            this.currentUserId = await this.currentUser();

            if (this.currentUserId) {
                if (confirm("Confirm delete?")) {
                    try {
                        this.loading = true
                        let response = await ContactService.deleteHKRecord(itemId, this.currentUserId)
                        if (response) {
                            let response = await ContactService.getHK_main(this.currentUserId)
                            this.contacts = response //all records more than 100
                            let theList
                            theList = this.contacts
                            await this.$store.dispatch('uploadRecordsAction', {
                                theList
                            })
                            this.loading = false
                        }
                    }
                    catch (error) {
                        this.errorMessage = error
                        this.loading = false
                    }
                }
            }
        },

        async mySearch() {
            this.currentUserId = await this.currentUser();

            if (this.currentUserId) {

                try {
                    const records = this.contacts.filter(contact => contact.fields.desc.toLowerCase().includes(this.searchName.toLowerCase()));

                    let homeList
                    homeList = this.contacts

                    let homeList_up
                    let homeList_ch
                    homeList_up = this.ups
                    homeList_ch = this.chs

                    let theList
                    theList = records

                    let theList_up
                    let theList_ch
                    theList_up = this.ups
                    theList_ch = this.chs

                    // console.log('search --->>>>>>>>>', theList)

                    await this.$store.dispatch('uploadSearchAction', {
                        theList, theList_up, theList_ch, homeList, homeList_up, homeList_ch
                    })

                    this.$router.push("/search"); // Navigate to the page
                }
                catch (error) {
                    this.errorMessage = error
                    this.loading = false
                }
            }

        },

    }
}

</script>

<style scoped>
.token {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 150px;
    /* adjust this value to change the maximum width */
}

.token_long {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
    /* adjust this value to change the maximum width */
}
</style>