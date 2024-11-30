export const generateUniqueKey = item => {
  if (!item || !item._id) {
    throw new Error('Invalid item: _id is required')
  }
  const combinedKey = `${item._id}${JSON.stringify(item.variants)}`
  return btoa(combinedKey)
}
