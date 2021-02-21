<template>
  <v-app>
    <div id="nav">
      <router-link to="/">Топ исполнителей</router-link> | 
      <router-link to="/">Топ песен</router-link>
    </div>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
