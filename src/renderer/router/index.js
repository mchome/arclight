import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'player',
      component: require('@/components/Player').default
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: require('@/components/Playlist').default
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/Playlist').default
    },
    {
      path: '/context-menu',
      name: 'context-menu',
      component: require('@/components/ContextMenu').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
