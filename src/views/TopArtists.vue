<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-skeleton-loader
        type="image, article"
        class="ma-2 rounded-lg" 
        width="250"
        v-for="artist in topArtists"
        :key="artist.name"
        :loading="loading"
      >
        <v-card width="250" @click="goTo(artist.name)">
          <v-img
            :src="artist.image[artist.image.length - 1]['#text']"
            lazy-src="https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
            aspect-ratio="1"
          />
          <v-card-title class="pa-2">{{ artist.name }}</v-card-title>
          <v-divider />
          <v-card-text class="pa-2 pb-0 text-caption">Кол-во прослушиваний: {{ artist.playcount }}</v-card-text>
          <v-card-text class="pa-2 pt-0 text-caption">Кол-во слушателей: {{ artist.listeners }}</v-card-text>
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
      topArtists: [],
      page: 1,
      loading: true
    };
  },
  methods: {
    goTo(artistName) {
      this.$router.push(`/artist/${artistName}`);
    },
    async infiniteHandler($state) {
      let newPage = null;
      let topNames = [];
      let newNames = [];
      this.loading = true;
      
      await this.$lastfm.chart
        .getTopArtists(this.page++)
        .then((result) => {
          newPage = result;
          this.loading = false;
        }).catch((err) => {
          this.loading = false;
          console.log(err.response);
        });

      this.topArtists.forEach((el) => topNames.push(el.name));
      newPage.forEach((el) => newNames.push(el.name));

      if (newPage.length == 0) {
        $state.complete();
        return;
      }

      for (let i = 0; i < newPage.length; i++) {
        if (!topNames.includes(newNames[i])) {
          this.topArtists.push(newPage[i]);
        }
      }
      
      this.topArtists = this.topArtists.filter(item => item.name !== "(null)");
      $state.loaded();
    }
  }
};
</script>