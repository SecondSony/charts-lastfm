<template>
  <v-app>
    <div id="nav">
      <router-link to="/">Топ исполнителей</router-link> |
      <router-link to="/tracks">Топ песен</router-link>
    </div>
    <v-main v-scroll="scrollHandler">
      <v-fab-transition>
        <v-btn
          v-show="!hidden"
          fab
          fixed
          right
          bottom
          icon
          class="primary"
          @click="scrollToTop()"
        >
          <v-icon x-large>mdi-chevron-up</v-icon>
        </v-btn>
      </v-fab-transition>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      hidden: true,
    };
  },
  methods: {
    scrollToTop() {
      this.$vuetify.goTo(0, {
        ease: "easeInOutQuint",
        duration: 300
      });
    },
    scrollHandler() {
      this.hidden = window.scrollY < 300;
    }
  }
};
</script>

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
