



<table>
    <tr>
      <!-- First row, first column -->
      <td>Column 1, Row 1</td>
      <!-- First row, second column -->
      <td>Column 2, Row 1</td>
    </tr>
    <tr>
      <!-- Second row, first column -->
      <td>Column 1, Row 2</td>
      <!-- Second row, second column -->
      <td>Column 2, Row 2</td>
    </tr>
  </table>



<div class="col-md-5">
    <div class="d-flex justify-content-between align-items-center">


        <!-- <div class="form-control text-sm text-gray-700" style="flex: 0.8;"> -->
            <!-- search -->
            <input type="text" style="flex: 0.8;" class="form-control" placeholder="Search..." v-model="searchName">
        <!-- </div> -->

        <div class="ml-2 text-sm" style="flex: 0.2;">
            <button @click="mySearch" class="btn btn-outline-dark btn-sm"
                :disabled="!isValidSearch">
                Go....
            </button>
        </div>


    </div>

    <div class="d-flex justify-content-between align-items-center">
        <div class="form-control text-sm text-gray-700" style="flex: 0.8;">
            <DatePicker v-model="selectedDate" />
        </div>
        <div class="ml-2 text-sm" style="flex: 0.2;">
            <button @click="myDateSearch" class="btn btn-outline-dark btn-sm"
                :disabled="!isValidSearch">
                Date
            </button>
        </div>
    </div>



</div>














<div class="ml-2 mr-4 text-sm" style="flex: 0.3">

    <DatePicker v-model="selectedDate" />

</div>



<div class="ml-2 mr-4 text-sm" style="flex: 0.3">
    <!-- <form @submit.prevent="myDate"> -->
        <!-- date -->
        <!-- <input type="text" class="form-control" placeholder="Date..." v-model="searchName"> -->
        <!-- date-picker-container -->
        <!-- <div class="form-control" placeholder="Date..."> -->
        <!-- <div>     -->
            <DatePicker v-model="selectedDate" />
        <!-- </div> -->
<!-- </form> -->
</div>