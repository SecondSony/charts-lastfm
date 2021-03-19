<template>
  <v-container>
    <v-card min-height="150" elevation="12">
      <v-row no-gutters class="d-flex flex-column flex-sm-row-reverse">
        <v-col class="flex-grow-1 flex-sm-grow-0">
          <v-img
            :src="artist.image[artist.image.length-1]['#text']"
            lazy-src="https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png"
            min-width="150"
            min-height="150"
            aspect-ratio="1"
          ></v-img>
        </v-col>
        <v-col>
          <v-card elevation="0">
            <v-card-title>{{ artist.name }}</v-card-title>
            <v-divider />
            <v-card-text class="pb-0">Кол-во прослушиваний: {{ artist.stats.playcount }}</v-card-text>
            <v-card-text class="pt-0">Кол-во слушателей: {{ artist.stats.listeners }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-tabs centered background-color="transparent">
      <v-tab>Топ альбомов</v-tab>
      <v-tab>Топ треков</v-tab>
      <v-tab-item class="grey darken-3"><ArtistAlbums /></v-tab-item>
      <v-tab-item class="grey darken-3"><ArtistTracks /></v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import ArtistTracks from '../components/ArtistTracks.vue';
import ArtistAlbums from '../components/ArtistAlbums.vue';

export default {
  components: {
    ArtistTracks,
    ArtistAlbums
  },
  data() {
    return {
      artist: null
    }
  },
  async mounted() {
    this.artist = await this.$lastfm.artist.getInfo(this.$route.params.artist);
  }
}
</script>