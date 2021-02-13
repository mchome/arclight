<template>
  <div id="settings">
    <ul class="settingslist">
      <li class="option">
        <span>Auto Play</span>
        <span>
          <label class="option-switch">
            <input type="checkbox" v-model="autoPlay" @change="onChange('autoPlay', $event)">
            <span class="option-slider round"></span>
          </label>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import * as app from '../../lib/app'

export default {
  data () {
    return {
      autoPlay: false
    }
  },
  methods: {
    initSettings () {
      // load settings
      let autoPlayEnabled = app.config.get('autoPlay')
      if (autoPlayEnabled) {
        this.autoPlay = true
      }
    },
    onChange (value, $event) {
      const checked = $event.target.checked

      if (checked) {
        app.config.set(value, true)
        app.config.save()
      } else {
        app.config.set(value, false)
        app.config.save()
      }
    }
  },
  mounted () {
    this.initSettings()
  }
}
</script>

<style>
#settings {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#settingslist {
  width: calc(100% - 4px);
  overflow: auto;
}
#settingslist::-webkit-scrollbar {
	width: 0.5rem;
}
#settingslist::-webkit-scrollbar-thumb {
  background-color: #e2e2e2;
	border-radius: 0.5rem;
}

.option:first-child {
  margin-top: 0;
}

.option {
  font-size: 1.0rem;
  font-weight: lighter;
  white-space: nowrap;
  letter-spacing: 0.3px;
  overflow-x: hidden;
  display: flex;
  margin: 0.3rem 0;
  padding: 0.6rem 0.3rem;
  margin-right: 0.32rem;
  transition: all 0.2s linear;
  flex-direction: column;
}
/*.option:hover {
  font-weight: normal;
  color: #0f0f0f;
  background-color: #888888;
}
.option:active {
  font-weight: normal;
  color: #0f0f0f;
  background-color: #b3b3b3;
}*/
.option > span:last-child {
  font-size: 0.55rem;
}

 /* The switch - the box around the slider */
.option-switch {
  position: relative;
  display: inline-block;
  margin-top: 2px;
  width: 75px;
  height: 34px;
}

/* Hide default HTML checkbox */
.option-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.option-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.option-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

.option-switch input:checked + .option-slider {
  background-color: #0fa33b;
}

.option-switch input:focus + .option-slider {
  box-shadow: 0 0 1px #0fa33b;
}

.option-switch input:checked + .option-slider:before {
  -webkit-transform: translateX(40px);
  -ms-transform: translateX(40px);
  transform: translateX(40px);
}

/* Rounded sliders */
.option-slider.round {
  border-radius: 34px;
}

.option-slider.round:before {
  border-radius: 50%;
} 
</style>
