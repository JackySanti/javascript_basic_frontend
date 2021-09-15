import { getWeeklyWeather } from "./services/weather.js"
import { getLatLon } from "./geolocation.js "
import { formatWeekList } from "./utiles/format-data.js"
import { createDOM } from "./utiles/dom.js"
import { createPeriodTime } from "./periodtime.js"
import draggable from "./draggable.js"

function  tabPanelTemplate(id){
  return `
  <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
    <div class="dayWeather" id="dayWeather-${id}">
      <ul class="dayWeather-list" id="dayWeather-list-${id}">

      </ul>
    </div>
  </div>
  `
}

function createTabPanel(id){
  const $panel = createDOM(tabPanelTemplate(id))
  if(id > 0){
    $panel.hidden = true
  }
  return $panel
}

function configWeeklyWeather(weeklist){
  const $container = document.querySelector('.tabs')
  weeklist.forEach((day, index) =>{
    const $panel = createTabPanel(index)
    $container.append($panel)
    day.forEach((weather,indexWeather) =>{
      $panel.querySelector('.dayWeather-list').append(createPeriodTime(weather))
    })
  })

}

export default async function WeeklyWeather(){
  const $container = document.querySelector('.weeklyWeather')
  const { lat, lon, isError } = await getLatLon()
  if (isError) return console.log('Ah ocurrido un error Ubicandote')
  const { isError: weeklyWeatherError, data: weather }= await getWeeklyWeather(lat, lon)
  if (weeklyWeatherError) return console.log('Oh!, ha ocurrido un erro trayendo el pronóstico del clima')
  const weeklist =formatWeekList(weather.list)
  configWeeklyWeather(weeklist)
  draggable($container)
}