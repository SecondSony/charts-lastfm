<template>
  <v-container class="px-0">
    <v-row no-gutters justify="center">
      <v-skeleton-loader
        type="image, article"
        class="ma-2 rounded-lg" 
        width="250"
        v-for="track in tracks"
        :key="track.mbid"
        :loading="loading"
      >
        <v-card width="250">
          <v-img
            :src="track.image[track.image.length-1]['#text']"
            lazy-src="https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png"
            aspect-ratio="1"
          />
          <v-card-title class="pa-2">{{ getShorterName('#' + track['@attr'].rank + ' ' + track.name) }}</v-card-title>
          <v-divider />
          <v-card-text class="pa-2 pb-0 text-caption">Кол-во прослушиваний: {{ track.playcount }}</v-card-text>
          <v-card-text class="pa-2 pt-0 text-caption">Кол-во слушателей: {{ track.listeners }}</v-card-text>
        </v-card>
      </v-skeleton-loader>
    </v-row>
    <infinite-loading @infinite="infiniteHandler"/>
  </v-container>
</template>

<script>
export default {
  name: 'ArtistTracks',
  data() {
    return {
      tracks: [],
      page: 1,
      loading: true
    }
  },
  methods: {
    getShorterName(name) {
      return name.length > 50 ? name.substr(0, 45) + "..." : name;
    },
    async infiniteHandler($state) {
      let newPage = null;
      let topNames = [];
      let newNames = [];
      this.loading = true;

      await this.$lastfm.artist
        .getTopTracks(this.$route.params.artist, this.page++)
        .then((result) => {
          newPage = result;
          this.loading = false;
        }).catch((err) => {
          this.loading = false;
          console.log(err.response);
        });

      this.tracks.forEach((el) => topNames.push(el.name));
      newPage.forEach((el) => newNames.push(el.name));

      if (newPage.length == 0) {
        $state.complete();
        return;
      }

      for (let i = 0; i < newPage.length; i++) {
        if (!topNames.includes(newNames[i])) {
          this.tracks.push(newPage[i]);
        }
      }

      this.tracks = this.tracks.filter(item => item.name !== "(null)");
      $state.loaded();
    }
  }
}
</script>