export const sharedFullState = store => {
  /* eslint-disable no-unused-vars */
  let currentState = null
  window.localStorage.setItem('init-state', false)
  store.subscribe((_, state) => {
    currentState = state
  })
  window.addEventListener('storage', (e) => {
    if (e.key === 'init-state' && e.newValue && currentState !== null) {
      window.localStorage.setItem('full-state', JSON.stringify(currentState))
      window.localStorage.setItem('init-state', false)
    }
  })
}
