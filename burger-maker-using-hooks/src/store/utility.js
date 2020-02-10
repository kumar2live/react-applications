export const updateObj = (oldObj, newValues) => {
  return {
    ...oldObj, ...newValues,
  }
}
