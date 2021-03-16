<template>
  <v-container>
    <v-card min-height="150" elevation="12">
      <v-row no-gutters class="d-flex flex-column flex-sm-row-reverse">
        <v-col class="flex-grow-1 flex-sm-grow-0">
          <v-img
            :src="album.image[album.image.length-1]['#text']"
            min-width="150"
            min-height="150"
            aspect-ratio="1"
            style="width: 100%; height: 100%;"
          ></v-img>
        </v-col>
        <v-col>
          <v-card elevation="0">
            <v-card-subtitle class="pb-0 artist" @click="toArtist()">{{ album.artist }}</v-card-subtitle>
            <v-card-title class="pt-0">{{ album.name }}</v-card-title>
            <v-divider />
            <v-row no-gutters justify="space-between">
              <v-card elevation="0">
                <v-card-text class="pb-0">Кол-во прослушиваний: {{ album.playcount }}</v-card-text>
                <v-card-text class="pt-0">Кол-во слушателей: {{ album.listeners }}</v-card-text>
              </v-card>
              <v-card elevation="0">                
                <v-card-text class="pb-0">Дата релиза: {{ album.wiki ? album.wiki.published : "" }}</v-card-text>
                <v-card-text class="pt-0">Продолжительность: {{ getDuration() }}</v-card-text>
              </v-card>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <div class="text-center text-h5 text-uppercase my-6">Треклист</div>

    <v-row class="d-flex flex-column" no-gutters>
      <v-card v-for="(track, i) in tracks" :key="i" class="d-flex flex-row justify-space-between white mb-1 pa-2 rounded-lg">
        <v-card class="black--text transparent mx-2" elevation="0" width="40">#{{ (i + 1).toString().padStart(2, '0') }}</v-card>
        <v-card class="black--text transparent" elevation="0" width="100%">{{ track.name }}</v-card>
        <v-card class="black--text transparent mx-2" elevation="0">{{ convertTime(track.duration) }}</v-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      album: null,
      tracks: null
    }
  },
  methods: {
    toArtist() {
      this.$router.push(`/artist/${this.$route.params.artist}`);
    },
    convertTime(seconds, isOverall) {
      isOverall = isOverall || false;
      let hours = Math.floor(seconds / 60 / 60);
      let minutes = Math.floor(seconds / 60) - (hours * 60);
      let sec = seconds % 60;
      let time = '';

      if (isOverall) {
        time = 
          hours.toString().padStart(2, '0') + 
          ':' +
          minutes.toString().padStart(2, '0') + 
          ':' +
          sec.toString().padStart(2, '0');
      } else {
        time = 
          minutes.toString().padStart(2, '0') + 
          ':' +
          sec.toString().padStart(2, '0');
      }

      return time;
    },
    getDuration() {
      let overall = this.tracks.reduce((sum, current) => sum + Number(current.duration), 0);
      return this.convertTime(overall, true);
    }
  },
  async mounted() {
    let artistName = this.$route.params.artist;
    let albumName = this.$route.params.album;

    this.album = await this.$lastfm.album.getInfo(artistName, albumName);
    this.tracks = this.album.tracks.track;
  }
}
</script>

<style scoped>
.artist:hover {
  cursor: pointer;
}
</style>