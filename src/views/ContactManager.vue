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



                    <div class="col-md-4">
                        <table>
                            <tr>
                                <!-- First row, first column -->
                                <td>
                                    <input type="text" class="form-control text-sm input-placeholder-gray"
                                        placeholder="Search..." v-model="searchName">
                                </td>
                                <!-- First row, second column -->
                                <td>
                                    <div class="ml-2 text-sm">
                                        <button @click="mySearch('byName')" class="btn btn-outline-dark btn-sm"
                                            :disabled="!isValidSearch">
                                            Go
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <!-- Second row, first column -->
                                <td>
                                    <div class="form-control text-sm">
                                        <DatePicker v-model="selectedDate" placeholder="Your Date..." />
                                    </div>
                                </td>
                                <!-- Second row, second column -->
                                <td>
                                    <div class="ml-2 text-sm">
                                        <button @click="mySearch('byDate')" class="btn btn-outline-dark btn-sm"
                                            :disabled="!isValidDateSearch">
                                            Go
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>





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

        <div class="container mt-2" v-if="contacts.length > 0 && !loading">
            <div class="row">
                <div class="col-md-5" v-for="contact in sortedContacts" :key="contact.fields.id">
                    <div class="card my-2 list-group-item-success shadow-lg">
                        <div class="card-body">

                            <div class="row align-items-center">

                                <div class="col-sm-10">


                                    <div class="d-flex  justify-content-between">
                                        <div class="mb-1">
                                            <template v-if="contact.fields.status">
                                                <div class="d-flex flex-column">
                                                    <span class="fw-normal" :style="{
                                                        color: contact.fields.status === '進行中' ? 'red' : 'green',
                                                    }">
                                                        {{ contact.fields.status }}
                                                        <span class="ml-2">
                                                            <span v-if="contact.fields.usd_name"> {{
                                                                contact.fields.usd_name }} </span>

                                                            <span class="ml-1">
                                                                {{ contact.fields.usd }}
                                                            </span>
                                                        </span>

                                                    </span>

                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="d-flex flex-column">
                                                    <span class="fw-normal">&nbsp;</span>
                                                </div>
                                            </template>
                                        </div>

                                        <div class="text-sm text-gray-200" v-if="contact.fields.user_email">
                                            {{ userEmail(contact.fields.user_email) }}
                                        </div>
                                    </div>



                                    <ul class="list-group">

                                        <li class="list-group-item d-flex justify-content-between align-items-center">

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

                                        </li>



                                        <!-- usd usd usd usd usd -->


                                        <li v-if="contact.fields.usd > 0"
                                            class="list-group-item  d-flex justify-content-between align-items-left">

                                            <div>
                                                <span class="mr-1"
                                                    :style="{ textDecoration: contact.fields.usd > 0 ? null : 'line-through' }">{{
                                                        contact.fields.usd_name
                                                    }}
                                                </span>
                                                <span class="fw-normal">
                                                    {{ contact.fields.usd }}
                                                </span>
                                            </div>

                                            <!-- <div class="text-sm text-gray-500">
                                                Hello
                                            </div> -->
                                            <div class="mr-2 text-sm text-gray-500"
                                                v-if="contact.fields.usd && contact.fields.cny_usd_1 && (contact.fields.cny_usd_2 || contact.fields.cny_usd_3 || contact.fields.cny_usd_4 || contact.fields.cny_usd_5 || contact.fields.cny_usd_6)">

                                                <template v-if="contact.fields.cny_usd_6">
                                                    {{ (contact.fields.cny_usd_6 - contact.fields.cny_usd_1).toFixed(2)
                                                    }}
                                                </template>
                                                <template v-else-if="contact.fields.cny_usd_5">
                                                    {{ (contact.fields.cny_usd_5 - contact.fields.cny_usd_1).toFixed(2)
                                                    }}
                                                </template>
                                                <template v-else-if="contact.fields.cny_usd_4">
                                                    {{ (contact.fields.cny_usd_4 - contact.fields.cny_usd_1).toFixed(2)
                                                    }}
                                                </template>
                                                <!-- Continue the pattern for usd_rate_3, usd_rate_2 -->
                                                <template v-else-if="contact.fields.cny_usd_3">
                                                    {{ (contact.fields.cny_usd_3 - contact.fields.cny_usd_1).toFixed(2)
                                                    }}
                                                </template>
                                                <template v-else-if="contact.fields.cny_usd_2">
                                                    {{ (contact.fields.cny_usd_2 - contact.fields.cny_usd_1).toFixed(2)
                                                    }}
                                                </template>
                                                <!-- If none of the rates are available, you can add an else block -->
                                                <template v-else>
                                                    <!-- Handle the case where none of the rates are set -->
                                                </template>
                                            </div>

                                        </li>


                                        <!-- usd_rate_1 -->

                                        <li v-if="contact.fields.usd > 0"
                                            class="list-group-item d-flex justify-content-between align-items-left">
                                            <div class="d-flex" style="width: 30px;">
                                                <template v-if="contact.fields.usd_rate_1">
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal text-sm">{{ contact.fields.usd_rate_1
                                                            }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex ml-6" style="width: 60px;">
                                                <template v-if="contact.fields.cny_usd_1">
                                                    <div class="d-flex flex-column">
                                                        <!-- <span class="fw-normal">{{ contact.fields.cny_usd_1 }}</span> -->
                                                        <span class="fw-normal text-sm"> {{
                                                            contact.fields.cny_usd_1.toFixed(2)
                                                        }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex ml-5" style="width: 48px;">
                                                <template v-if="contact.fields.channel_1">
                                                    <div class="d-flex flex-column text-sm">
                                                        <span> {{ findChById(contact.fields.channel_1) }} </span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column text-sm">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex mr-6" style="width: 40px;">
                                                <template v-if="contact.fields.cny_usd_1 && contact.fields.cny_usd_2">
                                                    <div class="d-flex flex-column">
                                                        <!-- <span class="fw-normal">{{ contact.fields.cny_usd_1 }}</span> -->
                                                        <span class="fw-normal text-sm"> {{
                                                            (contact.fields.cny_usd_2 -
                                                                contact.fields.cny_usd_1).toFixed(2)
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

                                        <!-- usd_rate_2 -->

                                        <li v-if="contact.fields.usd > 0"
                                            class="list-group-item d-flex justify-content-between align-items-left">

                                            <div class="d-flex" style="width: 30px;">
                                                <template v-if="contact.fields.usd_rate_2">
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal text-sm">{{ contact.fields.usd_rate_2
                                                            }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex ml-6" style="width: 60px;">
                                                <template v-if="contact.fields.cny_usd_2">
                                                    <div class="d-flex flex-column">
                                                        <!-- <span class="fw-normal">{{ contact.fields.cny_usd_2 }}</span> -->
                                                        <span class="fw-normal text-sm"> {{
                                                            contact.fields.cny_usd_2.toFixed(2)
                                                        }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>





                                            <div class="d-flex ml-5" style="width: 48px;">
                                                <template v-if="contact.fields.channel_2">
                                                    <div class="d-flex flex-column text-sm">
                                                        <span> {{ findChById(contact.fields.channel_2) }} </span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column text-sm">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex mr-6" style="width: 40px;">
                                                <template v-if="contact.fields.cny_usd_2 && contact.fields.cny_usd_3">
                                                    <div class="d-flex flex-column">
                                                        <!-- <span class="fw-normal">{{ contact.fields.cny_usd_1 }}</span> -->
                                                        <span class="fw-normal text-sm"> {{
                                                            (contact.fields.cny_usd_3 -
                                                                contact.fields.cny_usd_2).toFixed(2)
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

                                        <!-- usd_rate_3 -->

                                        <li v-if="contact.fields.usd > 0"
                                            class="list-group-item d-flex justify-content-between align-items-left">

                                            <div class="d-flex" style="width: 30px;">
                                                <template v-if="contact.fields.usd_rate_3">
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal text-sm">{{ contact.fields.usd_rate_3
                                                            }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex ml-6" style="width: 60px;">
                                                <template v-if="contact.fields.cny_usd_3">
                                                    <div class="d-flex flex-column">
                                                        <!-- <span class="fw-normal">{{ contact.fields.cny_usd_3 }}</span> -->
                                                        <span class="fw-normal text-sm"> {{
                                                            contact.fields.cny_usd_3.toFixed(2)
                                                        }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex ml-5" style="width: 48px;">
                                                <template v-if="contact.fields.channel_3">
                                                    <div class="d-flex flex-column text-sm">
                                                        <span> {{ findChById(contact.fields.channel_3) }} </span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column text-sm">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <!-- Hi -->
                                            <div class="d-flex mr-6" style="width: 40px;">
                                                <template
                                                    v-if="contact.fields.cny_usd_1 && contact.fields.cny_usd_2 && contact.fields.cny_usd_3 && contact.fields.cny_usd_4">
                                                    <div class="d-flex flex-column">
                                                        <!-- <span class="fw-normal">{{ contact.fields.cny_usd_1 }}</span> -->
                                                        <span class="fw-normal text-sm"> {{
                                                            (contact.fields.cny_usd_4 -
                                                                contact.fields.cny_usd_3).toFixed(2)
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


                                        <!-- usd_rate_4 -->

                                        <li v-if="contact.fields.usd > 0"
                                            class="list-group-item d-flex justify-content-between align-items-left">

                                            <div class="d-flex" style="width: 30px;">
                                                <template v-if="contact.fields.usd_rate_4">
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal text-sm">{{ contact.fields.usd_rate_4
                                                            }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex ml-6" style="width: 60px;">
                                                <template v-if="contact.fields.cny_usd_4">
                                                    <div class="d-flex flex-column">
                                                        <!-- <span class="fw-normal">{{ contact.fields.cny_usd_4 }}</span> -->
                                                        <span class="fw-normal text-sm"> {{
                                                            contact.fields.cny_usd_4.toFixed(2)
                                                        }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex ml-5" style="width: 48px;">
                                                <template v-if="contact.fields.channel_4">
                                                    <div class="d-flex flex-column text-sm">
                                                        <span> {{ findChById(contact.fields.channel_4) }} </span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column text-sm">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <!-- Hi -->
                                            <div class="d-flex mr-6" style="width: 40px;">
                                                <template
                                                    v-if="contact.fields.cny_usd_1 && contact.fields.cny_usd_2 && contact.fields.cny_usd_3 && contact.fields.cny_usd_4 && contact.fields.cny_usd_5">
                                                    <div class="d-flex flex-column">
                                                        <!-- <span class="fw-normal">{{ contact.fields.cny_usd_1 }}</span> -->
                                                        <span class="fw-normal text-sm"> {{
                                                            (contact.fields.cny_usd_5 -
                                                                contact.fields.cny_usd_4).toFixed(2)
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


                                        <!-- usd_rate_5 -->

                                        <li v-if="contact.fields.usd > 0"
                                            class="list-group-item d-flex justify-content-between align-items-left">

                                            <div class="d-flex" style="width: 30px;">
                                                <template v-if="contact.fields.usd_rate_5">
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal text-sm">{{ contact.fields.usd_rate_5
                                                            }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex ml-6" style="width: 60px;">
                                                <template v-if="contact.fields.cny_usd_5">
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal text-sm"> {{
                                                            contact.fields.cny_usd_5.toFixed(2)
                                                        }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex ml-5" style="width: 48px;">
                                                <template v-if="contact.fields.channel_5">
                                                    <div class="d-flex flex-column text-sm">
                                                        <span> {{ findChById(contact.fields.channel_5) }} </span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column text-sm">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <!-- Hi -->
                                            <div class="d-flex mr-6" style="width: 40px;">
                                                <template
                                                    v-if="contact.fields.cny_usd_1 && contact.fields.cny_usd_2 && contact.fields.cny_usd_3 && contact.fields.cny_usd_4 && contact.fields.cny_usd_5 && contact.fields.cny_usd_6">
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal text-sm"> {{
                                                            (contact.fields.cny_usd_6 -
                                                                contact.fields.cny_usd_5).toFixed(2)
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


                                        <!-- usd_rate_6 -->

                                        <li v-if="contact.fields.usd > 0"
                                            class="list-group-item d-flex justify-content-between align-items-left">

                                            <div class="d-flex" style="width: 30px;">
                                                <template v-if="contact.fields.usd_rate_6">
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal text-sm">{{ contact.fields.usd_rate_6
                                                            }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex ml-6" style="width: 60px;">
                                                <template v-if="contact.fields.cny_usd_6">
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal text-sm"> {{
                                                            contact.fields.cny_usd_6.toFixed(2)
                                                        }}</span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="d-flex ml-5" style="width: 48px;">
                                                <template v-if="contact.fields.channel_6">
                                                    <div class="d-flex flex-column text-sm">
                                                        <span> {{ findChById(contact.fields.channel_6) }} </span>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="d-flex flex-column text-sm">
                                                        <span class="fw-normal">&nbsp;</span>
                                                    </div>
                                                </template>
                                            </div>

                                            <!-- Hi -->
                                            <div class="d-flex mr-6" style="width: 40px;">
                                                &nbsp;
                                            </div>

                                        </li>

                                        <!-- usd usd usd usd usd -->



                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <!-- <div class="d-flex"> -->
                                            <span class="fw-normal text-sm token">
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
                                    <!-- <router-link :to="`/contacts/view/${contact.fields.id}`"
                                        class="btn btn-warning my-1 me-2">
                                        <i class="fa fa-eye"></i>
                                    </router-link> -->
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

import DatePicker from 'vue3-datepicker'

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {

    components: {
        DatePicker,
        mySpinner
    },

    data() {
        return {

            searchName: null,

            selectedDate: null, // initially today's date //new Date()

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
            return this.contacts.fields.cny_usd_1.toFixed(2);
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

        isValidDateSearch() {
            return Boolean(this.selectedDate);
        },
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

        userEmail(thisEmail) {
            const email = thisEmail
            if (email) {
                const atIndex = email.indexOf('@');
                return atIndex > 0 ? email.substring(0, atIndex) : email;
            } else {
                return ''
            }
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

        async mySearch(searchType) {
            this.currentUserId = await this.currentUser();
            let records;

            if (this.currentUserId) {

                try {

                    // console.log('searchType',searchType)

                    if (searchType === 'byName') {
                        this.searchName = this.searchName.trim()

                        records = this.contacts.filter(contact => contact.fields.desc.toLowerCase().includes(this.searchName.toLowerCase()));

                    } else {

                        console.log('searchType', searchType, this.selectedDate)

                        // records = this.contacts.filter(contact => contact.fields.date.includes(this.selectedDate));
                        // Assuming this.selectedDate is a JavaScript Date object
                        const selectedDateString = this.selectedDate.toISOString().split('T')[0]; // Convert to "YYYY-MM-DD" format

                        records = this.contacts.filter(contact => {
                            // Convert the date string from contact to a Date object
                            const contactDate = new Date(contact.fields.date);
                            // Compare the year, month, and day
                            return (
                                contactDate.getFullYear() === this.selectedDate.getFullYear() &&
                                contactDate.getMonth() === this.selectedDate.getMonth() &&
                                contactDate.getDate() === this.selectedDate.getDate()
                            );
                        });

                    }

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

}

</script>

<style scoped>
.input-placeholder-gray::placeholder {
    color: rgb(156, 162, 174)
        /* This will set the placeholder text color to gray */
}

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

.date-picker-container {
    position: relative;
}

.datepicker {
    border: none !important;
    box-shadow: none !important;
}

.datepicker_no_border {
    border-color: #e30707;
    /* box-shadow: none !important; */
}

.date-picker-wrapper {
    background-color: #e30700;
    border: none !important;
    box-shadow: none !important;
}

.no_border {
    background-color: #ffffff;
    border: none !important;
    box-shadow: none !important;
}

.date-picker-input {
    background-color: #fff;
    border-color: #ced4da;
    /* border: none !important; */
    color: #495057;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    /* line-height: 1.5; */
    line-height: 0;
    height: calc(1.5em + 0.75rem + 2px);
}

.hide {
    display: none;
    border: none !important;
}
</style>