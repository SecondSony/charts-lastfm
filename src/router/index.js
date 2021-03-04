import Vue from 'vue'
import VueRouter from 'vue-router'
import PageNotFound from '../views/PageNotFound.vue'
import TopArtists from '../views/TopArtists.vue'
import TopTracks from '../views/TopTracks.vue'
import ArtistInfo from '../views/ArtistInfo.vue'
import AlbumInfo from '../views/AlbumInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '404',
    component: PageNotFound
  },
  {
    path: '/',
    name: 'TopArtists',
    component: TopArtists
  },
  {
    path: '/tracks',
    name: 'TopTracks',
    component: TopTracks
  },
  {
    path: '/:artist',
    name: 'ArtistInfo',
    component: ArtistInfo
  },
  {
    path: '/:artist/:album',
    name: 'AlbumInfo',
    component: AlbumInfo
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
