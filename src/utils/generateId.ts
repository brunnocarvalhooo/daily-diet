export function generateUniqueId() {
  const timestamp = new Date().getTime()
  const randomValue = Math.floor(Math.random() * 1000)
  return `${timestamp}-${randomValue}`
}