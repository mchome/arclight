export const sharedMutation = store => {
  store.subscribe((mutation, state) => {
    window.localStorage.setItem('mutation-applied', JSON.stringify(mutation))
  })
}
