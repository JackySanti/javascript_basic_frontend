
export function setViewportSize($el){
  const ViewportBlockSize = getVierport()
  $el.style.blockSize = `${ViewportBlockSize}px`
}

export function getVierport(){
  return window.innerHeight
}

export function onViewportResize(callback){
  window.addEventListener('resize', callback)
}

export function offViewportResize(callback){
  window.removeEventListener('resize', callback)
}

export function viewportSize($el){
  setViewportSize($el)
  onViewportResize(() => setViewportSize($el))
}