<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-card v-for="i in 30" :key="i" width="250" class="ma-2 rounded-lg">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png" aspect-ratio="1"/>
        <v-card-subtitle class="pa-2 pb-0">Исполнитель</v-card-subtitle>
        <v-card-title class="pa-2 pt-0">Название песни</v-card-title>
        <v-divider/>
        <v-card-text class="pa-2 pb-0 text-caption">Кол-во прослушиваний: ХХХ</v-card-text>
        <v-card-text class="pa-2 pt-0 text-caption">Кол-во слушателей: ХХХ</v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>