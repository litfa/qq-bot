export const throttle = (cb: () => void, time: number) => {
  let timeout: NodeJS.Timeout
  return () => {
    if (timeout) {
      return
    }
    timeout = setTimeout(() => {
      cb()
      timeout = null
    }, time)
  }
}
