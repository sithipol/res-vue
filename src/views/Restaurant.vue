<template>
  <div class="flex flex-col h-screen max-h-screen">
    <div
      class="flex justify-center relative bg-gray-100 bg-cover px-4 pt-8 pb-32"
    >
      <div class="w-full max-w-screen-sm">
        <h1 class="text-black text-center text-3xl pb-4">Restaurant Search</h1>

        <!-- <pre>{{ defaultValue }}</pre> -->
        <div class="">
          <v-select
            :options="options"
            v-model="defaultValue"
            class="w-full"
            label="name"
            @search="onSearch"
          />
          <MagnifyingGlassIcon
            @click="setSelected"
            class="cursor-pointer bg-black text-white mt-4 py-2 px-4 rounded flex items-center h-11 w-full"
          />
          <!-- <input
            type="text"
            class="flex-1 py-1 px-2 rounded-tl-md rounded-bl-md"
            placeholder="Bangsue"
            style="focus"
            v-model="defaultValue"
          />-->
        </div>
      </div>
    </div>
    <div class="h-full z-10">
      <GoogleMap
        api-key="AIzaSyAoCoVAEYsFYD5QSK0u7E_YO5zOR5toNpY"
        class="h-full"
        :center="center"
        :zoom="15"
      >
        <Marker
          v-for="(item, key) in markers"
          :key="key"
          :options="{ position: item }"
        />
      </GoogleMap>
    </div>
  </div>
</template>
<script>
import "vue-select/dist/vue-select.css";
import { ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { GoogleMap, Marker } from "vue3-google-map";
import axios from "axios";
import vSelect from "vue-select";
const API_URL =
  "https://restaurants-app-54d1d8d9a012.herokuapp.com/api/search-restaurant";

// const API_URL = "http://restaurant.test/api/search-restaurant";

export default {
  components: {
    GoogleMap,
    Marker,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    vSelect,
  },
  data() {
    return {
      //   selectedOption: null,
      center: { lat: 13.8185376, lng: 100.5292056 },
      defaultValue: { name: "Bangsue" },
      markers: [],
      options: [],
      item: {
        value: "",
        text: "",
      },
    };
  },
  created() {
    // load map default on init
    this.setupDefaultMap();
  },
  methods: {
    onSearch(value) {
      console.log(value);
      axios
        .post(API_URL, { place: value })
        .then((result) => {
          let data = result.data.results;
          let markers = [];
          data.forEach((element) => {
            markers.push(element.geometry.location);
            console.log(element.name);
            this.options.push({ id: element.place_id, name: element.name });
          });
          if (markers.length > 0) {
            this.center = markers[0];
          }
          this.markers = markers;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setSelected() {
      axios
        .post(API_URL, { place: this.defaultValue.name })
        .then((result) => {
          let data = result.data.results;
          let markers = [];
          data.forEach((element) => {
            markers.push(element.geometry.location);
            this.options.push({ id: element.place_id, name: element.name });
          });
          if (markers.length > 0) {
            this.center = markers[0];
          }
          this.markers = markers;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async setupDefaultMap() {
      axios
        .post(API_URL, { place: this.defaultValue.name })
        .then((result) => {
          let data = result.data.results;
          let markers = [];
          data.forEach((element) => {
            markers.push(element.geometry.location);
            this.options.push({ id: element.place_id, name: element.name });
          });
          if (markers.length > 0) {
            this.center = markers[0];
          }
          this.markers = markers;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped></style>
