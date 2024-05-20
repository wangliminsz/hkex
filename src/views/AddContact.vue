<template>
  <div>
    <div class="container mt-3">
      <div class="row">



        <div class="col-md-6">

          <div class="d-flex justify-content-start">

            <div style="flex: 0.3;">
              <p class="h3 text-success fw-bold">Add</p>
            </div>


            <div style="flex: 0.5;" class="d-flex align-items-baseline">
              <span class="mr-3">USD <input type="radio" name="currency" value="usd" v-model="selectedCurrency"></span>
              <span class="mr-3">HKD <input type="radio" name="currency" value="hkd" v-model="selectedCurrency"> </span>
              <span>Others <input type="radio" name="currency" value="oth" v-model="selectedCurrency"> </span>

            </div>

            <div style="flex: 0.2;">
              <select v-model="contact.usd_name" class="form-control" :disabled="selectedCurrency !== 'oth'">
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
          <form @submit.prevent="myCreate">

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


            <div class="mb-2">
              <div class="form-control date-picker-container">
                <!-- <DatePicker v-model="contact.date" /> -->
                <DatePicker v-model="selectedDate" />
              </div>
            </div>




            <!-- usd usd usd -->

            <div v-if="selectedCurrency">

              <div class="d-flex  justify-content-between align-items-center">

                <div style="flex: 0.8;">
                  <span class="ml-1" v-if="selectedCurrency === 'usd'">USD</span>
                  <span class="ml-1" v-if="selectedCurrency === 'hkd'">HKD</span>
                  <span class="ml-1"
                    v-if="selectedCurrency === 'oth' && contact.usd_name !== 'USD' && contact.usd_name !== 'HKD'">{{
                      contact.usd_name }}</span>
                  <span class="ml-1" v-else>&nbsp;</span>

                </div>


                <div class="ml-10 text-sm text-gray-500" style="flex: 0.3;">

                  <!-- <div class="mb-2 ml-2 text-sm text-gray-600" style="width: 15%; text-align: right;"
                    v-if="contact.usd && contact.usd_rate_1 && (contact.usd_rate_2 || contact.usd_rate_3 || contact.usd_rate_4 || contact.usd_rate_5 || contact.usd_rate_6)">
                    Sum</div>
                  <div class="mb-2 ml-2 text-sm text-gray-600" style="width: 15%; text-align: right;" v-else></div> -->

                  <div class="mb-2 ml-2 text-sm text-gray-500" style="width: 20%;"
                    v-if="contact.usd && contact.usd_rate_1 && (contact.usd_rate_2 || contact.usd_rate_3 || contact.usd_rate_4 || contact.usd_rate_5 || contact.usd_rate_6)">

                    <template v-if="contact.usd_rate_6">
                      {{ (contact.usd * (contact.usd_rate_6 - contact.usd_rate_1)).toFixed(2) }}
                    </template>
                    <template v-else-if="contact.usd_rate_5">
                      {{ (contact.usd * (contact.usd_rate_5 - contact.usd_rate_1)).toFixed(2) }}
                    </template>
                    <template v-else-if="contact.usd_rate_4">
                      {{ (contact.usd * (contact.usd_rate_4 - contact.usd_rate_1)).toFixed(2) }}
                    </template>
                    <template v-else-if="contact.usd_rate_3">
                      {{ (contact.usd * (contact.usd_rate_3 - contact.usd_rate_1)).toFixed(2) }}
                    </template>
                    <template v-else-if="contact.usd_rate_2">
                      {{ (contact.usd * (contact.usd_rate_2 - contact.usd_rate_1)).toFixed(2) }}
                    </template>
                    <template v-else>
                      <!-- Handle the case where none of the rates are set -->
                    </template>
                  </div>

                  <div class="mb-2 ml-2 text-sm text-gray-600" style="width: 20%;" v-else>&nbsp;</div>


                </div>

              </div>



              <div class="mb-2 text-sm">
                <input v-model="contact.usd" type="number" step="0.0001" class="form-control text-sm"
                  placeholder="Amount" :class="{
                    'is-invalid': contact.usd && !isValidUSD,
                  }" />
                <div v-if="contact.usd && !isValidUSD" class="invalid-feedback">
                  Please enter a valid amount.
                </div>
              </div>

              <!-- <div class="d-flex justify-content-between align-items-center"></div> -->




              <!-- usd rate 1 -->

              <div class="d-flex  justify-content-between align-items-center">

                <div class="mb-2 text-sm" style="width: 35%;"> <!-- me-3 provides margin to the right -->
                  <input v-model="contact.usd_rate_1" type="number" step="0.0001" class="form-control text-sm" :class="{
                    'is-invalid': contact.usd_rate_1 && !isValidUSD_rate1,
                  }" />
                  <div v-if="contact.usd_rate_1 && !isValidUSD_rate1" class="invalid-feedback">
                    Please enter a valid USD rate.
                  </div>
                </div>

                <div class="mb-2 ml-2 text-sm" style="width: 30%;">
                  {{ (contact.usd * contact.usd_rate_1).toFixed(2) }}
                </div>


                <div class="mb-2 ml-2 text-sm" style="width: 15%;">
                  <select v-model="contact.channel_1" class="form-control" id="supplierSelect"
                    v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel_1 in channels.records" :key="channel_1.fields.id"
                      :value="channel_1.fields.id">
                      {{ channel_1.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2 ml-2 text-sm" style="width: 20%;">
                  {{ (contact.usd * (contact.usd_rate_2 - contact.usd_rate_1)).toFixed(2) }}
                </div>

              </div>




              <!-- usd rate 2 -->

              <div class="d-flex  justify-content-between align-items-center">

                <div class="mb-2 text-sm" style="width: 35%;"> <!-- me-3 provides margin to the right -->
                  <input v-model="contact.usd_rate_2" type="number" step="0.0001" class="form-control text-sm" :class="{
                    'is-invalid': contact.usd_rate_2 && !isValidUSD_rate2,
                  }" />
                  <div v-if="contact.usd_rate_2 && !isValidUSD_rate2" class="invalid-feedback">
                    Please enter a valid USD rate.
                  </div>
                </div>

                <div class="mb-2 ml-2 text-sm" style="width: 30%;">
                  {{ (contact.usd * contact.usd_rate_2).toFixed(2) }}
                </div>



                <div class="mb-2 ml-2 text-sm" style="width: 15%;">
                  <select v-model="contact.channel_2" class="form-control" id="supplierSelect"
                    v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel_2 in channels.records" :key="channel_2.fields.id"
                      :value="channel_2.fields.id">
                      {{ channel_2.fields.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-2 ml-2 text-sm" style="width: 20%;" v-if="contact.usd_rate_3">
                  {{ (contact.usd * (contact.usd_rate_3 - contact.usd_rate_2)).toFixed(2) }}
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>

              </div>









              <!-- usd rate 3 -->


              <div class="d-flex  justify-content-between align-items-center">

                <div class="mb-2 text-sm" style="width: 35%;"> <!-- me-3 provides margin to the right -->
                  <input v-model="contact.usd_rate_3" type="number" step="0.0001" class="form-control text-sm" :class="{
                    'is-invalid': contact.usd_rate_3 && !isValidUSD_rate3,
                  }" />
                  <div v-if="contact.usd_rate_3 && !isValidUSD_rate3" class="invalid-feedback">
                    Please enter a valid USD rate.
                  </div>
                </div>

                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-if="contact.usd_rate_3">
                  {{ (contact.usd * contact.usd_rate_3).toFixed(2) }}
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>



                <div class="mb-2 ml-2 text-sm" style="width: 15%;" v-if="contact.usd_rate_3">
                  <select v-model="contact.channel_3" class="form-control" id="supplierSelect"
                    v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel_3 in channels.records" :key="channel_3.fields.id"
                      :value="channel_3.fields.id">
                      {{ channel_3.fields.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 15%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>




                <div class="mb-2 ml-2 text-sm" style="width: 20%;" v-if="contact.usd_rate_4">
                  {{ (contact.usd * (contact.usd_rate_4 - contact.usd_rate_3)).toFixed(2) }}
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>

              </div>






              <!-- usd rate 4 -->


              <div class="d-flex  justify-content-between align-items-center">

                <div class="mb-2 text-sm" style="width: 35%;"> <!-- me-3 provides margin to the right -->
                  <input v-model="contact.usd_rate_4" type="number" step="0.0001" class="form-control text-sm" :class="{
                    'is-invalid': contact.usd_rate_4 && !isValidUSD_rate4,
                  }" />
                  <div v-if="contact.usd_rate_4 && !isValidUSD_rate4" class="invalid-feedback">
                    Please enter a valid USD rate.
                  </div>
                </div>

                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-if="contact.usd_rate_4">
                  {{ (contact.usd * contact.usd_rate_4).toFixed(2) }}
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>



                <div class="mb-2 ml-2 text-sm" style="width: 15%;" v-if="contact.usd_rate_4">
                  <select v-model="contact.channel_4" class="form-control" id="supplierSelect"
                    v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel_4 in channels.records" :key="channel_4.fields.id"
                      :value="channel_4.fields.id">
                      {{ channel_4.fields.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 15%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>

                <div class="mb-2 ml-2 text-sm" style="width: 20%;" v-if="contact.usd_rate_5">
                  {{ (contact.usd * (contact.usd_rate_5 - contact.usd_rate_4)).toFixed(2) }}
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>

              </div>




              <!-- usd rate 5 -->



              <div class="d-flex  justify-content-between align-items-center">

                <div class="mb-2 text-sm" style="width: 35%;"> <!-- me-3 provides margin to the right -->
                  <input v-model="contact.usd_rate_5" type="number" step="0.0001" class="form-control text-sm" :class="{
                    'is-invalid': contact.usd_rate_5 && !isValidUSD_rate5,
                  }" />
                  <div v-if="contact.usd_rate_5 && !isValidUSD_rate5" class="invalid-feedback">
                    Please enter a valid USD rate.
                  </div>
                </div>

                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-if="contact.usd_rate_5">
                  {{ (contact.usd * contact.usd_rate_5).toFixed(2) }}
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>



                <div class="mb-2 ml-2 text-sm" style="width: 15%;" v-if="contact.usd_rate_5">
                  <select v-model="contact.channel_5" class="form-control" id="supplierSelect"
                    v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel_5 in channels.records" :key="channel_5.fields.id"
                      :value="channel_5.fields.id">
                      {{ channel_5.fields.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 15%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>

                <div class="mb-2 ml-2 text-sm" style="width: 20%;" v-if="contact.usd_rate_6">
                  {{ (contact.usd * (contact.usd_rate_6 - contact.usd_rate_5)).toFixed(2) }}
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>

              </div>




              <!-- usd rate 6 -->


              <div class="d-flex  justify-content-between align-items-center">

                <div class="mb-2 text-sm" style="width: 35%;"> <!-- me-3 provides margin to the right -->
                  <input v-model="contact.usd_rate_6" type="number" step="0.0001" class="form-control text-sm" :class="{
                    'is-invalid': contact.usd_rate_6 && !isValidUSD_rate6,
                  }" />
                  <div v-if="contact.usd_rate_6 && !isValidUSD_rate6" class="invalid-feedback">
                    Please enter a valid USD rate.
                  </div>
                </div>

                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-if="contact.usd_rate_6">
                  {{ (contact.usd * contact.usd_rate_6).toFixed(2) }}
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>



                <div class="mb-2 ml-2 text-sm" style="width: 15%;" v-if="contact.usd_rate_6">
                  <select v-model="contact.channel_6" class="form-control" id="supplierSelect"
                    v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>&nbsp;</option>
                    <option v-for="channel_6 in channels.records" :key="channel_6.fields.id"
                      :value="channel_6.fields.id">
                      {{ channel_6.fields.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 15%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>

                <!-- <div class="mb-2 ml-2 text-sm" style="width: 20%;" v-if="contact.usd_rate_6">
                  {{ (contact.usd * (contact.usd_rate_6 - contact.usd_rate_3)).toFixed(2) }}
                </div>
                <div class="mb-2 ml-2 text-sm" style="width: 30%;" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div> -->

                <div class="mb-2 ml-2 text-sm" style="width: 30%;">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>

              </div>











            </div>

            <!-- usd usd usd -->



            <!-- memo memo memo -->

            <div class="mb-2">
              <textarea v-model="contact.memo" class="form-control" rows="5" placeholder="Memo ..."
                :class="{ 'is-invalid': contact.memo && !isValidMemo }"></textarea>
              <div v-if="contact.memo && !isValidMemo" class="invalid-feedback">
                Please enter a valid Memo.
              </div>
            </div>

            <!-- memo memo memo -->


            <!-- <div class="d-flex flex-wrap mt-3"> -->
            <div class="mt-3 d-flex justify-content-end">
              <div>
                <input type="submit" class="btn btn-success" value="Create" :disabled="!isFormValid" />
              </div>
              <div>
                <router-link to="/contacts" class="btn btn-success">Cancel</router-link>
              </div>
            </div>

            <br />
            <br />


          </form>



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

import { mapGetters } from 'vuex'
// import { mapActions } from 'vuex'

export default {
  name: "AddContact",

  components: {
    DatePicker,
    mySpinner,
  },

  data() {
    return {

      selectedCurrency: 'usd',

      selectedDate: new Date(), // initially today's date

      contact: {
        desc: "",
        create_user_id: "",
        update_user_id: "",
        status: "進行中",
        channel_1: '',
        channel_2: '',
        channel_3: '',
        channel_4: '',
        channel_5: '',
        channel_6: '',
        date: '',
        usd: '',
        usd_name: '',
        usd_rate_1: '',
        usd_rate_2: '',
        user_email: '',
      },

      currentUserId: "",
      upstreams: [],
      channels: [],

      errorMessage: "",
      loading: false,

      showDatePicker: false,
    };
  },

  created: async function () {
    try {
      this.loading = true
      let response_up = await ContactService.getUpstreams()
      let response_ch = await ContactService.getChannels()

      this.upstreams = response_up.data
      this.channels = response_ch.data
      // console.log('upstreams ------------->', this.upstreams)
      // console.log('channels ------------->', this.channels)
      this.loading = false
    }
    catch (error) {
      console.log(error)
      this.loading = false
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

    isValidUSD_rate4() {
      const usdRate4 = Number(this.contact.usd_rate_4);
      return !isNaN(usdRate4);
    },

    isValidUSD_rate5() {
      const usdRate5 = Number(this.contact.usd_rate_5);
      return !isNaN(usdRate5);
    },

    isValidUSD_rate6() {
      const usdRate6 = Number(this.contact.usd_rate_6);
      return !isNaN(usdRate6);
    },

    isValidMemo() {
      return true;
    },

    isFormValid() {
      return (
        (this.isValidUSD || this.isValidHKD || this.isValidOTH));
    }

  },

  methods: {

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

    async myCreate() {
      // this.loading = true;
      this.currentUserId = await this.currentUser();

      if (this.currentUserId) {
        try {
          this.contact.user_email = this.whichUser
          this.contact.create_user_id = this.currentUserId;
          this.contact.update_date = new Date().toISOString();
          this.contact.channel_1 = String(this.contact.channel_1);
          this.contact.channel_2 = String(this.contact.channel_2);
          this.contact.channel_3 = String(this.contact.channel_3);
          this.contact.channel_4 = String(this.contact.channel_4);
          this.contact.channel_5 = String(this.contact.channel_5);
          this.contact.channel_6 = String(this.contact.channel_6);
          let dateWithCorrectTimeZone = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()));
          this.contact.date = dateWithCorrectTimeZone.toISOString().slice(0, 10);

          if (this.selectedCurrency === 'usd') {
            this.contact.usd_name = 'USD'
          }
          if (this.selectedCurrency === 'hkd') {
            this.contact.usd_name = 'HKD'
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


  },

  watch: {
    'selectedCurrency': function (newVal) {
      if (newVal) {

        if (newVal === 'usd') {
          this.contact.usd_name = 'USD'
        }

        if (newVal === 'hkd') {
          this.contact.usd_name = 'HKD'
        }

        if (newVal === 'oth') {
        }

      }
    }
  }

};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.button-group {
  justify-content: flex-end;
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