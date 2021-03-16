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
      <v-card v-for="album in albums" :key="album.name" width="250" class="ma-2 rounded-lg" @click="goTo(album.name)">
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
    </v-row>
    <router-view />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      artist: null,
      albums: null
    }
  },
  methods: {
    getShorterName(name) {
      return name.length > 50 ? name.substr(0, 47) + "..." : name;
    },
    goTo(albumName) {
      this.$router.push(`/artist/${this.artist.name}/${albumName}`);
    }
  },
  async mounted() {
    let artistName = this.$route.params.artist;

    this.artist = await this.$lastfm.artist.getInfo(artistName);
    this.albums = await this.$lastfm.artist.getTopAlbums(artistName);
    this.albums = this.albums.filter(item => item.name !== "(null)");
  }
}
</script>