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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      topArtists: null,
    };
  },
  methods: {
    goTo(artistName) {
      let name = artistName.split(' ').join('+');
      this.$router.push(`/artist/${name}`);
    },
  },
  async mounted() {
    this.topArtists = await this.$lastfm.chart.getTopArtists();
    this.topArtists = this.topArtists.filter(
      (item) => item.name !== "(null)"
    );
  },
};
</script>