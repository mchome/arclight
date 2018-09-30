<template>
  <div id="about">
    <div id="logo"></div>
    <div id="info">
      <div id="software-info">
        <p>{{ softwareVersion }}</p>
      </div>
      <div id="author-info">
        <p>fuyumi</p>
      </div>
      <div id="license-info">
        <p>GPL v3</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    softwareName () {
      return this.$electron.remote.app.getName()
    },
    softwareVersion () {
      return this.$electron.remote.app.getVersion()
    }
  }
}
</script>

<style scoped>
#about {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#logo {
  width: 70%;
  flex: 1;
  background-image: url(../../assets/logo.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-self: center;
}

#info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 5rem;
  font-size: 0.9rem;
  letter-spacing: 0.03rem;
}

#software-info > p,
#author-info > p,
#license-info > p {
  margin-left: 1rem;
  margin-top: 0.15rem;
  font-size: 0.8rem;
  font-weight: lighter;
}
#software-info::before {
  content: "Version";
  position: relative;
}
#author-info::before {
  content: "Author";
  position: relative;
}
#license-info::before {
  content: "License"
}
</style>
