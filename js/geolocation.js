function geolocationSupport(){
  //if('geolocation' in navigator){
  //  return true
  //}
  //return false

  return 'geolocation' in navigator
}

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 100000,
}

export function getCurrentPosition(options = defaultOptions){
  if (!geolocationSupport()) throw new Error('No hay soporte de geolocalización en tu navegador')

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      //console.log(position)
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      resolve(position)
      //console.log(lat, lon)
      //console.log('Esto es getCurrentPosition')
    }, () =>{
      reject('No podemos obtener tu ubicación')
    }, options)
  })

}

export async function getLatLon(options = defaultOptions){
  try{
    const { coords: { latitude: lat, longitude: lon }} = await getCurrentPosition(options)
    return {lat, lon, idError: false}
  }catch{
    return {isError: true, lat: null, lon: null}
  }

}