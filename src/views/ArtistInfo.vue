<template>
  <v-container>
    <v-card min-height="150" elevation="12">
      <v-row no-gutters class="d-flex flex-column flex-sm-row-reverse">
        <v-col class="flex-grow-1 flex-sm-grow-0">
          <v-img
            :src="artist.image[artist.image.length-1]['#text']"
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

    <div class="text-center text-h5 text-uppercase my-6">Топ альбомов исполнителя</div>

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
            lazy-src="https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
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
    <router-view />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      artist: null,
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
  },
  async mounted() {
    this.artist = await this.$lastfm.artist.getInfo(this.$route.params.artist);
  }
}
</script>