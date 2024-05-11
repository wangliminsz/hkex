<template>

  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-success fw-bold">Edit</p>
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
            <p class="h5 text-danger fw-bold">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3" v-if="!loading && safeLoading">
      <div class="row">
        <div class="col-md-4">

          <form @submit.prevent="myUpdate">


            <div class="d-flex justify-content-between align-items-center">
              <div class="mb-2 mr-5">
                <select v-model="contact.status" class="form-control">
                  <option value="進行中">進行中</option>
                  <option value="已完成">已完成</option>
                </select>
              </div>

              <div class="mb-2">
                <div class="form-control date-picker-container">
                  <DatePicker v-model="selectedDate" />
                </div>
              </div>

            </div>

            <div class="mb-2">
              <input v-model="contact.desc" type="text" class="form-control" placeholder="Input Desc ..."
                :class="{ 'is-invalid': contact.desc && !isValidDesc }" />
              <div v-if="contact.desc && !isValidDesc" class="invalid-feedback">
                Please enter a valid Description.
              </div>
            </div>




            <div class="mb-2">
              <select v-model="contact.upstream" class="form-control" id="supplierSelect"
                v-if="upstreams.records.length > 0">
                <option class="text-danger" value="" selected>Select Supplier</option>
                <option v-for="upstream in upstreams.records" :key="upstream.fields.id" :value="upstream.fields.id">
                  {{ upstream.fields.name }}
                </option>
              </select>
            </div>

            <div class="mb-2">
              <select v-model="contact.channel" class="form-control" id="supplierSelect"
                v-if="channels.records.length > 0">
                <option class="text-danger" value="" selected>Select Channel</option>
                <option v-for="channel in channels.records" :key="channel.fields.id" :value="channel.fields.id">
                  {{ channel.fields.name }}
                </option>
              </select>
            </div>








            <div class="mb-2">
              <input v-model="contact.usd" type="number" step="0.0001" class="form-control" placeholder="USD ..."
                :class="{
                  'is-invalid': contact.usd && !isValidUSD,
                }" />
              <div v-if="contact.usd && !isValidUSD" class="invalid-feedback">
                Please enter a valid USD amount.
              </div>
            </div>

            <div class="d-flex  justify-content-between align-items-center">
              <div class="mb-2 me-3"> <!-- me-3 provides margin to the right -->
                <input v-model="contact.usd_rate_1" type="number" step="0.0001" class="form-control" :class="{
                  'is-invalid': contact.usd_rate_1 && !isValidUSD_rate1,
                }" />
                <div v-if="contact.usd_rate_1 && !isValidUSD_rate1" class="invalid-feedback">
                  Please enter a valid USD rate.
                </div>
              </div>

              <div class="mb-2 me-3">
                <input v-model="contact.usd_rate_2" type="number" step="0.0001" class="form-control" :class="{
                  'is-invalid': contact.usd_rate_2 && !isValidUSD_rate2,
                }" />
                <div v-if="contact.usd_rate_2 && !isValidUSD_rate2" class="invalid-feedback">
                  Please enter a valid USD rate.
                </div>
              </div>

              <div class="mb-2">
                <input v-model="contact.usd_rate_3" type="number" step="0.0001" class="form-control" :class="{
                  'is-invalid': contact.usd_rate_3 && !isValidUSD_rate3,
                }" />
                <div v-if="contact.usd_rate_3 && !isValidUSD_rate3" class="invalid-feedback">
                  Please enter a valid USD rate.
                </div>
              </div>


            </div>

            <div class="mb-2">
              <input v-model="contact.hkd" type="number" step="0.0001" class="form-control" placeholder="HKD ..."
                :class="{
                  'is-invalid': contact.hkd && !isValidHKD,
                }" />
              <div v-if="contact.hkd && !isValidHKD" class="invalid-feedback">
                Please enter a valid HKD amount.
              </div>
            </div>

            <div class="d-flex  justify-content-between align-items-center">
              <div class="mb-2 me-3"> <!-- me-3 provides margin to the right -->
                <input v-model="contact.hkd_rate_1" type="number" step="0.0001" class="form-control" :class="{
                  'is-invalid': contact.hkd_rate_1 && !isValidHKD_rate1,
                }" />
                <div v-if="contact.hkd_rate_1 && !isValidHKD_rate1" class="invalid-feedback">
                  Please enter a valid HKD rate.
                </div>
              </div>

              <div class="mb-2 me-3">
                <input v-model="contact.hkd_rate_2" type="number" step="0.0001" class="form-control" :class="{
                  'is-invalid': contact.hkd_rate_2 && !isValidHKD_rate2,
                }" />
                <div v-if="contact.hkd_rate_2 && !isValidHKD_rate2" class="invalid-feedback">
                  Please enter a valid HKD rate.
                </div>
              </div>

              <div class="mb-2">
                <input v-model="contact.hkd_rate_3" type="number" step="0.0001" class="form-control" :class="{
                  'is-invalid': contact.hkd_rate_3 && !isValidHKD_rate3,
                }" />
                <div v-if="contact.hkd_rate_3 && !isValidHKD_rate3" class="invalid-feedback">
                  Please enter a valid HKD rate.
                </div>
              </div>

            </div>

            <div class="mb-2">
              <textarea v-model="contact.memo" class="form-control" rows="5" placeholder="Memo ..."
                :class="{ 'is-invalid': contact.memo && !isValidMemo }"></textarea>
              <div v-if="contact.memo && !isValidMemo" class="invalid-feedback">
                Please enter a valid Memo.
              </div>
            </div>




            <div class="d-flex flex-wrap mt-3">
              <div class="col-md-3">
                <input type="submit" class="btn btn-success" value="Update" :disabled="!isFormValid" />
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
import mySpinner from "@/components/Spinner.vue";

import { supabase } from "@/clients/supabase";

import DatePicker from 'vue3-datepicker'

export default {
  name: "EditContact",

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

          this.contact = response.data.records[0].fields
          // this.selectedDate = this.contact.fields.date
          this.selectedDate = new Date(this.contact.date)

          let response_up = await ContactService.getUpstreams()
          let response_ch = await ContactService.getChannels()

          this.upstreams = response_up.data
          this.channels = response_ch.data

          let upResponse = await ContactService.getUpstream(this.contact.upstream)
          let chResponse = await ContactService.getChannel(this.contact.channel)
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

  computed: {

    safeLoading() {
      return (this.contact?.usd || this.contact?.hkd);
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

};
</script>

<style scoped>
.d-flex {
  justify-content: space-start;
  /* Adjust this value as needed */
}

.d-flex>div {
  flex-basis: 30%;
  /* Adjust this value as needed */
  /* padding: 0 -1px; */
  /* Adjust this value as needed */
}

/* .form-control .vdp-datepicker .vdp-wrapper {
    border: none;
    box-shadow: none;
} */

.vdp-wrapper {
  border: none !important;
  box-shadow: none !important;
}

.date-picker-container {
  position: relative;
  /* border: none !important;
    box-shadow: none !important;*/
}

.datepicker {
  border: none !important;
  box-shadow: none !important;
}

.datepicker_no_border {
  /* border: none !important; */
  border-color: #e30707;
  /* box-shadow: none !important; */
}

/* .date-picker-wrapper {
    background-color: #fff;
    border-color: #ced4da;
    border-radius: .25rem;
    box-shadow: none;
} */

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

/* .date-picker-container {
    position: relative;
    border: none !important;
}

.date-picker-wrapper {
    background-color: transparent !important;
    border: none !important;
}

.date-picker-input {
    background-color: transparent !important;
    border: none !important;
} */
</style>