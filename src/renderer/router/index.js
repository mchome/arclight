import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/player/:winid',
      name: 'player',
      component: require('@/components/Player').default
    },
    {
      path: '/panel/:winid',
      component: require('@/components/SidePanel').default,
      children: [
        {
          path: '',
          redirect: {
            name: 'playlist'
          }
        },
        {
          path: 'playlist',
          name: 'playlist',
          component: require('@/components/SidePanel/Playlist').default
        },
        {
          path: 'metadata',
          name: 'metadata',
          component: require('@/components/SidePanel/Metadata').default
        },
        {
          path: 'effect',
          name: 'effect',
          component: require('@/components/SidePanel/Effect').default
        },
        {
          path: 'settings',
          name: 'settings',
          component: require('@/components/SidePanel/Settings').default
        },
        {
          path: 'about',
          name: 'about',
          component: require('@/components/SidePanel/About').default
        }
      ]
    },
    {
      path: '/context-menu/:winid',
      name: 'context-menu',
      component: require('@/components/ContextMenu').default
    },
    {
      path: '*',
      redirect: '/player'
    }
  ]
})
