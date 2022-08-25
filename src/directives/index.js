
export const imgErr = {
  inserted(dom, options) {
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
