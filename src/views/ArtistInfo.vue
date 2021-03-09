<template>
  <v-container>
    <v-card min-height="150" elevation="12">
      <v-row no-gutters class="d-flex flex-column flex-sm-row-reverse">
        <v-col class="flex-grow-1 flex-sm-grow-0">
          <v-img
            src="https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
            alt="artist face"
            min-width="150"
            min-height="150"
            aspect-ratio="1"
          ></v-img>
        </v-col>
        <v-col>
          <v-card elevation="0">
            <v-card-title>Исполнитель</v-card-title>
            <v-divider />
            <v-card-text class="pb-0">Кол-во прослушиваний: ХХХ</v-card-text>
            <v-card-text class="pt-0">Кол-во слушателей: ХХХ</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <div class="text-center text-h5 text-uppercase my-6">Топ альбомов исполнителя</div>

    <v-row no-gutters justify="center">
      <v-card v-for="i in 30" :key="i" width="250" class="ma-2 rounded-lg">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
          lazy-src="https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
          aspect-ratio="1"
        />
        <v-card-title class="pa-2">Название альбома</v-card-title>
        <v-divider />
        <v-card-text class="pa-2 text-caption">Кол-во слушателей: ХХХ</v-card-text>
      </v-card>
    </v-row>
    <router-view />
  </v-container>
</template>