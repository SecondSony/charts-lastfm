<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-card
        v-for="artist in topArtists"
        :key="artist.name"
        width="250"
        class="ma-2 rounded-lg"
        @click="goTo(artist.name)"
      >
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
    </v-row>
    <infinite-loading @infinite="infiniteHandler" />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      topArtists: [],
      page: 1
    };
  },
  methods: {
    goTo(artistName) {
      this.$router.push(`/artist/${artistName}`);
    },
    async infiniteHandler($state) {
      let newPage = await this.$lastfm.chart.getTopArtists(this.page++);
      let topNames = [];
      let newNames = [];

      this.topArtists.forEach(el => topNames.push(el.name));
      newPage.forEach(el => newNames.push(el.name));
      
      for (let i = 0; i < newPage.length; i++) {
        if (!topNames.includes(newNames[i])) {
          this.topArtists.push(newPage[i]);
        }
      }

      $state.loaded();
    }
  }
};
</script>