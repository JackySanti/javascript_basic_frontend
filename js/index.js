import current from './current-wheather.js'
import WeeklyWeather from './weeklyWeather.js'
import { viewportSize } from './utiles/viewport.js'
import './tabs.js'

const $app = document.querySelector('#app')
const $loading = document.querySelector('#loading')
viewportSize($app, $loading)
current()
WeeklyWeather()