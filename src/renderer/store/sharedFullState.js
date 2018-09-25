export const sharedFullState = store => {
  let currentState = null
  window.localStorage.setItem('init-state', false)
  store.subscribe((mutation, state) => {
    currentState = state
  })
  window.addEventListener('storage', (e) => {
    if (e.key === 'init-state' && e.newValue && currentState !== null) {
      window.localStorage.setItem('full-state', JSON.stringify(currentState))
      window.localStorage.setItem('init-state', false)
    }
  })
}
