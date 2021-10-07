type IStoreFavorites = {
  username: string
  favoritesList: string[]
}

export const getStorageFavorites = (username: string | unknown) => {
  const favoriteStore = localStorage.getItem('favorites')
  if (favoriteStore) {
    const favorite: IStoreFavorites = JSON.parse(favoriteStore)
    if (favorite.username === username) {
      return favorite.favoritesList
    } else {
      return false
    }
  } else {
    return false
  }
}