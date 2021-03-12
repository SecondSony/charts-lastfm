<template>
  <v-container>
    <v-card min-height="150" elevation="12">
      <v-row no-gutters class="d-flex flex-column flex-sm-row-reverse">
        <v-col class="flex-grow-1 flex-sm-grow-0">
          <v-img
            src="https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
            min-width="150"
            min-height="150"
            aspect-ratio="1"
            style="width: 100%; height: 100%;"
          ></v-img>
        </v-col>
        <v-col>
          <v-card elevation="0">
            <v-card-subtitle class="pb-0">Исполнитель</v-card-subtitle>
            <v-card-title class="pt-0">Название альбома</v-card-title>
            <v-divider />
            <v-row no-gutters justify="space-between">
              <v-card elevation="0">
                <v-card-text class="pb-0">Кол-во прослушиваний: ХХХ</v-card-text>
                <v-card-text class="pt-0">Кол-во слушателей: ХХХ</v-card-text>
              </v-card>
              <v-card elevation="0">                
                <v-card-text class="pb-0">Дата релиза: ХХХ</v-card-text>
                <v-card-text class="pt-0">Продолжительность: ХХХ</v-card-text>
              </v-card>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <div class="text-center text-h5 text-uppercase my-6">Треклист</div>

    <v-row class="d-flex flex-column" no-gutters>
      <v-card v-for="i in 20" :key="i" class="d-flex flex-row justify-space-between white mb-1 pa-2 rounded-lg">
        <v-card class="black--text transparent mx-2" elevation="0" width="60">№ХХ</v-card>
        <v-card class="black--text transparent" elevation="0" width="100%">Название</v-card>
        <v-card class="black--text transparent mx-2" elevation="0">00:00</v-card>
      </v-card>
    </v-row>
  </v-container>
</template>