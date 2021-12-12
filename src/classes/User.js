import usersData from '../data/users';

class User {
  constructor(usersData) {
    this.name = usersData.name;
    this.id = usersData.id;
    this.pantry = usersData.pantry;
    this.favorites = [];
    this.toCook = [];
  }

  addToFavorites(selectedRecipe) {
    this.favorites.push(selectedRecipe);
  }

  removeFromFavorites(id) {
    this.favorites.forEach((favorite, index) => {
      if (favorite.id === id) {
        this.favorites.splice(index, 1)
      }
    });
  }

  
}







export default User;
