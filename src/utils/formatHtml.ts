export default (html: string, data: { [prop: string]: string }) => {
  Object.keys(data).forEach(e => {
    html = html.replaceAll(`{ ${e} }`, data[e])
  })
  return html
}
