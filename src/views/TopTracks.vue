<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-skeleton-loader
        type="image, article"
        class="ma-2 rounded-lg" 
        width="250"
        v-for="track in topTracks"
        :key="track.artist.name + '_' + track.name"
        :loading="loading"
      >
        <v-card width="250">
          <v-img
            :src="track.image[track.image.length-1]['#text']"
            lazy-src="https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
            aspect-ratio="1"
          />
          <v-card-subtitle class="pa-2 pb-0">{{ track.artist.name }}</v-card-subtitle>
          <v-card-title class="pa-2 pt-0">{{ track.name }}</v-card-title>
          <v-divider />
          <v-card-text class="pa-2 pb-0 text-caption">Кол-во прослушиваний: {{ track.playcount }}</v-card-text>
          <v-card-text class="pa-2 pt-0 text-caption">Кол-во слушателей: {{ track.listeners }}</v-card-text>
        </v-card>
      </v-skeleton-loader>
    </v-row>
    <infinite-loading @infinite="infiniteHandler" />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      topTracks: [],
      page: 1,
      loading: true
    };
  },
  methods: {
    async infiniteHandler($state) {
      let newPage = null;
      let topNames = [];
      let newNames = [];
      this.loading = true;

      await this.$lastfm.chart
        .getTopTracks(this.page++)
        .then((result) => {
          newPage = result;
          this.loading = false;
        }).catch((err) => {
          console.log(err.response);
        });

      this.topTracks.forEach(el => topNames.push(el.name));
      newPage.forEach(el => newNames.push(el.name));
      
      for (let i = 0; i < newPage.length; i++) {
        if (!topNames.includes(newNames[i])) {
          this.topTracks.push(newPage[i]);
        }
      }
      
      $state.loaded();
    }
  }
};
</script>