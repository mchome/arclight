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
      path: '/playlist/:winid',
      name: 'playlist',
      component: require('@/components/Playlist').default
    },
    {
      path: '/settings/:winid',
      name: 'settings',
      component: require('@/components/Playlist').default
    },
    {
      path: '/metadata/:winid',
      name: 'metadata',
      component: require('@/components/Metadata').default
    },
    {
      path: '/effect/:winid',
      name: 'effect',
      component: require('@/components/Effect').default
    },
    {
      path: '/about/:winid',
      name: 'about',
      component: require('@/components/About').default
    },
    {
      path: '/context-menu/:winid',
      name: 'context-menu',
      component: require('@/components/ContextMenu').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
