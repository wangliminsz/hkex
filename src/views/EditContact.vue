<template>
  <div>
    <div class="container mt-3">
      <div class="row">


        <div class="col-md-6">

          <div class="d-flex justify-content-start">

            <div style="flex: 0.3;">
              <p class="h3 text-success fw-bold">Edit</p>
            </div>


            <div style="flex: 0.5;" class="d-flex align-items-baseline">
              <span class="mr-3">USD <input type="radio" name="currency" value="usd" v-model="selectedCurrency"></span>
              <span class="mr-3">HKD <input type="radio" name="currency" value="hkd" v-model="selectedCurrency"> </span>
              <span>Others <input type="radio" name="currency" value="oth" v-model="selectedCurrency"> </span>

            </div>

            <div style="flex: 0.2;">
              <select v-model="contact.oth_name" class="form-control" :disabled="selectedCurrency !== 'oth'">
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAN">CAN</option>
                <option value="JPY">JPY</option>
                <option value="SGD">SGD</option>
                <option value="NTD">NTD</option>
                <option value="THB">THB</option>
              </select>
            </div>



          </div>


        </div>


      </div>
    </div>

    <!-- {{ contact }} -->

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
            <p class="h5 text-danger fw-bold">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3" v-if="!loading">
      <div class="row">
        <div class="col-md-6">
          <form @submit.prevent="myUpdate">

            <!-- {{ upstreams.records.length }}
            {{ upstreams.records}} -->

            <div class="d-flex justify-content-between align-items-center">

              <div class="mb-2 mr-2" style="flex: 0.3;">
                <select v-model="contact.status" class="form-control">
                  <option value="進行中">進行中</option>
                  <option value="已完成">已完成</option>
                </select>
              </div>

              <div class="mb-2" style="flex: 0.7;">
                <input v-model="contact.desc" type="text" class="form-control" placeholder="Input Name/Desc ..."
                  :class="{ 'is-invalid': contact.desc && !isValidDesc }" />
                <div v-if="contact.desc && !isValidDesc" class="invalid-feedback">
                  Please enter a valid Description.
                </div>
              </div>

            </div>












            <!-- usd usd usd -->

            <div v-if="selectedCurrency === 'usd'">

              USD <div class="mb-2">
                <input v-model="contact.usd" type="number" step="0.0001" class="form-control"
                  :disabled="selectedCurrency !== 'usd'" placeholder="Input USD Amount..." :class="{
                    'is-invalid': contact.usd && !isValidUSD,
                  }" />
                <div v-if="contact.usd && !isValidUSD" class="invalid-feedback">
                  Please enter a valid USD amount.
                </div>
              </div>

              <!-- usd rate 1 -->

              <div class="d-flex  justify-content-between align-items-center">

                <div class="mb-2"> <!-- me-3 provides margin to the right -->
                  <input v-model="contact.usd_rate_1" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency !== 'usd'" :class="{
                      'is-invalid': contact.usd_rate_1 && !isValidUSD_rate1,
                    }" />
                  <div v-if="contact.usd_rate_1 && !isValidUSD_rate1" class="invalid-feedback">
                    Please enter a valid USD rate.
                  </div>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.usd * contact.usd_rate_1).toFixed(2) }}
                </div>



                <div class="mb-2">
                  <select v-model="contact.upstream" class="form-control" :disabled="selectedCurrency !== 'usd'"
                    id="supplierSelect" v-if="upstreams.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="upstream in upstreams.records" :key="upstream.fields.id" :value="upstream.fields.id">
                      {{ upstream.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2">
                  <select v-model="contact.upstream_2" class="form-control" :disabled="selectedCurrency !== 'usd'"
                    id="supplierSelect" v-if="upstreams.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="upstream in upstreams.records" :key="upstream.fields.id" :value="upstream.fields.id">
                      {{ upstream.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2">
                  <select v-model="contact.upstream_3" class="form-control" :disabled="selectedCurrency !== 'usd'"
                    id="supplierSelect" v-if="upstreams.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="upstream in upstreams.records" :key="upstream.fields.id" :value="upstream.fields.id">
                      {{ upstream.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.usd * (contact.usd_rate_2 - contact.usd_rate_1)).toFixed(2) }}
                </div>




              </div>

              <!-- usd rate 2 -->



              <div class="d-flex  justify-content-between align-items-center">

                <div class="mb-2">
                  <input v-model="contact.usd_rate_2" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency !== 'usd'" :class="{
                      'is-invalid': contact.usd_rate_2 && !isValidUSD_rate2,
                    }" />
                  <div v-if="contact.usd_rate_2 && !isValidUSD_rate2" class="invalid-feedback">
                    Please enter a valid USD rate.
                  </div>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.usd * contact.usd_rate_2).toFixed(2) }}
                </div>



                <div class="mb-2">
                  <select v-model="contact.channel" class="form-control" :disabled="selectedCurrency !== 'usd'"
                    id="supplierSelect" v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel in channels.records" :key="channel.fields.id" :value="channel.fields.id">
                      {{ channel.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2">
                  <select v-model="contact.channel_2" class="form-control" :disabled="selectedCurrency !== 'usd'"
                    id="supplierSelect" v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel in channels.records" :key="channel.fields.id" :value="channel.fields.id">
                      {{ channel.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2">
                  <select v-model="contact.channel_3" class="form-control" :disabled="selectedCurrency !== 'usd'"
                    id="supplierSelect" v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel in channels.records" :key="channel.fields.id" :value="channel.fields.id">
                      {{ channel.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.usd * (contact.usd_rate_3 - contact.usd_rate_2)).toFixed(2) }}
                </div>

              </div>




              <!-- usd rate 3 -->

              <div class="d-flex  justify-content-between align-items-center">


                <div class="mb-2">
                  <input v-model="contact.usd_rate_3" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency !== 'usd'" :class="{
                      'is-invalid': contact.usd_rate_3 && !isValidUSD_rate3,
                    }" />
                  <div v-if="contact.usd_rate_3 && !isValidUSD_rate3" class="invalid-feedback">
                    Please enter a valid USD rate.
                  </div>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.usd * contact.usd_rate_3).toFixed(2) }}
                </div>

                <div>
                </div>

                <div>
                </div>

                <div>
                </div>

                <div>
                </div>



              </div>

            </div>

            <!-- usd usd usd -->




            <!-- hkd hkd hkd -->

            <div v-if="selectedCurrency === 'hkd'">

              HKD <div class="mb-2">
                <input v-model="contact.hkd" type="number" step="0.0001" class="form-control"
                  :disabled="selectedCurrency !== 'hkd'" placeholder="Input HKD Amount..." :class="{
                    'is-invalid': contact.hkd && !isValidHKD,
                  }" />
                <div v-if="contact.hkd && !isValidHKD" class="invalid-feedback">
                  Please enter a valid HKD amount.
                </div>
              </div>

              <!-- hkd rate 1 -->

              <div class="d-flex  justify-content-between align-items-center">

                <div class="mb-2"> <!-- me-3 provides margin to the right -->
                  <input v-model="contact.hkd_rate_1" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency !== 'hkd'" :class="{
                      'is-invalid': contact.hkd_rate_1 && !isValidHKD_rate1,
                    }" />
                  <div v-if="contact.hkd_rate_1 && !isValidHKD_rate1" class="invalid-feedback">
                    Please enter a valid HKD rate.
                  </div>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.hkd * contact.hkd_rate_1).toFixed(2) }}
                </div>



                <div class="mb-2">
                  <select v-model="contact.upstream" class="form-control" :disabled="selectedCurrency !== 'hkd'"
                    id="supplierSelect" v-if="upstreams.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="upstream in upstreams.records" :key="upstream.fields.id" :value="upstream.fields.id">
                      {{ upstream.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2">
                  <select v-model="contact.upstream_2" class="form-control" :disabled="selectedCurrency !== 'hkd'"
                    id="supplierSelect" v-if="upstreams.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="upstream in upstreams.records" :key="upstream.fields.id" :value="upstream.fields.id">
                      {{ upstream.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2">
                  <select v-model="contact.upstream_3" class="form-control" :disabled="selectedCurrency !== 'hkd'"
                    id="supplierSelect" v-if="upstreams.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="upstream in upstreams.records" :key="upstream.fields.id" :value="upstream.fields.id">
                      {{ upstream.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.hkd * (contact.hkd_rate_2 - contact.hkd_rate_1)).toFixed(2) }}
                </div>




              </div>

              <!-- hkd rate 2 -->



              <div class="d-flex  justify-content-between align-items-center">

                <div class="mb-2">
                  <input v-model="contact.hkd_rate_2" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency !== 'hkd'" :class="{
                      'is-invalid': contact.hkd_rate_2 && !isValidHKD_rate2,
                    }" />
                  <div v-if="contact.hkd_rate_2 && !isValidHKD_rate2" class="invalid-feedback">
                    Please enter a valid HKD rate.
                  </div>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.hkd * contact.hkd_rate_2).toFixed(2) }}
                </div>



                <div class="mb-2">
                  <select v-model="contact.channel" class="form-control" :disabled="selectedCurrency !== 'hkd'"
                    id="supplierSelect" v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel in channels.records" :key="channel.fields.id" :value="channel.fields.id">
                      {{ channel.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2">
                  <select v-model="contact.channel_2" class="form-control" :disabled="selectedCurrency !== 'hkd'"
                    id="supplierSelect" v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel in channels.records" :key="channel.fields.id" :value="channel.fields.id">
                      {{ channel.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2">
                  <select v-model="contact.channel_3" class="form-control" :disabled="selectedCurrency !== 'hkd'"
                    id="supplierSelect" v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel in channels.records" :key="channel.fields.id" :value="channel.fields.id">
                      {{ channel.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.hkd * (contact.hkd_rate_3 - contact.hkd_rate_2)).toFixed(2) }}
                </div>

              </div>




              <!-- hkd rate 3 -->

              <div class="d-flex  justify-content-between align-items-center">


                <div class="mb-2">
                  <input v-model="contact.hkd_rate_3" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency !== 'hkd'" :class="{
                      'is-invalid': contact.hkd_rate_3 && !isValidHKD_rate3,
                    }" />
                  <div v-if="contact.hkd_rate_3 && !isValidHKD_rate3" class="invalid-feedback">
                    Please enter a valid HKD rate.
                  </div>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.hkd * contact.hkd_rate_3).toFixed(2) }}
                </div>

                <div>
                </div>

                <div>
                </div>

                <div>
                </div>

                <div>
                </div>



              </div>

            </div>

            <!-- hkd hkd hkd -->





            <!-- oth oth oth -->

            <div v-if="selectedCurrency === 'oth'">

              <span v-if="contact.oth_name">{{ contact.oth_name }}</span><span v-else>Others</span>

              <div class="mb-2">
                <input v-model="contact.oth" type="number" step="0.0001" class="form-control"
                  :disabled="selectedCurrency !== 'oth'" placeholder="Input Amount..." :class="{
                    'is-invalid': contact.oth && !isValidOTH,
                  }" />
                <div v-if="contact.oth && !isValidOTH" class="invalid-feedback">
                  Please enter a valid amount.
                </div>
              </div>

              <!-- oth rate 1 -->

              <div class="d-flex  justify-content-between align-items-center">

                <div class="mb-2"> <!-- me-3 provides margin to the right -->
                  <input v-model="contact.oth_rate_1" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency !== 'oth'" :class="{
                      'is-invalid': contact.oth_rate_1 && !isValidOTH_rate1,
                    }" />
                  <div v-if="contact.oth_rate_1 && !isValidOTH_rate1" class="invalid-feedback">
                    Please enter a valid rate.
                  </div>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.oth * contact.oth_rate_1).toFixed(2) }}
                </div>



                <div class="mb-2">
                  <select v-model="contact.upstream" class="form-control" :disabled="selectedCurrency !== 'oth'"
                    id="supplierSelect" v-if="upstreams.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="upstream in upstreams.records" :key="upstream.fields.id" :value="upstream.fields.id">
                      {{ upstream.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2">
                  <select v-model="contact.upstream_2" class="form-control" :disabled="selectedCurrency !== 'oth'"
                    id="supplierSelect" v-if="upstreams.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="upstream in upstreams.records" :key="upstream.fields.id" :value="upstream.fields.id">
                      {{ upstream.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2">
                  <select v-model="contact.upstream_3" class="form-control" :disabled="selectedCurrency !== 'oth'"
                    id="supplierSelect" v-if="upstreams.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="upstream in upstreams.records" :key="upstream.fields.id" :value="upstream.fields.id">
                      {{ upstream.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.oth * (contact.oth_rate_2 - contact.oth_rate_1)).toFixed(2) }}
                </div>




              </div>

              <!-- oth rate 2 -->



              <div class="d-flex  justify-content-between align-items-center">

                <div class="mb-2">
                  <input v-model="contact.oth_rate_2" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency !== 'oth'" :class="{
                      'is-invalid': contact.oth_rate_2 && !isValidOTH_rate2,
                    }" />
                  <div v-if="contact.oth_rate_2 && !isValidOTH_rate2" class="invalid-feedback">
                    Please enter a valid rate.
                  </div>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.oth * contact.oth_rate_2).toFixed(2) }}
                </div>



                <div class="mb-2">
                  <select v-model="contact.channel" class="form-control" :disabled="selectedCurrency !== 'oth'"
                    id="supplierSelect" v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel in channels.records" :key="channel.fields.id" :value="channel.fields.id">
                      {{ channel.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2">
                  <select v-model="contact.channel_2" class="form-control" :disabled="selectedCurrency !== 'oth'"
                    id="supplierSelect" v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel in channels.records" :key="channel.fields.id" :value="channel.fields.id">
                      {{ channel.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2">
                  <select v-model="contact.channel_3" class="form-control" :disabled="selectedCurrency !== 'oth'"
                    id="supplierSelect" v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel in channels.records" :key="channel.fields.id" :value="channel.fields.id">
                      {{ channel.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.oth * (contact.oth_rate_3 - contact.oth_rate_2)).toFixed(2) }}
                </div>

              </div>




              <!-- oth rate 3 -->

              <div class="d-flex  justify-content-between align-items-center">


                <div class="mb-2">
                  <input v-model="contact.oth_rate_3" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency !== 'oth'" :class="{
                      'is-invalid': contact.oth_rate_3 && !isValidOTH_rate3,
                    }" />
                  <div v-if="contact.oth_rate_3 && !isValidOTH_rate3" class="invalid-feedback">
                    Please enter a valid rate.
                  </div>
                </div>

                <div class="mb-2 ml-3 text-sm">
                  {{ (contact.oth * contact.oth_rate_3).toFixed(2) }}
                </div>

                <div>
                </div>

                <div>
                </div>

                <div>
                </div>

                <div>
                </div>



              </div>

            </div>

            <!-- oth oth oth -->


            <div class="mb-2">
              <textarea v-model="contact.memo" class="form-control" rows="5" placeholder="Memo ..."
                :class="{ 'is-invalid': contact.memo && !isValidMemo }"></textarea>
              <div v-if="contact.memo && !isValidMemo" class="invalid-feedback">
                Please enter a valid Memo.
              </div>
            </div>






            <!-- <div class="d-flex flex-wrap mt-3"> -->
            <div class="mt-3 d-flex justify-content-end button-group">
              <div>
                <input type="submit" class="btn btn-success" value="Update" :disabled="!isFormValid" />
                <!-- </div>
              <div> -->
                <router-link to="/contacts" class="btn btn-success">Cancel</router-link>
              </div>
            </div>


          </form>



        </div>
      </div>
    </div>


  </div>
</template>


<script>
import { ContactService } from "@/services/ContactService";
import mySpinner from "@/components/Spinner.vue";

import { supabase } from "@/clients/supabase";

import DatePicker from 'vue3-datepicker';

import { mapGetters } from 'vuex'
// import { mapActions } from 'vuex'

export default {
  name: "EditContact",

  components: {
    DatePicker,
    mySpinner,
  },

  data() {
    return {

      selectedCurrency: '',

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

          this.contact = response.data.records[0].fields
          // this.selectedDate = this.contact.fields.date
          this.selectedDate = new Date(this.contact.date)

          if (this.contact.usd) {
            this.selectedCurrency = 'usd'
          }

          if (this.contact.hkd) {
            this.selectedCurrency = 'hkd'
          }

          if (this.contact.oth) {
            this.selectedCurrency = 'oth'
          }

          // // console.log('up up up', this.contact.upstream)

          // if (this.contact.upstream != null) {
          //   // console.log('up up up if inside', this.contact.upstream)
          //   let upResponse = await ContactService.getUpstream(this.contact.upstream)
          //   if (upResponse) {
          //     this.upstream = upResponse.data.records[0]
          //   }
          // } else {
          //   this.upstream = ''
          //   // console.log('up up up else inside', this.contact.upstream)
          // }

          // if (this.contact.channel) {
          //   // console.log('up up up if inside', this.contact.channel)
          //   let chResponse = await ContactService.getChannel(this.contact.channel)
          //   if (chResponse) {
          //     this.channel = chResponse.data.records[0]
          //   }
          // } else {
          //   this.channel = ''
          //   // console.log('up up up else inside', this.contact.channel)
          // }

          let response_up = await ContactService.getUpstreams()
          let response_ch = await ContactService.getChannels()

          this.upstreams = response_up.data
          this.channels = response_ch.data

          this.loading = false
        }
      }
      catch (error) {
        this.errorMessage = error
        this.loading = false
      }
    }
  },

  computed: {

    ...mapGetters([
      'isLoggedIn',
      'whichUser'
    ]),

    isValidDesc() {
      return Boolean(this.contact.desc);
    },

    isValidOTH() {
      if (this.contact.oth == '') {
        return false;
      }
      const othNumber = Number(this.contact.oth);
      return !isNaN(othNumber);
    },

    isValidOTH_rate1() {
      const othRate1 = Number(this.contact.oth_rate_1);
      return !isNaN(othRate1);
    },

    isValidOTH_name() {
      return Boolean(this.contact.oth_name);
    },

    isValidOTH_rate2() {
      const othRate2 = Number(this.contact.oth_rate_2);
      return !isNaN(othRate2);
    },

    isValidOTH_rate3() {
      const othRate3 = Number(this.contact.oth_rate_3);
      return !isNaN(othRate3);
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

      if (this.selectedCurrency === 'oth') {
        return (
          (this.isValidUSD || this.isValidHKD || this.isValidOTH) &&
          this.isValidOTH_name);
      }else{
        return (
          (this.isValidUSD || this.isValidHKD || this.isValidOTH) );
      }

    },
  },

  methods: {

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

    formatDate(date) {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      console.log("mydate-------->");
      return `${day}/${month}/${year}`;
    },

    async currentUser() {
      const localUser = await supabase.auth.getSession();
      if (localUser.data.session) {
        return localUser.data.session.user.id;
      } else {
        console.log("not signin");
      }
    },

    async myUpdate() {
      // this.loading = true;
      this.currentUserId = await this.currentUser();

      if (this.currentUserId) {
        try {
          this.contact.update_date = new Date().toISOString();
          this.contact.update_user_id = this.currentUserId;

          let dateWithCorrectTimeZone = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()));
          this.contact.date = dateWithCorrectTimeZone.toISOString().slice(0, 10);

          this.contact.upstream = String(this.contact.upstream);
          this.contact.upstream_2 = String(this.contact.upstream_2);
          this.contact.upstream_3 = String(this.contact.upstream_3);
          this.contact.channel = String(this.contact.channel);
          this.contact.channel_2 = String(this.contact.channel_2);
          this.contact.channel_3 = String(this.contact.channel_3);

          // if (this.contact.upstream) {
          //   // do nothing
          // } else {
          //   this.contact.upstream = ''
          // }

          // if (this.contact.channel) {
          //   // do nothing
          // } else {
          //   this.contact.channel = ''
          // }

          if (this.contact.usd === '' || this.contact.usd == 0) {
            this.contact.usd = 0
            this.contact.usd_rate_1 = 0
            this.contact.usd_rate_2 = 0
            this.contact.usd_rate_3 = 0
          }

          if (this.contact.hkd === '' || this.contact.hkd == 0) {
            this.contact.hkd = 0
            this.contact.hkd_rate_1 = 0
            this.contact.hkd_rate_2 = 0
            this.contact.hkd_rate_3 = 0
          }

          if (this.contact.oth === '' || this.contact.oth == 0) {
            this.contact.oth = 0
            this.contact.oth_rate_1 = 0
            this.contact.oth_rate_2 = 0
            this.contact.oth_rate_3 = 0
            this.contact.oth_name = ''
          }

          console.log('edit vue oth_cny_1 --->>>', this.contact)

          // let response = await ContactService.updateCondo(this.contact, this.contactId, this.currentUserId)
          let response = await ContactService.airUpdateRecord(
            this.contact,
            this.contactId
          );

          await this.$store.dispatch('clearHomeAction')

          if (response) {
            // this.loading = false;
            const currentRoute = this.$router.currentRoute;
            if (currentRoute.path !== "/") {
              this.$router.push("/"); // Navigate to the page
            }
          } else {
            // this.loading = false;
            const currentRoute = this.$router.currentRoute;
            if (currentRoute.path !== `/contacts/edit/${this.contactId}`) {
              this.$router.push(`/contacts/edit/${this.contactId}`); // Navigate to the page
            }
          }
        } catch (error) {
          this.errorMessage = error;
          // console.log(this.errorMessage);
          // this.loading = false;
        }
      }
    },
  },

  watch: {
    'selectedCurrency': function (newVal) {
      if (newVal) {
        if (newVal === 'hkd' || newVal === 'usd') {
          this.contact.oth_name = ''
        }

        if (newVal === 'usd') {
          // this.contact.usd = ''
          // this.contact.usd_rate_1 = ''
          // this.contact.usd_rate_2 = ''
          // this.contact.usd_rate_3 = ''

          this.contact.hkd = ''
          this.contact.hkd_rate_1 = ''
          this.contact.hkd_rate_2 = ''
          this.contact.hkd_rate_3 = ''

          this.contact.oth = ''
          this.contact.oth_rate_1 = ''
          this.contact.oth_rate_2 = ''
          this.contact.oth_rate_3 = ''
        }

        if (newVal === 'hkd') {
          this.contact.usd = ''
          this.contact.usd_rate_1 = ''
          this.contact.usd_rate_2 = ''
          this.contact.usd_rate_3 = ''

          // this.contact.hkd = ''
          // this.contact.hkd_rate_1 = ''
          // this.contact.hkd_rate_2 = ''
          // this.contact.hkd_rate_3 = ''

          this.contact.oth = ''
          this.contact.oth_rate_1 = ''
          this.contact.oth_rate_2 = ''
          this.contact.oth_rate_3 = ''
        }

        if (newVal === 'oth') {
          this.contact.usd = ''
          this.contact.usd_rate_1 = ''
          this.contact.usd_rate_2 = ''
          this.contact.usd_rate_3 = ''

          this.contact.hkd = ''
          this.contact.hkd_rate_1 = ''
          this.contact.hkd_rate_2 = ''
          this.contact.hkd_rate_3 = ''

          // this.contact.oth = ''
          // this.contact.oth_rate_1 = ''
          // this.contact.oth_rate_2 = ''
          // this.contact.oth_rate_3 = ''
        }


      }
    }
  }

}

</script>

<style scoped>
.button-group {
  justify-content: flex-end;

  /* Ensures the buttons are aligned to the end */
  /* You can remove the default margin from the buttons by adding this */
  >div {
    margin-left: 1rem;
    /* Adjust the negative margin to bring the buttons closer */
  }

  .btn {
    margin-left: 1rem;
    /* This will add space between buttons, counteracting the negative margin */
  }
}




.d-flex {
  justify-content: space-start;
}

.d-flex>div {
  flex-basis: 30%;
}

.vdp-wrapper {
  border: none !important;
  box-shadow: none !important;
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