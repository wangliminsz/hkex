<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-4">

          <div class="d-flex justify-content-start">

            <div>
              <p class="h3 text-success fw-bold">Add</p>
            </div>


            <div class="d-flex align-items-baseline">
              <span class="mr-2">USD <input type="radio" name="currency" value="usd" v-model="selectedCurrency"></span>
              <span>HKD <input type="radio" name="currency" value="hkd" v-model="selectedCurrency"> </span>
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
        <div class="col-md-4">
          <form @submit.prevent="myCreate">

            <!-- {{ upstreams.records.length }}
            {{ upstreams.records}} -->

            <div class="d-flex justify-content-between align-items-center">

              <div class="mb-2 mr-5">
                <select v-model="contact.status" class="form-control">
                  <option value="進行中">進行中</option>
                  <option value="已完成">已完成</option>
                </select>
              </div>

              <div class="mb-2 col-md-12">
                <input v-model="contact.desc" type="text" class="form-control" style="width: 250px;"
                  placeholder="Input Name/Desc ..." :class="{ 'is-invalid': contact.desc && !isValidDesc }" />
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

            <div>

              <div class="mb-2">
                <input v-model="contact.usd" type="number" step="0.0001" class="form-control"
                  :disabled="selectedCurrency === 'hkd'" placeholder="Input USD Amount..." :class="{
                    'is-invalid': contact.usd && !isValidUSD,
                  }" />
                <div v-if="contact.usd && !isValidUSD" class="invalid-feedback">
                  Please enter a valid USD amount.
                </div>
              </div>

              <!-- usd rate 1 -->

              <div class="d-flex  justify-content-between align-items-center">
                <div class="mb-2 me-3"> <!-- me-3 provides margin to the right -->
                  <input v-model="contact.usd_rate_1" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency === 'hkd'" :class="{
                      'is-invalid': contact.usd_rate_1 && !isValidUSD_rate1,
                    }" />
                  <div v-if="contact.usd_rate_1 && !isValidUSD_rate1" class="invalid-feedback">
                    Please enter a valid USD rate.
                  </div>
                </div>

                <div class="mb-2 col-md-12">
                  <select v-model="contact.upstream" class="form-control" :disabled="selectedCurrency === 'hkd'" style="width: 250px;" id="supplierSelect"
                    v-if="upstreams.records.length > 0">
                    <option class="text-danger" value="" selected>Layer 1</option>
                    <option v-for="upstream in upstreams.records" :key="upstream.fields.id" :value="upstream.fields.id">
                      {{ upstream.fields.name }}
                    </option>
                  </select>
                </div>




              </div>

              <!-- usd rate 2 -->

              <div class="d-flex  justify-content-between align-items-center">


                <div class="mb-2 me-3">
                  <input v-model="contact.usd_rate_2" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency === 'hkd'" :class="{
                      'is-invalid': contact.usd_rate_2 && !isValidUSD_rate2,
                    }" />
                  <div v-if="contact.usd_rate_2 && !isValidUSD_rate2" class="invalid-feedback">
                    Please enter a valid USD rate.
                  </div>
                </div>

                <div class="mb-2 col-md-12">
                  <select v-model="contact.channel" class="form-control" :disabled="selectedCurrency === 'hkd'" style="width: 250px;" id="supplierSelect"
                    v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>Layer 2</option>
                    <option v-for="channel in channels.records" :key="channel.fields.id" :value="channel.fields.id">
                      {{ channel.fields.name }}
                    </option>
                  </select>
                </div>

              </div>


              <!-- usd rate 3 -->

              <div class="d-flex  justify-content-between align-items-center">


                <div class="mb-2 me-3">
                  <input v-model="contact.usd_rate_3" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency === 'hkd'" :class="{
                      'is-invalid': contact.usd_rate_3 && !isValidUSD_rate3,
                    }" />
                  <div v-if="contact.usd_rate_3 && !isValidUSD_rate3" class="invalid-feedback">
                    Please enter a valid USD rate.
                  </div>
                </div>


              </div>

            </div>

            <!-- usd usd usd -->


            <!-- hkd hkd hkd -->

            <div>

              <div class="mb-2">
                <input v-model="contact.hkd" type="number" step="0.0001" class="form-control"
                  :disabled="selectedCurrency === 'usd'" placeholder="Input HKD Amount ..." :class="{
                    'is-invalid': contact.hkd && !isValidHKD,
                  }" />
                <div v-if="contact.hkd && !isValidHKD" class="invalid-feedback">
                  Please enter a valid hkd amount.
                </div>
              </div>

              <!-- hkd rate 1 -->

              <div class="d-flex  justify-content-between align-items-center">
                <div class="mb-2 me-3"> <!-- me-3 provides margin to the right -->
                  <input v-model="contact.hkd_rate_1" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency === 'usd'" :class="{
                      'is-invalid': contact.hkd_rate_1 && !isValidHKD_rate1,
                    }" />
                  <div v-if="contact.hkd_rate_1 && !isValidHKD_rate1" class="invalid-feedback">
                    Please enter a valid hkd rate.
                  </div>
                </div>

                <div class="mb-2 col-md-12">
                  <select v-model="contact.upstream" class="form-control" :disabled="selectedCurrency === 'usd'" style="width: 250px;" id="supplierSelect"
                    v-if="upstreams.records.length > 0">
                    <option class="text-danger" value="" selected>Layer 1</option>
                    <option v-for="upstream in upstreams.records" :key="upstream.fields.id" :value="upstream.fields.id">
                      {{ upstream.fields.name }}
                    </option>
                  </select>
                </div>




              </div>

              <!-- hkd rate 2 -->

              <div class="d-flex  justify-content-between align-items-center">


                <div class="mb-2 me-3">
                  <input v-model="contact.hkd_rate_2" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency === 'usd'" :class="{
                      'is-invalid': contact.hkd_rate_2 && !isValidHKD_rate2,
                    }" />
                  <div v-if="contact.hkd_rate_2 && !isValidHKD_rate2" class="invalid-feedback">
                    Please enter a valid hkd rate.
                  </div>
                </div>

                <div class="mb-2 col-md-12">
                  <select v-model="contact.channel" class="form-control" :disabled="selectedCurrency === 'usd'" style="width: 250px;" id="supplierSelect"
                    v-if="channels.records.length > 0">
                    <option class="text-danger" value="" selected>Layer 2</option>
                    <option v-for="channel in channels.records" :key="channel.fields.id" :value="channel.fields.id">
                      {{ channel.fields.name }}
                    </option>
                  </select>
                </div>

              </div>


              <!-- hkd rate 3 -->

              <div class="d-flex  justify-content-between align-items-center">


                <div class="mb-2 me-3">
                  <input v-model="contact.hkd_rate_3" type="number" step="0.0001" class="form-control"
                    :disabled="selectedCurrency === 'usd'" :class="{
                      'is-invalid': contact.hkd_rate_3 && !isValidHKD_rate3,
                    }" />
                  <div v-if="contact.hkd_rate_3 && !isValidHKD_rate3" class="invalid-feedback">
                    Please enter a valid hkd rate.
                  </div>
                </div>


              </div>


            </div>

            <!-- hkd hkd hkd -->



            <div class="mb-2">
              <textarea v-model="contact.memo" class="form-control" rows="5" placeholder="Memo ..."
                :class="{ 'is-invalid': contact.memo && !isValidMemo }"></textarea>
              <div v-if="contact.memo && !isValidMemo" class="invalid-feedback">
                Please enter a valid Memo.
              </div>
            </div>




            <div class="d-flex flex-wrap mt-3">
              <div class="col-md-3">
                <input type="submit" class="btn btn-success" value="Create" :disabled="!isFormValid" />
              </div>
              <div class="col-md-3">
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
        upstream: '',
        channel: '',
        date: '',
        usd: '',
        hkd: '',
        usd_rate_1: 7.31,
        usd_rate_2: 7.42,
        usd_rate_3: 7.53,
        hkd_rate_1: 0.931,
        hkd_rate_2: 0.942,
        hkd_rate_3: 0.953,
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
          this.contact.user_email = this.whichUser
          this.contact.create_user_id = this.currentUserId;
          this.contact.update_date = new Date().toISOString();
          this.contact.upstream = String(this.contact.upstream);
          this.contact.channel = String(this.contact.channel);
          let dateWithCorrectTimeZone = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()));
          this.contact.date = dateWithCorrectTimeZone.toISOString().slice(0, 10);

          if (this.contact.usd === '' || this.contact.usd == 0) {
            this.contact.usd_rate_1 = ''
            this.contact.usd_rate_2 = ''
            this.contact.usd_rate_3 = ''
          }

          if (this.contact.hkd === '' || this.contact.hkd == 0) {
            this.contact.hkd_rate_1 = ''
            this.contact.hkd_rate_2 = ''
            this.contact.hkd_rate_3 = ''
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