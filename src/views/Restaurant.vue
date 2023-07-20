<template>
    <div class="flex flex-col h-screen max-h-screen">
        <div
            class="flex justify-center relative bg-gray-100 bg-cover px-4 pt-8 pb-32"
        >
            <div class="w-full max-w-screen-sm">
                <h1 class="text-black text-center text-3xl pb-4">
                    Restaurant Search
                </h1>
                <div class="flex">
                    <input
                        type="text"
                        class="flex-1 py-1 px-2 rounded-tl-md rounded-bl-md"
                        placeholder="Bangsue"
                        style="focus"
                        v-model="defaultValue"
                    />
                    <MagnifyingGlassIcon
                        @click="setupDefaultMap"
                        class="cursor-pointer bg-black text-white px-4 rounded-tr-md rounded-br-md flex items-center h-11 w-12"
                    />
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
import { ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { GoogleMap, Marker } from "vue3-google-map";
import axios from "axios";
const API_URL = "http://restaurant.test/api/search-restaurant";
export default {
    components: {
        GoogleMap,
        Marker,
        ChevronRightIcon,
        MagnifyingGlassIcon,
    },
    data() {
        return {
            center: { lat: 13.8185376, lng: 100.5292056 },
            defaultValue: "Bangsue",
            markers: [],
        };
    },
    created() {
        // load map default on init
        this.setupDefaultMap();
    },
    methods: {
        async setupDefaultMap() {
            axios
                .post(API_URL, { place: this.defaultValue })
                .then((result) => {
                    let data = result.data.results;
                    let markers = [];
                    data.forEach((element) => {
                        markers.push(element.geometry.location);
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
