<template>
    <GMapMap
        :center="center"
        :zoom="10"
        map-type-id="terrain"
        style="width: 100%; height: 20rem"
    >
        <GMapCluster :zoomOnClick="true">
            <GMapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center = m.position"
            />
        </GMapCluster>
    </GMapMap>
</template>

<script>
import axios from "axios";
const API_URL = "http://restaurant.test/api/search-restaurant";
export default {
    data() {
        return {
            center: { lat: 51.093048, lng: 6.84212 },
            markers: [
                {
                    position: {
                        lat: 51.093048,
                        lng: 6.84212,
                    },
                },
                {
                    position: {
                        lat: 51.198429,
                        lng: 6.69529,
                    },
                },
                {
                    position: {
                        lat: 51.165218,
                        lng: 7.067116,
                    },
                },
                {
                    position: {
                        lat: 51.09256,
                        lng: 6.84074,
                    },
                },
            ],
        };
    },
    created() {
        // load map default on init
        // this.setupDefaultMap();
    },
    // watch: {

    // },
    methods: {
        async setupDefaultMap() {
            axios
                .post(API_URL, { place: "restautants in BangSue" })
                .then((result) => {
                    let data = result.data.results;
                    let count = 0;
                    let dataa = [];
                    data.forEach((element) => {
                        if (count == 0) {
                            // console.log();
                            // this.center = element.geometry.location;
                        }
                        count++;
                        // this.markers = [
                        //     { position: element.geometry.location },
                        // ];
                        // dataa.push({
                        //     position: element.geometry.location,
                        // });
                    });
                    // this.markers = dataa;
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style>
body {
    margin: 0;
}
</style>
