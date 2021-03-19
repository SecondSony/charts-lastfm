<template>
  <v-container class="px-0">
    <v-row no-gutters justify="center">
      <v-skeleton-loader
        type="image, card-heading, list-item"
        class="ma-2 rounded-lg" 
        width="250"
        v-for="album in albums"
        :key="album.name"
        :loading="loading"
      >
        <v-card width="250" @click="goTo(album.name)">
          <v-img
            :src="album.image[album.image.length-1]['#text']"
            lazy-src="https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png"
            aspect-ratio="1"
          />
          <v-card-title class="pa-2">{{ getShorterName(album.name) }}</v-card-title>
          <v-divider />
          <v-card-text class="pa-2 text-caption">Кол-во прослушиваний: {{ album.playcount }}</v-card-text>
          <!-- <v-card-text class="pa-2 text-caption">Кол-во слушателей: ХХХ</v-card-text> -->
        </v-card>
      </v-skeleton-loader>
    </v-row>
    <infinite-loading @infinite="infiniteHandler"/>
  </v-container>
</template>

<script>
export default {
  name: 'ArtistAlbums',
  data() {
    return {
      albums: [],
      page: 1,
      loading: true
    }
  },
  methods: {
    getShorterName(name) {
      return name.length > 50 ? name.substr(0, 47) + "..." : name;
    },
    goTo(albumName) {
      this.$router.push(`/artist/${this.artist.name}/${albumName}`);
    },
    async infiniteHandler($state) {
      let newPage = null;
      let topNames = [];
      let newNames = [];
      this.loading = true;

      await this.$lastfm.artist
        .getTopAlbums(this.$route.params.artist, this.page++)
        .then((result) => {
          newPage = result;
          this.loading = false;
        }).catch((err) => {
          this.loading = false;
          console.log(err.response);
        });

      this.albums.forEach((el) => topNames.push(el.name));
      newPage.forEach((el) => newNames.push(el.name));

      if (newPage.length == 0) {
        $state.complete();
        return;
      }

      for (let i = 0; i < newPage.length; i++) {
        if (!topNames.includes(newNames[i])) {
          this.albums.push(newPage[i]);
        }
      }

      this.albums = this.albums.filter(item => item.name !== "(null)");
      $state.loaded();
    }
  }
}
</script>