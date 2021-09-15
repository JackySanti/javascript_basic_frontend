export function createDOM(string){
  const parse = new DOMParser()
  const HTML = parse.parseFromString(string, "text/html")
  return HTML.body.firstChild
}