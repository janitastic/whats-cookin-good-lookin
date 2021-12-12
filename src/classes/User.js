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

  removeFromFavorites(favorites, selectedRecipe) {
    let index = favorites.indexOf(selectedRecipe);
    if (index > -1) {
      favorites.splice(index, 1);
    }
    return favorites;
  }

  addToCook(selectedRecipe) {
    this.toCook.push(selectedRecipe);
  }
}







export default User;
