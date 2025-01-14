export const useAuthIdValidator = () => {
  const isInvalidAuthId = authId => {
    return (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(authId) &&
      !/^(75|74|70|78|77|76|3|2)\d{7}$/.test(authId)
    )
  }

  return isInvalidAuthId
}
