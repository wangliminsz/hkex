<template>
    <br />
    <div class="text-lg ml-5 mr-5">
        <h2>Home Component</h2>
    </div>

    <div class="text-lg ml-5 mr-5 pt-2">
        <div class="flex items-center mb-2">
            <div class="flex-grow w-12">
                <!-- Input field with reduced width -->
                <input class="pl-1" type="text" placeholder="Search" v-model="searchValue">
            </div>
        </div>

        <!-- :search-field="searchField" -->
        <EasyDataTable :headers="headers" :items="items" :search-value="searchValue" :sort-by="sortBy"
            :sort-type="sortType" theme-color="#1d90ff" table-class-name="customize-table"
            header-text-direction="center" body-text-direction="center">

            <template #item-myaction="id">
                <!-- <div class="operation-wrapper">
                    <span @click="onEdit(id)">hello</span>
                </div> -->
                <button @click="onEdit(id)">
                    <a> <i class="fa-solid fa-pen-to-square ml-3"></i> </a>
                </button>
                <button @click="onEdit(id)">
                    <a> <i class="fa-solid fa-trash ml-3"></i> </a>
                </button>
            </template>

        </EasyDataTable>

        <!-- <button @click="onEdit( id )">
            <a> <i class="fa-solid fa-pen-to-square ml-3"></i> </a>
        </button>
        <a> <i class="fa-solid fa-trash ml-3"></i> </a> -->
    </div>
</template>

<script>
// Import the EasyDataTable component from vue3-easy-data-table
import EasyDataTable from 'vue3-easy-data-table';

export default {
    components: {
        // Register the component with a kebab-case name if it's not already in kebab-case
        easyDataTable: EasyDataTable
    },

    data() {
        return {
            // searchField: ["number", "weight"],
            searchValue: "",

            sortBy: "player",
            sortType: "asc",

            // Define headers and items as reactive data properties
            headers: [
                { text: "PLAYER", value: "player", sortable: true },
                { text: "TEAM", value: "team" },
                { text: "NUMBER", value: "number" },
                { text: "POSITION", value: "position" },
                { text: "HEIGHT", value: "indicator.height" },
                { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true },
                { text: "LAST ATTENDED", value: "lastAttended", width: 200 },
                { text: "COUNTRY", value: "country" },
                { text: "ACTIONS", value: "myaction" },
            ],

            items: [
                { player: "Stephen Curry", team: "GSW", number: 30, position: 'G', indicator: { "height": '6-2', "weight": 185 }, lastAttended: "Davidson", country: "USA" },
                { player: "Lebron James", team: "LAL", number: 6, position: 'F', indicator: { "height": '6-9', "weight": 250 }, lastAttended: "St. Vincent-St. Mary HS (OH)", country: "USA" },
                { player: "Kevin Durant", team: "BKN", number: 7, position: 'F', indicator: { "height": '6-10', "weight": 240 }, lastAttended: "Texas-Austin", country: "USA" },
                { player: "Giannis Antetokounmpo", team: "MIL", number: 34, position: 'F', indicator: { "height": '6-11', "weight": 242 }, lastAttended: "Filathlitikos", country: "Greece" },
            ],
        };
    },

    methods: {
        // Method to handle edit action
        onEdit(slotProps) {
            console.log(slotProps); // The row details should be accessible this way
        },

        // Method to handle delete action
        onDeleteItem(item) {
            // Logic to handle delete action
        },
    },

};
</script>

<style scoped>
.customize-table {
    --easy-table-border: 1px solid #445269;
    --easy-table-row-border: 1px solid #445269;

    --easy-table-header-font-size: 14px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #c1cad4;
    --easy-table-header-background-color: #2d3a4f;

    --easy-table-header-item-padding: 10px 15px;

    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #4c5d7a;

    --easy-table-body-row-font-color: #c0c7d2;
    --easy-table-body-row-background-color: #2d3a4f;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;

    --easy-table-body-row-hover-font-color: #2d3a4f;
    --easy-table-body-row-hover-background-color: #eee;

    --easy-table-body-item-padding: 10px 15px;

    --easy-table-footer-background-color: #2d3a4f;
    --easy-table-footer-font-color: #c0c7d2;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;

    --easy-table-rows-per-page-selector-width: 70px;
    --easy-table-rows-per-page-selector-option-padding: 10px;
    --easy-table-rows-per-page-selector-z-index: 1;


    --easy-table-scrollbar-track-color: #2d3a4f;
    --easy-table-scrollbar-color: #2d3a4f;
    --easy-table-scrollbar-thumb-color: #4c5d7a;
    ;
    --easy-table-scrollbar-corner-color: #2d3a4f;

    --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>