<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-card
        v-for="track in topTracks"
        :key="track.name"
        width="250"
        class="ma-2 rounded-lg"
      >
        <v-img
          :src="track.image[track.image.length-1]['#text']"
          aspect-ratio="1"
        />
        <v-card-subtitle class="pa-2 pb-0">{{ track.artist.name }}</v-card-subtitle>
        <v-card-title class="pa-2 pt-0">{{ track.name }}</v-card-title>
        <v-divider />
        <v-card-text class="pa-2 pb-0 text-caption">Кол-во прослушиваний: {{ track.playcount }}</v-card-text>
        <v-card-text class="pa-2 pt-0 text-caption">Кол-во слушателей: {{ track.listeners }}</v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      topTracks: null,
    };
  },
  async mounted() {
    this.topTracks = await this.$lastfm.chart.getTopTracks();
    this.topTracks = this.topTracks.filter((item) => item.name !== "(null)");
  },
};
</script>